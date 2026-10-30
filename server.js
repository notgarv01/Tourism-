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

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  if (pathname === '/' || pathname === '') {
    pathname = '/index.html';
  }

  // Resolve sanitized safe path within APP_DIR
  const safePath = path.normalize(path.join(APP_DIR, pathname));

  // Security check: ensure path is within APP_DIR
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
      console.log(`[404] ${req.method} ${req.url}`);
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
        console.error(`[500] ${req.method} ${req.url} - ${readErr.message}`);
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(content);
      console.log(`[200] ${req.method} ${pathname} (${contentType})`);
    });
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`NoRush Tourism Server is running!`);
  console.log(`- Local:   http://localhost:${PORT}/`);
  console.log(`- Network: http://127.0.0.1:${PORT}/`);
  console.log(`Serving files from: ${APP_DIR}`);
});
