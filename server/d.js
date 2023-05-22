//const {messageId,faildmail} = require('./app');
const nodemailer=require('nodemailer');
const {google}=require('googleapis');
const CLIENT_ID='236391813069-he4rud670pr7s3u8m4vov476m25ct4u7.apps.googleusercontent.com'
const CLIENT_SECRT='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'
const REDIRECT_URL='https://developers.google.com/oauthplayground'
const REFRESH_TOKEN='1//04vVhZ-F1rLnZCgYIARAAGAQSNwF-L9IriEZumSD1pX0fsBN940F61L4UL-uUSMqrH9kYRoOf8jHF516_vGPBcQdPpa_OM1FQXrE'
class d
{   
    time=(v,s,t,h)=>  
    {   
        h="<br></br>"+h
         h=t+h
        // console.log(h)
        return new Promise ((resolve,reject)=>
        {  
                
                const oAuth2client=new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRT,REDIRECT_URL)
                oAuth2client.setCredentials({refresh_token:REFRESH_TOKEN})
                async function sendmail()
                {
                    try  
                    {
                        // console.log(v)
                        const accessToken=await oAuth2client.getAccessToken()
                        const transport= nodemailer.createTransport({
                            service: 'gmail',
                            auth:{
                                type:'OAuth2',
                                user: 'mmehta498@rku.ac.in',
                                clientId:CLIENT_ID,
                                clientSecret:CLIENT_SECRT,
                                refreshToken:REFRESH_TOKEN,
                                accessToken:accessToken
                            }
                        })                       
                        const mailOptions={
                            from:'Meet Mehta <mmehta4981@rku.ac.in',
                            to: '',
                            subject:s,
                            text:h,
                            bcc:v,
                            html:h
                        };
                        const result =await transport.sendMail(mailOptions)
                        // console.log(result);
                        console.log("meail sended successfully");
                        resolve();
                        return result
                    }
                    catch (err)
                    {
                        reject();
                        return 0;
                        console.log(err);
                        console.log(err.messageId);
                        console.log('faild to send email id : '+v);
                        // console.log(err);
                    }
                }
                sendmail().then().catch();        
        });
    }
}

module.exports=new d();