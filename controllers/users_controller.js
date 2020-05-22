
const User = require('../models/user');
module.exports.create = function(req,res){
    User.create(req.body,function(err){
        if(err){
            console.log("Error in adding data to database");
            return;
        }
        return res.redirect('back');
    })
}

