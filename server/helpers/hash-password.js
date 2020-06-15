import bcrypt from 'bcrypt';

export default function hashPassword() {
  const hashAndSalt = async (password) => {
    const hashed = await bcrypt.hash(password, 10);
    console.log('hashed', hashed);
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
