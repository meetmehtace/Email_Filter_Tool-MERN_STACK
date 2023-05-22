const EM = require('../model/emSchema')

const UserDetail = async (req,res,next)=>{
    try
    {
        const AdminEmail= await req.cookies.email; 
        // console.log(AdminEmail); 
        const result = await EM.find({AdminEmail},{_id:0,name:1,email:1,login:1})
        // console.log(result)
        req.data=result;
        next();
    }
    catch (e)
    {
        console.log("Error"+e);
        next();
    }
}

module.exports=UserDetail;