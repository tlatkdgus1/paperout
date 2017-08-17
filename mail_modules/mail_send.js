var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'hellochainkorea@gmail.com',
    pass: 'hellornrmf?'
  }
});

var mailOptions = {
  from: 'youremail@gmail.com',
  to: 'ipod1597@naver.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

exports.sendmail = function () {transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
})};
