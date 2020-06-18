/* eslint-disable max-len */
import TokenGenerator from 'uuid-token-generator';

export default function generateToken() {
  const tokgen = new TokenGenerator(256, TokenGenerator.BASE62);// Default is a 128-bit token encoded in base58
  return tokgen.generate();
}
