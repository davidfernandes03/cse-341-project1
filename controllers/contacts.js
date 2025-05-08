const mongodb = require('../database/connect');
const { ObjectId } = require('mongodb');

async function getAllContacts(req, res) {
    try {
        const result = await mongodb.getDb().collection('people').find();
        const contacts = await result.toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(contacts, null, 2));
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch contacts.' });
    }
};

async function getContactById(req, res) {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid contact ID format.' });
        }

        const contact = await mongodb.getDb().collection('people').findOne({ _id: new ObjectId(`${id}`) });

        if (!contact) {
            return res.status(404).json({ error: 'Contact not found.' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(contact, null, 1));
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve contact.' })
    }
}

module.exports = { getAllContacts, getContactById };