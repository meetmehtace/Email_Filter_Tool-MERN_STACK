const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
let cookieParser = require('cookie-parser');
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(require('./router/auth'));
dotenv.config({path:'./config.env'})

const PORT= process.env.PORT;

require('./DB/conn');



const USER = require('./model/userSchema');




app.listen(PORT,(req,res)=>
{
    console.log(`serveer statead at port number ${PORT} `);
});

