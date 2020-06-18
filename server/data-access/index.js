import mongodb from 'mongodb';
import { MONGO_DB } from '../../config/config';

const { MongoClient } = mongodb;
const url = MONGO_DB;
const dbName = 'auth';
const client = new MongoClient(url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

export default async function makeDb() {
  if (!client.isConnected()) {
    await client.connect();
  }
  return client.db(dbName);
}
