import { MONGO_DB } from '../../config/config'
// import mongodb from 'mongodb'

// export default async function makeDb() {
//   const MongoClient = mongodb.MongoClient
//   const url = MONGO_DB
//   const dbName = 'mm_api_demo'
//   const client = new MongoClient(url, { useNewUrlParser: true })
//   await client.connect()
//   const db = await client.db(dbName)
//   db.makeId = makeIdFromString
//   return db
// }
// function makeIdFromString(id) {
//   return new mongodb.ObjectID(id)
// }