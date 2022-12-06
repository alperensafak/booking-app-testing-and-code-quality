const request = require('supertest');

let app;
const mockMorgan = jest.fn((req, res, next) => next());

beforeAll(() => {
  jest.mock('morgan', () => () => mockMorgan);
  app = request(require('../app'));
});

afterAll(() => {
  jest.unmock('morgan');
});

describe('GET', () => {
  it('should contain the word "Reservation App"', async () => {
    const response = await app.get('/')
      .expect(200);

    expect(response.text).toContain('Reservation App');
  });
});

describe('DELETE', () => {
  it('should fail to delete the homepage', () => {
    return app.delete('/')
      .expect(500);
  });
});