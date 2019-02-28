const lib = require('../exercise1');

describe('fizzbuzz', () => {
    it('should throw an exception if input is not a number', ()=> {
        expect(() => { lib.fizzBuzz('a'); }).toThrow();
        expect(() => { lib.fizzBuzz(null); }).toThrow();
        expect(() => { lib.fizzBuzz(undefined); }).toThrow();
        expect(() => { lib.fizzBuzz({}); }).toThrow();
   
    });

    it('should return fizzbuzz if input is divisible by 3 AND 5', () => {
        const result = lib.fizzBuzz(15);
        expect(result).toBe('FizzBuzz');
    });

    it('should return fizzbuzz if input is ONLY divisible by 3', () => {
        const result = lib.fizzBuzz(9);
        expect(result).toBe('Fizz');
    });

    it('should return fizzbuzz if input is ONLY divisible by 5', () => {
        const result = lib.fizzBuzz(20);
        expect(result).toBe('Buzz');
    });

    it('should return input if it is not divisible by 3 or 5', () => {
        const result = lib.fizzBuzz(22);
        expect(result).toBe(22);
    });
});