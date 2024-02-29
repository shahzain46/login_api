const express = require('express');
const app = express();
const studentRoute = require('./api/modules/student');
const userRoute = require('./api/modules/user');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const router = require("./api/modules/user");

const fileUpload = require('express-fileupload')





mongoose.connect('mongodb+srv://username:yourpassword@mydatabase.lboguaf.mongodb.net/test');



mongoose.connection.on('error',err=>{
    console.log("connection fail")
})

mongoose.connection.on('connected',connected=>{
    console.log('connected with database')
})


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(fileUpload({
    useTempFiles:true
}))

app.use('/student',studentRoute);
app.use('/user',userRoute);


app.use((req,res,next)=>{
    res.status(404).json({
        error:'bad request'
    })
});


app.use((req,res,next)=>{
    res.status(200).json({
        message:'app is running in localhost:3000'
    })
});

module.exports = app
