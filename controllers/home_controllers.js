const User = require('../models/user');
// home controller when we render to the home
module.exports.home = function(req,res){
    User.find({},function(err,details){
        if(err){
            console.log("Error in finding the data from database");
            return;
        }
        if(details){
            return res.render('home',{
                title : "Home Page",
                details : details
            });
        }
    });
}