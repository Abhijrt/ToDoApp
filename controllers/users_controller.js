const User = require('../models/user');

module.exports.create = async function(req,res){
    try{
        console.log(req.body);
        let dates=new Date(req.body["date"]);
        console.log(dates,"Converted");
        dates=dates.toDateString();
        console.log(dates,"stringconverted");
        let datearr=dates.split(" ");
        let finalDate=datearr[2]+" "+datearr[1]+" , "+datearr[3];
        console.log(finalDate,"finalDate");
        let newlist = await User.create({
            description:req.body.description,
            cat:req.body.category,
            date:finalDate
        });
        if(req.xhr)
        {
            console.log("We are in ajax call");
            return res.json(200,{
                message:"Added List Successfully!",
                data:{
                    newlist:newlist
                }
            })
        }
        console.log("We are in node js");
        return res.redirect("back");
    }catch(err){
        console.log("error in creating list ",err);
        return;
    }
}

module.exports.destroy = async function(req,res){
    try
    {
        console.log("body ",req.query);
        var id=req.query;
        let delItems=[];
        //finding the no of selected checkboxes
        var count=Object.keys(id).length;
        
        for(let key of Object.keys(id)){
            //console.log("key ",key);
            let deletedItem=await User.findByIdAndDelete(key);
            console.log(deletedItem);
            delItems.push(deletedItem);
        }
        console.log(delItems);
        if(req.xhr)
        {
            console.log("We are in the ajax call of destroy");
            console.log(delItems);
            return res.json(200,{
                message:"Selected Lists deleted Successfully",
                data:{
                    deletedItems:delItems,
                }
            });
        }
        console.log("We are in node js");

        return res.redirect("back");
    }
    catch(err)
    {
        console.log("error in deleting lists ",err);
        return;
    }
}

