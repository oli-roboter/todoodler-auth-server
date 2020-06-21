import mongodb from 'mongodb';

let url;
let client;
export const setUrl = (newUrl) => {
  url = newUrl;
};

export async function makeDb() {
  const { MongoClient } = mongodb;
  const dbName = 'auth';
  // this connects to the port where mongo is listening
  client = new MongoClient(url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  if (!client.isConnected()) {
    await client.connect();
  }
  return client.db(dbName);
}
