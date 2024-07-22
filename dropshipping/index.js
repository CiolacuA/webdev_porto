const express = require('express');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, 'static', 'home.html');
  fs.readFile(indexPath, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Internal Server Error');
      return;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(data);
  });
});

app.use(express.json());

app.post('/send-email', (req, res) => {
  const { cartItems, totalVatAmount } = req.body;

  console.log('Cart Items:', cartItems);
  console.log('Total VAT Amount:', totalVatAmount);
    
  const transporter = nodemailer.createTransport({
    service: 'yahoo',
    auth: {
      user: 'madalinastan04@yahoo.com',
      pass: ''
    }
  });

  const mailOptions = {
    from: 'madalinastan04@yahoo.com',
    to: 'madalinastan04@yahoo.com',
    subject: 'Sty-lo | O nouă comandă a fost plasată',
    html: `
      <a href="http://localhost:${port}/"><img src="https://i.ibb.co/grcp6qj/stylo.png" style="width:150px;height:150px;object-fit:contain; margin:0 25px;border-radius:50%;border:2px solid #333"></a><p style="color:#333;text-align:center;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-size:35px"> Buna! Ne bucuram ca ai comandat de la noi, te mai asteptam! </p>
      <p>Mai jos ai detalii despre comanda ta! <br></p>
      <h5 style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"><c>Conținutul comenzii:</c></h5>
      <ul style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; list-style-type: disc;">
      ${cartItems ? `<li>${cartItems.replace(/\n/g, '</li><li>')}</li>` : ''}
    </ul>
      <p style="color:green;text-align:right;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-size:25px">${totalVatAmount}</p>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      res.sendStatus(500);
    } else {
      console.log('Email sent:', info.response);
      res.sendStatus(200); 
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
