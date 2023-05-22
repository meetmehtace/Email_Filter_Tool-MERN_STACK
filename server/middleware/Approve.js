const EM = require('../model/emSchema')

const Approve = async (req,res,next)=>{
    try
    {
        const email= await req.body.email
        console.log(email); 
        // db.student.update({name:"avi"},{$set:{name:"helloword"}})
        const result = await EM.updateOne({email},{login:"1"})
        // // console.log(result)
        // req.data=result;
        next();
    }
    catch (e)
    {
        console.log("Error"+e);
        next();
    }
}

module.exports=Approve;