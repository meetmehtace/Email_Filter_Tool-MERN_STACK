const express = require('express');
const routes = express.Router();
const multer = require('multer')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const USER = require('../model/userSchema');
const EM=require('../model/emSchema');
const csv = require('../model/csvSchema');
const Authenticate = require('../middleware/Authenticate')
const GetEmail = require('../middleware/GetEmail')
const UserDetail = require('../middleware/UserDetail')
const Approve = require('../middleware/Approve')
const DisApprove = require('../middleware/DisApprove')
var csvtojs = require("csvtojson");

require('../DB/conn');



const middelware = (req,res,next)=>{
    console.log('hello from middelware')
    next();
}

routes.get('/navbarItem',async (req,res)=>{

    console.log("from navbarItem");
    const typeofuser= req.cookies.typeofuser;
    if(typeofuser==0)
    {
        return res.status(201).json({message:["Home","Logout"]});
    }
    return res.status(201).json({message:["Home","UploadCsv","UserDetail","Logout"]});
    
    
})

routes.post('/approve',Approve,async (req,res)=>{

    console.log("from approve");
    const {email}=req.body;
    // console.log(email)
    return res.status(201).json({message:"request recivead "});
    
})

routes.post('/disapprove',DisApprove,async (req,res)=>{

    console.log("from disapprove");
    const {email}=req.body;
    return res.status(201).json({message:"request recivead "});
    
})

routes.post('/upload',async (req,res)=>{

    console.log("from upload");
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }
      req.files.file.name=+Date.now()+req.files.file.name;
      const file = req.files.file;
      const fpath = "./CSV/"+req.files.file.name;
      
      file.mv(`./CSV/${file.name}`, err => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
        
        const csvFilePath=fpath //file path of csv
        csvtojs()
        .fromFile(csvFilePath)
        .then(async (csvData)=>{

            // console.log(csvData);
            
            
            
            res.json({ fileName: file.name, filePath: "abcd",cc:csvData });
           // await createMultipleListing(client,jsonObj);
        })
 
      });

    });




routes.post('/sendMail',GetEmail,async (req,res)=>{

    console.log("from sendMail");
    const {subject,text,html,scolumns}=req.body;
    // console.log(scolumns);
    // console.log(req.rout);

    
    console.log('done');
    console.log(req.data)
    const d = require('../d');
    if(req.data.length==0)
    return res.status(201).json({error:"No mail found"});
    await d.time(req.data,subject,text,html)
    return res.status(201).json({message:"mail seand succesfully"});
    
})

routes.post('/register',middelware,async (req,res) => {
    
    console.log("from register");
    const  {name,email,password,cpassword,tyUser,AdminEmail}=await req.body;
    console.log(tyUser);
    

    if(tyUser===1)
    {
        if(!name || !email || !password || !cpassword)
        {
            return res.status(422).json({error:"plz fill the property"});
        }
        
        try 
        {
            const userExist = await USER.findOne({email:email});       
            if(userExist)
            {
                return res.status(422).json({error:"Email already exist"});
            }

            const user = new USER({name,email,password})

            const userRegister = await user.save();

            if(userRegister)
            {
                return res.status(201).json({message:"user register successfully"});
            }

        }
        catch(err)
        {
            return res.status(422).json({error:"error"});
        }
    }
    else
    {
        const login=0;
        if(!name || !email || !password || !cpassword || !AdminEmail)
        {
            return res.status(422).json({error:"plz fill the property"});
        }
        
        try 
        {
            const userExist = await EM.findOne({email:email});
            
            
            if(userExist)
            {
                return res.status(422).json({error:"Email already exist"});
            }

            const user = new EM({name,email,password,login,AdminEmail})

            const userRegister = await user.save();

            if(userRegister)
            {
                return res.status(201).json({message:"user register successfully"});
            }

        }
        catch(err)
        {
            console.log(err)
            return res.status(422).json({error:err});
        }
    }
    
    
});

routes.get('/Logout' , async (req,res) =>{

    console.log('from Logout')
    res.clearCookie("AdminEmail");
    res.clearCookie("typeofuser");
    res.clearCookie("email");
    res.clearCookie("jwtToken");
    return await res.status(201).json({message:"Success"});
})


