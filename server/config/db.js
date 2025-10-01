const { MongoClient } = require('mongodb');
require('dotenv').config({path: './config.env'});

let db;

async function connectToDatabase() {
    if (db) return db;
    
    const client = new MongoClient(process.env.MONGODB_URI);
    
    try {
        await client.connect();
        db = client.db('MyGen');
        console.log('Connected to MongoDB');
        return db;
    } catch (e) {
        console.error('MongoDB connection error:', e);
        process.exit(1);
    }
}

function getDb() {
    if (!db) {
        throw new Error('Database not connected');
    }
    return db;
}

module.exports = { connectToDatabase, getDb };