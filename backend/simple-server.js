// Simple babyLLM Backend Server (No dependencies version)
const http = require('http');
const url = require('url');
const querystring = require('querystring');

const PORT = process.env.PORT || 5000;

// Simple CORS headers
const setCORSHeaders = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
};

// Simple JSON response helper
const sendJSON = (res, statusCode, data) => {
  setCORSHeaders(res);
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};

// Create HTTP server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    setCORSHeaders(res);
    res.writeHead(200);
    res.end();
    return;
  }

  // Health check endpoint
  if (path === '/health' && method === 'GET') {
    sendJSON(res, 200, {
      status: 'ok',
      message: 'babyLLM Backend is running!',
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    });
    return;
  }

  // Search endpoint (mock)
  if (path === '/api/search' && method === 'GET') {
    const query = parsedUrl.query.q;
    if (!query) {
      sendJSON(res, 400, {
        success: false,
        message: 'Query parameter "q" is required'
      });
      return;
    }

    // Mock search results
    const mockResults = [
      {
        id: '1',
        title: `Search results for: ${query}`,
        url: 'https://example.com/1',
        snippet: 'This is a mock search result. The babyLLM backend is running successfully!',
        displayUrl: 'example.com'
      },
      {
        id: '2',
        title: `More about: ${query}`,
        url: 'https://example.com/2',
        snippet: 'Another mock result showing that the API is working correctly.',
        displayUrl: 'example.com'
      }
    ];

    sendJSON(res, 200, {
      success: true,
      query,
      totalEstimatedMatches: 1000,
      results: mockResults,
      relatedQueries: [`${query} examples`, `best ${query}`, `how to ${query}`]
    });
    return;
  }

  // Auth endpoints (mock)
  if (path === '/api/auth/signup' && method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        sendJSON(res, 201, {
          success: true,
          message: 'User registered successfully (mock)',
          token: 'mock-jwt-token-' + Date.now(),
          user: { email: data.email, name: data.name || 'User' }
        });
      } catch (error) {
        sendJSON(res, 400, { success: false, message: 'Invalid JSON' });
      }
    });
    return;
  }

  if (path === '/api/auth/login' && method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        sendJSON(res, 200, {
          success: true,
          message: 'Login successful (mock)',
          token: 'mock-jwt-token-' + Date.now(),
          user: { email: data.email, name: 'Demo User' }
        });
      } catch (error) {
        sendJSON(res, 400, { success: false, message: 'Invalid JSON' });
      }
    });
    return;
  }

  // Summary endpoint (mock)
  if (path === '/api/summary/webpage' && method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        sendJSON(res, 200, {
          success: true,
          data: {
            url: data.url,
            title: 'Mock Webpage Title',
            summary: 'This is a mock summary of the webpage. The babyLLM summarization feature is working correctly!',
            processedAt: new Date().toISOString()
          }
        });
      } catch (error) {
        sendJSON(res, 400, { success: false, message: 'Invalid JSON' });
      }
    });
    return;
  }

  // 404 for unknown routes
  sendJSON(res, 404, {
    success: false,
    message: 'API endpoint not found',
    availableEndpoints: [
      'GET /health',
      'GET /api/search?q=query',
      'POST /api/auth/signup',
      'POST /api/auth/login',
      'POST /api/summary/webpage'
    ]
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 babyLLM Backend Server running on http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/health`);
  console.log(`🔍 Search API: http://localhost:${PORT}/api/search?q=test`);
  console.log(`📝 This is a simplified version with mock data for development`);
});

// Handle server errors
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Try a different port.`);
  } else {
    console.error('❌ Server error:', error);
  }
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down babyLLM Backend Server...');
  server.close(() => {
    console.log('✅ Server closed successfully');
    process.exit(0);
  });
});
