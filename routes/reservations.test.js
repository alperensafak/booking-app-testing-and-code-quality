const request = require('supertest');

let app;

const mockMorgan = jest.fn((req, res, next) => next());
const mockInsert = jest.fn().mockResolvedValue([1349]);

beforeAll(() => {
  jest.mock('morgan', () => () => mockMorgan);
  jest.mock('../lib/knex', () => () => ({
    insert: mockInsert,
  }));
  app = request(require('../app'));
});

afterAll(() => {
  jest.unmock('morgan');
});

describe('GET', () => {
  it('should return the reservations form', async () => {
    const response = await app.get('/reservations')
      .expect('Content-Type', /html/)
      .expect(200);

    expect(response.text).toContain('To make reservations please fill out the following form');
  });
});

describe('POST', () => {
  it('should reject an invalid reservation request', async () => {
    const response = await app.post('/reservations')
      .type('form')
      .send({
        date: '2022-12-05',
        time: '06:02 AM',
        party: 'bananas',
        name: 'Family',
        email: 'email@example.com'
      });

    expect(response.text).toContain('Sorry, there was a problem with your booking request.');
    expect(response.status).toBe(400);

    });

    it('should accept a valid reservation request', async () => {
        const response = await app.post('/reservations')
          .type('form')
          .send({
            date: '2022-12-05',
            time: '06:02 AM',
            party: '4',
            name: 'Family',
            email: 'email@example.com'
          })
          .expect(200);

        expect(response.text).toContain('Thanks, your booking request #1349');
    });
});