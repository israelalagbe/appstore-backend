require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const methodOverride = require('method-override')
//const cors = require('cors')(cors_options);
const nodemailer=require('nodemailer')
const mongoose= require('mongoose')
const passport = require('passport');
const port= process.env.PORT ||3000;
const databaseConfig = require('./app/config/database');
//const router = require('./app/routes');
const router = require("./app/routes");
const app = express();


(async ()=>{
    console.log(process.env.TIMES)

    //@ts-ignore
    app.use(passport.initialize());
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({
        limit: '50mb',
        extended: true
    }))

    // parse application/json
    app.use(bodyParser.json({limit: '50mb'}))
    app.use((req,res,next)=>{
        req.connection.setNoDelay(true);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', '*');
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, HEAD, GET, POST, PUT, DELETE');
        next()
    })
    /* .then((conn)=>{
        global.db=conn.connection.db;
        //console.log("connection",conn.connection.db)
    }) */
    mongoose.connect(databaseConfig.url,{ useNewUrlParser: true });
    //@ts-ignore
    const db= mongoose.connection
    //db.dropCollection('orders')
    db.on('error',console.error.bind(console,'connection error'))
    db.once('open',(()=>{
        console.log("connected to db")
    }))
    router(app);
    const server = app.listen(port,(()=>{
        const host = server.address().address
       const port = server.address().port
       
       console.log("Example app listening at http://%s:%s", host, port)
    }));
    
    
})();
