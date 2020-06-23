/* eslint-disable no-return-await */
export default function makeAuthDB({ makeDb }) {
  const insertUser = async (username, password) => {
    const db = await makeDb();
    return await db
      .collection('users')
      .insertOne({ username, password });
  };


  const insertToken = async (username, token) => {
    const db = await makeDb();
    return await db
      .collection('tokens')
      .replaceOne(
        { username },
        { username, token },
        { upsert: true },
      );
  };

  const deleteToken = async (username, token) => {
    const db = await makeDb();
    const response = await db
      .collection('tokens')
      .findOneAndDelete({ username, token });

    if (response.lastErrorObject.n === 1) return true;
    return false;
  };

  const findUserByUsername = async (username) => {
    const db = await makeDb();
    return await db
      .collection('users')
      .find({ username })
      .toArray();
  };

  const findTokenByUsername = async (username) => {
    const db = await makeDb();
    return await db
      .collection('tokens')
      .find({ username })
      .toArray();
  };

  return Object.freeze({
    insertUser,
    insertToken,
    deleteToken,
    findUserByUsername,
    findTokenByUsername,
  });
}
