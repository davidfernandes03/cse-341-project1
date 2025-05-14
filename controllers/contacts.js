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

async function createContact(req, res) {
    try {
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };

        const result = await mongodb.getDb().collection('people').insertOne(contact);

        res.status(201).json({
            message: 'Contact created',
            id: result.insertedId
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create contact.' });
    }
}

async function updateContact(req, res) {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID' })
        };

        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };

        const result = await mongodb.getDb().collection('people').updateOne(
            { _id: new ObjectId(`${id}`) },
            { $set: contact }
        );

        if (result.modifiedCount > 0) {
            res.status(200).json({ message: 'Contact updated!' })
        } else {
            res.status(404).json({ error: 'Contact not found or no changes made.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update contact.' });
    }
}

async function deleteContact(req, res) {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID' })
        };

        const result = await mongodb.getDb().collection('people').deleteOne(
            { _id: new ObjectId(`${id}`) }
        )

        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'Contact deleted!' })
        } else {
            res.status(404).json({ error: 'Contact not founds.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete contact.' });
    }
}

module.exports = { getAllContacts, getContactById, createContact, updateContact, deleteContact };