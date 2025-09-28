// Simple frontend server for babyLLM
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// MIME types
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  let fileName;
  if (req.url === '/') {
    fileName = 'silicon-valley-index.html'; // Default to Silicon Valley interface
  } else if (req.url === '/classic') {
    fileName = 'index.html'; // Classic interface
  } else if (req.url === '/chatgpt') {
    fileName = 'chatgpt-index.html'; // ChatGPT-style with emojis
  } else if (req.url === '/professional') {
    fileName = 'professional-index.html'; // Professional interface
  } else {
    fileName = req.url;
  }
  
  let filePath = path.join(__dirname, 'simple-web', fileName);
  
  // Security check
  if (!filePath.startsWith(path.join(__dirname, 'simple-web'))) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  
  const extname = path.extname(filePath);
  const contentType = mimeTypes[extname] || 'application/octet-stream';
  
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404);
        res.end('File not found');
      } else {
        res.writeHead(500);
        res.end('Server error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`🌐 babyLLM Frontend Server running on http://localhost:${PORT}`);
  console.log(`📱 Open your browser and go to: http://localhost:${PORT}`);
  console.log(`🔗 Make sure the backend is running on http://localhost:5000`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Try a different port.`);
  } else {
    console.error('❌ Server error:', error);
  }
});

process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down babyLLM Frontend Server...');
  server.close(() => {
    console.log('✅ Frontend server closed successfully');
    process.exit(0);
  });
});
