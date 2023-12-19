import * as crypto from 'crypto';

export class AuthHelper {
  static randomToken(length = 10): string {
    const byte: number = Math.ceil(length / 2);
    const res: string = crypto.randomBytes(byte).toString('hex');

    return length & 1 ? res.slice(0, -1) : res;
  }
}
