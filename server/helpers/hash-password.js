import bcrypt from 'bcrypt';

export default function hashPassword() {

  const async hashPassword = (password) => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  };

  const async checkPassword = (requestPassword, password) => {
    return await bcrypt.compare(requestPassword, password);
  }

  return Object.freeze({
    hashPassword,
    checkPassword
  })

}
