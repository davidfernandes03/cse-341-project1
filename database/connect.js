const { MongoClient } = require('mongodb');
require('dotenv').config();

let db;

async function connectToDatabase() {
    try {
        const client = new MongoClient(process.env.MONGO_URI);
        await client.connect();
        db = client.db('contacts');
        console.log('MongoDB connected successfully!');
    } catch (error) {
        console.error('MongoDB failed to connect:', error.message);
        throw error;
    }
}

function getDb() {
    if (!db) {
        throw new Error("Database not initialized.");
    }
    return db;
};

module.exports = { connectToDatabase, getDb };