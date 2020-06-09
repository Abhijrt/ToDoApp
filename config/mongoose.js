// DataBase setup for using the mongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todo-app');
const db = mongoose.connection;
// when any error come
db.on('error',console.error.bind(console,"Error Connecting to database"));
// When the data connect
db.once('open',function(){
    console.log("SuccessFully Connected");
});

module.exports = db;