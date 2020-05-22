const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todo-app-details');
const db = mongoose.connection;
db.on('error',console.error.bind(console,"Error Connecting to database"));
db.once('open',function(){
    console.log("SuccessFully Connected");
});

module.exports = db;