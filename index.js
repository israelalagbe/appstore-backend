var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var methodOverride = require('method-override')
//const cors = require('cors')(cors_options);
var nodemailer=require('nodemailer')
var mongoose= require('mongoose')
var passport = require('passport');
var port= process.env.PORT ||3000;
var databaseConfig = require('./app/config/database');
var router = require('./app/routes');
var app = express();

// parse application/x-www-form-urlencoded
(async ()=>{
    app.use(passport.initialize());

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
    var db= mongoose.connection
    //db.dropCollection('orders')
    db.on('error',console.error.bind(console,'connection error'))
    db.once('open',(()=>{
        console.log("connected to db")
    }))
    router(app);
    var server = app.listen(port,(()=>{
        var host = server.address().address
       var port = server.address().port
       
       console.log("Example app listening at http://%s:%s", host, port)
    }));
    
    
})();
