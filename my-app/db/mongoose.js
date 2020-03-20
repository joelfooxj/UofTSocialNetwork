/* /* Holds Mongoose connection to be accessed by express server.*/
const mongoose = require('mongoose')

/* Connnect to our database */
// Get the URI of the local database, or the one specified on deployment.
//NEED THE PORT IF YOU HAVE MULTPLE DATABASES, 27017 is default
const mongoURI = process.env.MONGODB_URI

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });


module.exports = { mongoose }  // Export the active connection.