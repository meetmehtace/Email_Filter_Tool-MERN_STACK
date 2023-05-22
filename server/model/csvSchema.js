const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { json } = require('express');
const csvSchema = new mongoose.Schema({
    email:{
        type :String,
        required:true
    },
    csvData:[
        {
            type:Object,
            require:true
        },
    ],
    scolumn:{
        type:Array,
        require:true
    },
    uemail:{
        type:String,
        require:true
    }

})

const csv = mongoose.model('csv',csvSchema);
module.exports=csv;
