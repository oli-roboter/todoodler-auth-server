/* eslint-disable no-return-await */
import bcrypt from 'bcrypt';

const convertToString = (password) => {
  if (typeof password === 'string') return password;
  return JSON.stringify(password);
};

export default function hashPassword() {
  const hashAndSalt = async (password) => {
    const returnStringPassword = convertToString(password);
    return await bcrypt.hash(returnStringPassword, 10);
  };

  const checkPassword = async (requestPassword, password) => {
    const passwordToCompare = convertToString(requestPassword);
    return await bcrypt.compare(passwordToCompare, password);
  };

  return Object.freeze({
    hashAndSalt,
    checkPassword,
  });
}
