/* eslint-disable no-return-await */
export default function makeAuthDB({ makeDb }) {
  const insertUser = async (username, password, workGroup) => {
    const db = await makeDb();
    return await db
      .collection('users')
      .insertOne({
        username,
        password,
        workGroup,
        token: null,
      });
  };

  const insertToken = async (username, token) => {
    const db = await makeDb();
    return await db
      .collection('users')
      .findOneAndUpdate(
        { username },
        { $set: { token } },
        { returnOriginal: false },
      );
  };

  const deleteToken = async (username, token) => {
    const db = await makeDb();
    const response = await db
      .collection('users')
      .findOneAndUpdate(
        { username, token },
        { $set: { token: null } },
        { returnOriginal: false },
      );

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

  const findUsersByWorkGroup = async () => {
    const db = await makeDb();
    // Not close db connection between methods
    return {
      findUser: async (username) => await db
        .collection('users')
        .find({ username })
        .toArray(),
      findUsers: async (workGroup) => await db
        .collection('users')
        .find({ workGroup })
        .project({ username: 1 })
        .toArray(),
    };
  };

  return Object.freeze({
    insertUser,
    insertToken,
    deleteToken,
    findUserByUsername,
    findUsersByWorkGroup,
  });
}
