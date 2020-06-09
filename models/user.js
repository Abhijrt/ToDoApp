// Schema for storing the list details
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    description : {
        type : String,
        required : true,
    },
    date : {
        type : String,
        required : true
    },
    cat : {
        type : String,
        required : true
    }
},{
    timestamps :true
});


const User = mongoose.model("User",userSchema);

module.exports = User;