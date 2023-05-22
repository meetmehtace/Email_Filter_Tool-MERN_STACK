const jwt = require('jsonwebtoken')
const EA = require('../model/emSchema')
const CSV = require('../model/csvSchema')
const Authenticate = async (req,res,next) =>
{
    var email="";
    try
    {
        if(req.cookies.typeofuser==1)
        {
            email= req.cookies.email; 
        }
        else 
        {
            email= req.cookies.AdminEmail;
        }
              
            const rootUser =await CSV.findOne({email},{_id:0,email:0,__v: 0,scolumn:0});
            const rootUser1 =await CSV.findOne({email},{_id:0,email:0,__v: 0,csvData:0});

            
            if(!rootUser){
                
                throw new Error('user not found');
            } 
            
            // console.log(rootUser.csvData[0]);
            req.rootUser=await columnName(rootUser.csvData[0])
            // console.log(req.rootUser)
            const unick_data=await getUnickData(rootUser1.scolumn)
            req.rootUser=await unick_data;
            // console.log(unick_data)
            next();

            
            async function columnName(result)
            {
                var da={};
                var column_type={}
                var i=0;

                for (const record of Object.keys(result)) 
                {
                    if (record  )
                    {
                        da[i]=record;
                        i++;
                    }
                }

                i=0;

                for (const record of Object.values(result)) 
                {
                    if (record) 
                    {
                        column_type[da[i]]=(typeof record);
                        i++;
                    }
                }
                
                // console.log(column_type);

                return column_type;
            }
            

            async function getUnickData(column_type)
            {
                var result={};
                var unick_data={};

                for (const record of Object.keys(column_type)) 
                {
                    if (record) 
                    {
                        // console.log(column_type[record]);
                        let a =await  "csvData."+column_type[record];
                        result = await CSV.distinct(a);
                        unick_data[column_type[record]]=result;
                    }
                } 

                // console.log(unick_data);

                return unick_data;
            }
        next();
    }
    catch (e)
    {
        res.status(422).json({error:"Unauthorized: NO token"});
        console.log(e);
    }


    // try
    // {
    //     const token= req.cookies.jwtToken;  
    //     const verifyToken = jwt.verify(token,process.env.SECRET_KEY);
    //     const rootUser =await User.findOne({_id:verifyToken._id,"tokens.token":token});
    //     if(!rootUser){
            
    //         throw new Error('user not found');
    //     } 
    //     req.token=token;
    //     req.rootUser=rootUser;
    //     req.userID=rootUser._id;
    //     next();
    // }
    // catch (e)
    // {
    //     return res.status(422).json({error:"Unauthorized: NO token"});
    //     console.log(e);
    // }
}

module.exports=Authenticate;