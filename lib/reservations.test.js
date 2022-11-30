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

describe('create', () => {
    it('should reject if validation fails',async ()=>{
        //Store original
        const original = reservations.validate;
        const error = new Error('fail');

        //Mock the function
        reservations.validate = jest.fn(()=>Promise.reject(error));

        await expect(reservations.create())
          .rejects.toBe(error);

        expect(reservations.validate).toBeCalledTimes(1);

        //Restore
        reservations.validate = original;

    })

})