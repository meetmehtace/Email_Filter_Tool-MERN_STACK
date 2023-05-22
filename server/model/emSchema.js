const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const eaSchema = new mongoose.Schema({
    name:{
        type :String,
        required:true
    },
    email:{
        type :String,
        required:true
    },
    password:{
        type:String,
        require:true
    },
    login:{
        type:Number,
        require:true
    },
    AdminEmail:{
        type:String,
        require:true
    },
    tokens:[
        {
            token:
            {
                type:String,
                require:true
            }
        }
    ]
})


eaSchema.pre('save',async function(next)
{
   
    if(this.isModified('password'))
    {
        console.log("inside ")
        this.password=await bcrypt.hash(this.password,12);
    }
    next();
});



eaSchema.methods.generateAuthToken = async function()
{
    try
    {
        let token=jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    }
    catch(err)
    {
        console.log(err);
    }
}

const EM = mongoose.model('p2',eaSchema);

module.exports=EM;
