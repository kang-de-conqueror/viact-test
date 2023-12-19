import * as crypto from 'crypto';
import { AuthHelper } from './auth.helper';

jest.mock('crypto', () => {
  return {
    randomBytes: jest.fn(),
  };
});

describe('AuthHelper', () => {
  describe('randomToken', () => {
    it('should generate a random token of the specified length', () => {
      const mockRandomBytes = jest.spyOn(crypto, 'randomBytes');
      mockRandomBytes.mockImplementationOnce(() =>
        Buffer.from('abcdef', 'hex'),
      );
      const result = AuthHelper.randomToken(6);
      expect(mockRandomBytes).toHaveBeenCalledWith(3);
      expect(result).toBe('abcdef');
    });

    it('should generate a random token of default length if no length is specified', () => {
      const mockRandomBytes = jest.spyOn(crypto, 'randomBytes');
      mockRandomBytes.mockImplementationOnce(() =>
        Buffer.from('1234567891', 'hex'),
      );

      const result = AuthHelper.randomToken();
      expect(mockRandomBytes).toHaveBeenCalledWith(5);
      expect(result).toBe('1234567891');
    });
  });
});
