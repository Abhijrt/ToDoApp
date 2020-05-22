const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.use(express.static('./assets'));
const db = require('./config/mongoose');
const User = require('./models/user');
app.use(express.urlencoded());
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use('/',require('./routes'));
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log(`Error in connecting to the server : ${port}`);
        return ;
    }
    console.log(`Successfully Connected to the server : ${port}`);
});