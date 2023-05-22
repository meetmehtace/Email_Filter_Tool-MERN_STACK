    const CSV = require('../model/csvSchema')

const GetEmail = async (req,res,next)=>{
    try
    {
        var li =[];
        const a = await req.body.scolumns
        console.log(a)
        // console.log("----------------------------------")
        const email= await req.cookies.email; 
        // console.log(email); 
        var uemail = await CSV.find({email},{_id:0,uemail:1})
        const cn = uemail=await uemail[0].uemail;
        // console.log(cn);
        const result = await CSV.findOne({email},{"csvData":1})
        // console.log(result)
        var arr=[]
        var arr2=[]
        for (var i=0;i<a.length;i++)
        {
            if(i%2==0)
            {
                // console.log("----------"+a[i]+"--------------");
                for(var j =0 ;j<a[i+1].length;j++)
                {
                    // console.log(a[i+1][j])
                    for(var k=0;k<result.csvData.length;k++)
                    {
                        if(a[i+1][j]===result.csvData[k][a[i]])
                        {
                            console.log(result.csvData[k][cn]);
                            if(i==0)arr.push(result.csvData[k][cn]);

                            if(arr.find(o => o === result.csvData[k][cn]))
                            {
                                arr2.push(result.csvData[k][cn]);
                            }
                        }
                    }
                     
                }
                // console.log("first loop con taon    " + arr)
                // console.log("second loop con taon    " + arr2)
                arr=arr2;
                arr2=[];
                // console.log("----------------------------------")
            }
            
        }
        // console.log("**************************************")
        // console.log(arr);
        req.data=arr;
        next();
    }
    catch (e)
    {
        console.log("Error"+e);
        next();
    }
}

module.exports=GetEmail;