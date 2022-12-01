
const Reservation = require('./schema/reservation');


describe('fetch', () => {
    let reservations;

    beforeAll(() => {
        jest.mock('./reservations');
        reservations = require('./reservations');
    })

    afterAll(() => {
        jest.unmock('./reservations')

    })

    it('should be mocked and not create a database record', () => {
        expect(reservations.fetch()).toBeUndefined();
    });
} );

describe('save', () => {
    let reservations

    const mockDebug = jest.fn();
    const mockInsert = jest.fn().mockResolvedValue([1]);

    beforeAll(() => {
        jest.mock('debug', () => () => mockDebug);
        jest.mock('./knex', () => () => ({
            insert: mockInsert,
        }));

        reservations = require('./reservations')
    });

    afterAll(() => {
        jest.unmock('debug')
        jest.unmock('./reservations')
    })

    it('should resolve with the id upon success', async () => {
        const value = { foo : 'bar'};
        const expected = [1];

        const actual = await reservations.save(value);

        expect(actual).toStrictEqual(expected);
        expect(mockDebug).toBeCalledTimes(1);
        expect(mockInsert).toBeCalledWith(value);
    })
})


describe('validate', () => {
    let reservations;

    beforeAll(() => {
        reservations = require('./reservations')
    })

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
    let reservations;

    beforeAll(() => {
        reservations = require('./reservations')
    })


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