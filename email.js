const nodemailer=require('nodemailer')
const transporter=new nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"iraghawael207@gmail.com",
        pass:"jcbc bfvb glat hcrz"
    }
})

const mailoptions={
    from:"iraghawael207@gmail.com",
    to:"hawaelhawael2001@gmail.com",
    subject:"test email send by js",
    html:"<p>hello baby</p>"
}

transporter.sendMail(mailoptions,function(error,success){
    if(error)console.log('error')
    else console.log('sccess')
})