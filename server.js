const express = require('express');
const { connectToDatabase } = require('./database/connect');
const contactsRoutes = require('./routes/contacts');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use('/contacts', contactsRoutes);

connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch((error) => {
    console.error(`Mongodb failed to connect: ${error}`);
});