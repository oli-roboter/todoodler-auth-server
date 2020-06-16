import bcrypt from 'bcrypt';

export default function hashPassword() {
  const hashAndSalt = async (password) => {
    const hashed = await bcrypt.hash(password, 10);
    return hashed;
  };

  const checkPassword = async (requestPassword, password) => {
    const isPasswordValid = await bcrypt.compare(requestPassword, password);
    return isPasswordValid;
  };

  return Object.freeze({
    hashAndSalt,
    checkPassword,
  });
}
