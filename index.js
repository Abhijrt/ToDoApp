const express = require('express');
const app = express();
const port = 8000;

app.listen(port,function(err){
    if(err){
        console.log(`Error in connecting to the server : ${port}`);
        return ;
    }
    console.log(`Successfully Connected to the server : ${port}`);
});