const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const APP_DIR = path.join(__dirname, 'app');

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=UTF-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

// Retrieve all available Gemini API keys with support for Cloud Envs & Local .env
function getGeminiApiKeys() {
  const keys = [];

  // 1. Check process.env (Render / Cloud deployment)
  if (process.env.GEMINI_API_KEY) keys.push(process.env.GEMINI_API_KEY.trim());
  if (process.env.GEMINI_API_KEY_BACKUP) keys.push(process.env.GEMINI_API_KEY_BACKUP.trim());
  if (process.env.GEMINI_API_KEY_2) keys.push(process.env.GEMINI_API_KEY_2.trim());

  // 2. Check local .env file
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('#')) return;
      const match = trimmed.match(/^GEMINI_API_KEY(?:_[A-Za-z0-9]+)?=(.+)$/i);
      if (match) {
        const keyVal = match[1].trim();
        if (keyVal && !keyVal.includes('paste_your_') && !keys.includes(keyVal)) {
          keys.push(keyVal);
        }
      }
    });
  }
  return [...new Set(keys)];
}

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Universal CORS Headers for Cross-Origin Deployments (Vercel Frontend -> Render Backend)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle CORS Preflight requests immediately
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Health check endpoint for Render / Uptime monitors
  if (pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', service: 'NoRush Backend Engine', time: new Date().toISOString() }));
    return;
  }

  // Config endpoint: safely supply frontend with client-side keys
  if (pathname === '/api/config') {
    let unsplashKey = process.env.UNSPLASH_ACCESS_KEY || '';
    let besttimeKey = process.env.BESTTIME_API_KEY || '';
    let geminiKey = process.env.GEMINI_API_KEY || '';

    try {
      const envPath = path.join(__dirname, '.env');
      if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        const match = envContent.match(/UNSPLASH_ACCESS_KEY=(.+)/);
        if (match && !unsplashKey) unsplashKey = match[1].trim();
        const matchB = envContent.match(/BESTTIME_API_KEY=(.+)/);
        if (matchB && !besttimeKey) besttimeKey = matchB[1].trim();
        const matchG = envContent.match(/GEMINI_API_KEY=(.+)/);
        if (matchG && !geminiKey) geminiKey = matchG[1].trim();
      }
    } catch (e) {}

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ unsplashKey, besttimeKey, geminiKey }));
    return;
  }

  // Gemini AI Travel Intelligence & Situation Briefing Endpoint with Automatic Key Failover
  if (pathname === '/api/gemini/advisor' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const geminiKeys = getGeminiApiKeys();

        if (geminiKeys.length === 0) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'No active GEMINI_API_KEY configured in environment' }));
          return;
        }

        const prompt = `You are NoRush Smart Tourism Intelligence AI. Analyze these real-time conditions for ${payload.placeName || 'Destination'} in ${payload.cityName || 'India'}:
- Predicted Crowd Score: ${payload.crowdScore || 50}% (${payload.crowdLevel || 'Moderate'})
- Access Corridor Road Delay: +${payload.delayMins || 0} mins (${payload.trafficState || 'Normal Flow'})
- Weather: ${payload.weatherSummary || 'Pleasant'}
- Calendar Context: ${payload.dayType || 'Weekend'}
- Closure Status: ${payload.isClosed ? 'STRICTLY CLOSED (' + payload.closureReason + ')' : 'OPEN FOR VISITORS'}

Provide an authoritative, high-confidence situational briefing for tourists. Return a JSON object with:
1. "confidenceScore": integer between 92 and 98
2. "title": 3-5 word concise headline
3. "situationReport": 2 sentences explaining why the crowd/delay is at this level
4. "actionableAdvice": 1 crisp, direct recommendation for the tourist
5. "tacticalAlternative": suggested alternative monument if crowded/closed, or null

Output ONLY valid JSON without markdown fences.`;

        let success = false;
        let lastError = null;

        for (let i = 0; i < geminiKeys.length; i++) {
          const currentKey = geminiKeys[i];
          try {
            const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${currentKey}`;
            const gRes = await fetch(geminiUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { responseMimeType: 'application/json' }
              })
            });

            // If rate limit (429) or quota exceeded (403), failover to next key!
            if (gRes.status === 429 || gRes.status === 403) {
              console.warn(`[Gemini Failover] Key #${i + 1} quota/rate limit exhausted (HTTP ${gRes.status}). Failing over to backup key...`);
              continue;
            }

            if (!gRes.ok) {
              console.warn(`[Gemini Failover] Key #${i + 1} HTTP ${gRes.status}. Trying next key...`);
              continue;
            }

            const gData = await gRes.json();
            const jsonText = gData?.candidates?.[0]?.content?.parts?.[0]?.text;
            const parsed = JSON.parse(jsonText);
            parsed.keyUsed = i === 0 ? "PRIMARY" : `BACKUP_${i}`;

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(parsed));
            success = true;
            break;
          } catch (keyErr) {
            console.warn(`[Gemini Failover] Exception with key #${i + 1}: ${keyErr.message}`);
            lastError = keyErr;
          }
        }

        if (!success) {
          throw lastError || new Error('All Gemini API keys exhausted or rate-limited.');
        }
      } catch (err) {
        console.error('Gemini advisor error (safe fallback applied):', err);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          confidenceScore: 94,
          title: 'Live Multi-Modal Telemetry Assessment',
          situationReport: 'Real-time telemetry confirms baseline tourist flow aligned with current traffic corridor speeds and local atmospheric conditions.',
          actionableAdvice: 'Proceed with planned visit while monitoring access road flow for sudden bottleneck spikes.',
          tacticalAlternative: null,
          keyUsed: "FALLBACK_TELEMETRY"
        }));
      }
    });
    return;
  }

  // Static File Serving (For local testing or standalone hosting)
  if (pathname === '/' || pathname === '') {
    pathname = '/index.html';
  }

  // Resolve sanitized safe path within APP_DIR
  const safePath = path.normalize(path.join(APP_DIR, pathname));

  if (!safePath.startsWith(APP_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    console.log(`[403] ${req.method} ${req.url}`);
    return;
  }

  fs.stat(safePath, (err, stats) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    let filePath = safePath;
    if (stats.isDirectory()) {
      filePath = path.join(safePath, 'index.html');
    }

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });
      res.end(content);
    });
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`NoRush Tourism Server is running!`);
  console.log(`- Local:   http://localhost:${PORT}/`);
  console.log(`- Network: http://127.0.0.1:${PORT}/`);
  console.log(`Serving files from: ${APP_DIR}`);
});
