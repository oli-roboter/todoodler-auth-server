export default function makeAuthDB({ makeDb }) {
  const insertUser = async (username, password) => {
    const db = await makeDb();
    const result = await db
      .collection('users')
      .insertOne({ username, password });

    return result;
  };

  const findUserByUsername = async (username) => {
    const db = await makeDb();
    const result = await db
      .collection('users')
      .find({ username })
      .toArray();

    return result;
  };

  const findTokenByUsername = async (username) => {
    const db = await makeDb();
    const result = await db
      .collection('tokens')
      .find({ username })
      .toArray();

    return result;
  };

  return Object.freeze({
    insertUser,
    findUserByUsername,
    findTokenByUsername,
  });
}
