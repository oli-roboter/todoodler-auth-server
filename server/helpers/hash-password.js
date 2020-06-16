/* eslint-disable no-return-await */
import bcrypt from 'bcrypt';

export default function hashPassword() {
  const returnStringPassword = (password) => (typeof password === 'string' ? password : JSON.stringify(password));

  const hashAndSalt = async (password) => {
    const passwordToHash = returnStringPassword(password);
    return await bcrypt.hash(passwordToHash, 10);
  };

  const checkPassword = async (requestPassword, password) => {
    const passwordToHash = returnStringPassword(requestPassword);
    return await bcrypt.compare(passwordToHash, password);
  };

  return Object.freeze({
    hashAndSalt,
    checkPassword,
  });
}
