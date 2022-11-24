const reservations = require('./reservations');
const Reservation = require('./schema/reservation');

describe('validate', () => {
  it('should resolve with no optional fields', () => {
    const reservation = new Reservation({
      date: '2022-11-24',
      time: '06:02 AM',
      party: 4,
      name: 'Family',
      email: 'username@example.com',
    });

    return reservations.validate(reservation)
      .then(value => expect(value).toEqual(reservation));
  });

  it('should reject with an invalid email', () => {
    const reservation = new Reservation({
      date: '2022-11-24',
      time: '06:02 AM',
      party: 4,
      name: 'Family',
      email: 'username',
    });

    expect.assertions(1);

    return reservations.validate(reservation)
      .catch(error => expect(error).toBeInstanceOf(Error));
  });
});