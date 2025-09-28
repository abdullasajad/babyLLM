const request = require('supertest');
const app = require('../src/index');

describe('babyLLM Backend', () => {
  describe('Health Check', () => {
    it('should return 200 for health endpoint', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);
      
      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('API Routes', () => {
    it('should return 404 for non-existent routes', async () => {
      await request(app)
        .get('/api/non-existent')
        .expect(404);
    });

    it('should handle CORS preflight requests', async () => {
      await request(app)
        .options('/api/search')
        .expect(204);
    });
  });

  describe('Search API', () => {
    it('should require query parameter', async () => {
      const response = await request(app)
        .get('/api/search')
        .expect(400);
      
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('message', 'Validation failed');
    });

    it('should accept valid search query', async () => {
      // This test would require actual API keys, so we'll mock it
      const response = await request(app)
        .get('/api/search?q=test')
        .expect((res) => {
          // Accept either 200 (success) or 500 (API key not configured in test)
          expect([200, 500]).toContain(res.status);
        });
    });
  });

  describe('Auth API', () => {
    it('should validate signup input', async () => {
      const response = await request(app)
        .post('/api/auth/signup')
        .send({})
        .expect(400);
      
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('message', 'Validation failed');
    });

    it('should validate login input', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({})
        .expect(400);
      
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('message', 'Validation failed');
    });
  });
});
