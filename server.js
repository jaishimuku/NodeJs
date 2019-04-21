const express = require('express');
const app = require('./app');
const router = express.Router();
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

//database connection
mongoose.connect("mongodb+srv://muku:p4Wwjx169IMgNyeQ@project-415-vrxjg.mongodb.net/test?retryWrites=true ", {
    useNewUrlParser: true 
},
function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Database connected Successfully");
    }
    app.listen(port, function(){
        console.log("Listening ...."+port);
    });
});