routes.get('/authenticate' , async (req,res) =>{
    console.log('from authenticate')
    if( req.cookies.typeofuser ==1)
    {
        return await res.status(201).json({message:"You are  an authorised person"});
    }
    return await res.status(201).json({error:"You are not an authorised person"});
})

routes.get('/UserDetail' ,UserDetail, async (req,res) =>{
    console.log('from UserDetail')
    if( req.cookies.typeofuser ==1)
    {
        return await res.status(201).json(req.data);
    }
    return await res.status(201).json({error:"You are not an authorised person"});
})

routes.get('/getCsvData', Authenticate , async (req,res) =>{
    console.log('from getCsvData')
    if( req.cookies.typeofuser ==1 ||  req.cookies.typeofuser==0)
    {
        // await console.log(req.rootUser);
        // console.log((req.rootUser))
        return await res.send(await (req.rootUser))
    }
    return await res.status(201).json({error:"You are not an authorised person"});  
})

routes.post('/inscsv',async (req,res)=>{

    console.log("from inscsv");
    // console.log(req.body.users)
    // console.log('---------------------------------------------')
    // console.log(req.body.scolumn)

    const csvData=req.body.users;
    const scolumn=req.body.scolumn;
    const uemail=req.body.userEmail;
    const email= req.cookies.email;
    const CSV = new csv({email,csvData,scolumn,uemail});

    const userRegister = await CSV.save();
    if(userRegister)
    {
        return res.status(201).json({message:"Csv file inseart successfully"});
    }
    return res.status(500).json({error: "something wrong detail"});
})
routes.get('/users' , async (req,res) =>{

    const d =[{"id":1,"name":"meet"},{"id":2,"name":"shivam"}]
    await res.send(d)
})


routes.post('/login',middelware,async (req,res) => {
    
    console.log("from login");
    const  {email,password,tyUser}=await req.body;
    if((!email || !password ))
    {
        return res.status(422).json({error:"plz fill the property"});
    }
    
    try 
    {
        if(tyUser===1)
        {
            
            const userExist = await USER.findOne({email:email});
            
            // console.log(userExist);
            
            if(userExist)
            {
                
                const match =await  bcrypt.compare(password, userExist.password);
                if(match)
                {
                    
                    const token= await userExist.generateAuthToken();
                    // console.log(token);
                    res.cookie('jwtToken',token,{
                        expires:new Date(Date.now() + 25892000000),
                        httpOnly:true
                    });
                    res.cookie('email',userExist.email,{
                        expires:new Date(Date.now() + 25892000000),
                        httpOnly:true
                    });
                    res.cookie('typeofuser',1,{
                        expires:new Date(Date.now() + 25892000000),
                        httpOnly:true
                    });
                    return res.status(201).json({message: "courrect detail"});
                }
                else return res.status(422).json({error: "wrong detail"});

            }
        }
        else
        {
            
            const userExist = await EM.findOne({email:email,login:1});
            
            // console.log(userExist);
            
            if(userExist)
            {
                // console.log(userExist.email)
                const match =await  bcrypt.compare(password, userExist.password);
                if(match)
                {
                    const token= await userExist.generateAuthToken();
                    // console.log(token);
                    res.cookie('jwtToken',token,{
                        expires:new Date(Date.now() + 25892000000),
                        httpOnly:true
                    });
                    res.cookie('email',userExist.email,{
                        expires:new Date(Date.now() + 25892000000),
                        httpOnly:true
                    }); 
                    res.cookie('typeofuser',0,{
                        expires:new Date(Date.now() + 25892000000),
                        httpOnly:true
                    });
                    res.cookie('AdminEmail',userExist.AdminEmail                    ,{
                        expires:new Date(Date.now() + 25892000000),
                        httpOnly:true
                    });
                    return res.status(201).json({message: "courrect detail"});
                }
                else return res.status(422).json({error: "wrong detail"});

            }
        
            return res.status(422).json({error:"wrong detail"});

        }
        
    }
    catch(err)
    {
        return res.status(422).json({error:"wrong detail"});
        console.log(err);
    }
    
});
module.exports = routes;