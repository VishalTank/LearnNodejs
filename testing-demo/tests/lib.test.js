const lib = require('../lib');

describe('absolute', () => {
    it('should return a positive number if input is positive', () => {
        const result = lib.absolute(5);
        expect(result).toBe(5);
    });

    it('should return a positive number if input is negative', () => {
        const result = lib.absolute(-5);
        expect(result).toBe(5);
    });

    it('should return a 0 if input 0', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});

describe('greet', () => {
    it('should return the greeting message', () => {
        const result = lib.greet('Vishal');
        // expect(result).toBe('Welcome Vishal');
        // expect(result).toMatch(/Vishal/);
        expect(result).toContain('Vishal');
    });
});

describe('getCurrencies', () => {
    it('should return supported currencies', () => {
        const result = lib.getCurrencies();

        // expect(result).toContain('USD');
        // expect(result).toContain('EUR');
        // expect(result).toContain('AUD');
        expect(result).toEqual(expect.arrayContaining(['USD', 'EUR', 'AUD']));
    });
});
  
describe('getProduct', () => {
    it('should return the product with given ID', () => {
        const result = lib.getProduct(1);
        // expect(result).toEqual({ id: 1, price: 10, });
        expect(result).toMatchObject({ id: 1, price: 10, });
    });
});

describe('registerUser', () => {
    it('should throw if name is faulty', () => {
        expect(() => { lib.registerUser(null); }).toThrow();
    });
});