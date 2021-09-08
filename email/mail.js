const sgMail = require('@sendgrid/mail');

const  sendGridKey = "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"
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
