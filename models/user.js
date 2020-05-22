const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    description : {
        type : String,
        required : true,
    },
    date : {
        type : Date,
        required : true
    },
    category : {
        type : String,
        required : true
    }
},{
    timestamps :true
});


const User = mongoose.model("User",userSchema);

module.exports = User;