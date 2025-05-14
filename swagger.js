const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'API for managing contacts (CSE 341 | BYU-I)'
    },
    host: process.env.NODE_ENV === 'production'
        ? 'cse-341-project1-w4pz.onrender.com'
        : 'localhost:8080',
    schemes: process.env.NODE_ENV === 'production'
        ? ['https']
        : ['http'],
    definitions: {
        Contact: {
            firstName: 'Steve',
            lastName: 'Jobs',
            email: 'stevejobs@example.com',
            favoriteColor: 'Blue',
            birthday: '1990-01-01'
        }
    }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);