import { readFile } from 'fs';
import { createServer } from 'http';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_password'
  }
});

createServer((req, res) => {
  if (req.url === '/send-email') {
    const mailOptions = {
      from: 'your_email@gmail.com',
      to: 'recipient_email@example.com',
      subject: 'Test Email',
      text: 'This is a test email sent from Node.js!'
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('500: Internal Server Error');
      } else {
        console.log('Email sent: ' + info.response);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('Email sent successfully!');
      }
    });
  } else {
    readFile(__dirname + req.url, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('404: File not found');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  }
}).listen(8000);

/*<pre>
  <code>
    var nodemailer=require ('nodemailer');
    var fs=require ('fs');
    require.extensions ['.html'] = function (module, filename) {
      module.exports = fs.readFileSync (filename, 'utf8');
    };
    var data = require ('index.html'); // path to your HTML template
    var transporter=nodemailer.createTransport (
      {
        service:'gmail',
        auth: {
          user:'Me@gmail.com',
          pass:'********'
        }
      }
    );
    var mailOptions= {
      from:'Me@gmail.com',
      to:'ToMyFriend@gmail.com',
      subject:'Sending HTML page using Node JS',
      html:data
    };
    transporter.sendMail (mailOptions,function (error,info) {
      if (error) {
        console.log (error);
      } else {
        console.log ('Email Sent: '+info.response);
      }
    });
  </code>
</pre>
*/