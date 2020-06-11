import mongodb from 'mongodb';
import { MONGO_DB } from '../../config/config';

export default async function makeDb() {
  const { MongoClient } = mongodb;
  const url = MONGO_DB;
  const dbName = 'auth';
  const client = new MongoClient(url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  await client.connect();
  const db = await client.db(dbName);
  // eslint-disable-next-line no-use-before-define
  db.makeId = makeIdFromString;
  return db;
}
function makeIdFromString(id) {
  return new mongodb.ObjectID(id);
}
