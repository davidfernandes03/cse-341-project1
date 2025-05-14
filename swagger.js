const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'API for managing contacts (CSE 341 | BYU-I)'
    },
    host: 'localhost:8080',
    schemes: ['http'],
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