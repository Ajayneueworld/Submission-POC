// import { MongoClient } from 'mongodb'

// let uri = process.env.MONGODB_URI
// let dbName = process.env.MONGODB_DB

// let cachedClient = null
// let cachedDb = null

// if (!uri) {
//   throw new Error(
//     'Please define the MONGODB_URI environment variable inside .env.local'
//   )
// }

// if (!dbName) {
//   throw new Error(
//     'Please define the MONGODB_DB environment variable inside .env.local'
//   )
// }

// export async function connectToDatabase() {
//   if (cachedClient && cachedDb) {
//     return { client: cachedClient, db: cachedDb }
//   }

//   const client = await MongoClient.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })

//   const db = await client.db(dbName)

//   cachedClient = client
//   cachedDb = db

//   return { client, db }
// }

import mongoose from 'mongoose';

const connection = {};

async function dbConnect() {
    if (connection.isConnected) {
        return;
    }

    const db = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;