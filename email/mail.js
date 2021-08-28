const sgMail = require('@sendgrid/mail');

const  sendGridKey = "here_comes_the_api_key"
sgMail.setApiKey(sendGridKey);

const sendWelcomeMail = (name,email)=>{
    sgMail.send({
      to: email,
      from: 'mail', // Use the email address or domain you verified above
      subject: `Hello ${name}`,
      text: 'Welcome To Digital Aided School',
    })
}

module.exports = {
    sendWelcomeMail
}
