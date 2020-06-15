import bcrypt from 'bcrypt';

export default function hashPassword() {
  const hashAndSalt = async (password) => {
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
  };

  const checkPassword = async (requestPassword, password) => {
    const isTokenValid = await bcrypt.compare(requestPassword, password);
    return isTokenValid;
  };

  return Object.freeze({
    hashAndSalt,
    checkPassword,
  });
}
