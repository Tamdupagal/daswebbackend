require('dotenv').config();
const nodeMailer  = require('nodemailer');
exports.sendMail = (req,res)=>{
    console.log("req body",req.body);
    let email_id = req.body.email_id;
    let mobile = req.body.mobile;
    let fname = req.body.fname;
    let transporter = nodeMailer.createTransport({
        // sendmail: true,
        // newline: 'unix',
        // path: '/usr/sbin/sendmail'
        service:'gmail',
        auth:{
            user:process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    transporter.sendMail({
        from: process.env.EMAIL,
        to: email_id,
        subject: 'Message',
        html: `<h1>userdata</h1>
                <p>email_id: ${email_id}, mobile: ${mobile}, fname: ${fname}</p>      
        `
    }, (err, info) => {
        // console.log(info.envelope);
        // console.log(info.messageId);
        if (err) {
            console.log("error in sending mail",err)
            return res.status(400).json({


                
                message:`error in sending mail$(err)`
            })
            
        } else {
            console.log("sucessfully send the mail",info)
            return res.json({
                message:info
            })
            
        }
    });
}