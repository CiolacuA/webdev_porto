const http = require('http');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
  console.log(`Request for ${req.url} using ${req.method} method`);

  // Serve index.html for the root URL
  if (req.url === '/') {
    const indexPath = path.join(__dirname, "static/home.html");
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
  }

  // Handle POST request to send email
  else if (req.method === 'POST' && req.url === '/send-email') {
    collectRequestData(req, (data) => {
      // Create a transporter object using the SMTP transport
      const transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false,
        auth: {
          user: 'c.andrei2000@outlook.com',
          pass: 'your_password'
        }
      });

      // Construct the email message
      const mailOptions = {
        from: 'c.andrei2000@outlook.com',
        to: 'agamerul@outlook.com',
        subject: 'Order Confirmation',
        text: buildEmailBody(data)
      };

      // Function to build the email body using the JSON data
      function buildEmailBody(data) {
        let body = `Hello,\n\nThank you for your recent order. Here are the details:\n\n`;

        data.items.forEach(item => {
          body += `Item Name: ${item.itemName}\n`;
          body += `Quantity: ${item.quantity}\n`;
          body += `Price: ${item.price}\n`;
          body += `CartItemID: ${item.cartItemID}\n\n`;
        });

        body += `Total Price: ${data.totalPrice}\n`;
        body += `Total Price (with TVA): ${data.totalPriceTVA}\n\n`;
        body += `If you have any questions, please feel free to contact us.\n\n`;
        body += `Regards,\nYour Company`;

        return body;
      }

      // Send the email
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log("An error occurred while sending the email:");
          console.log(error);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Internal Server Error');
        } else {
          console.log("Email sent successfully!");
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Email sent successfully!');
        }
      });
    });
  }

  // Serve static files from the "public" directory
  else {
    const filePath = path.join(__dirname, 'static', req.url);
    const fileExt = path.extname(filePath);
    const contentType = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.png': 'image/png',
      '.jpg': 'image/jpg',
      '.gif': 'image/gif'
    }[fileExt] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('File Not Found');
        return;
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', contentType);
      res.end(data);
    });
  }
});

// Function to collect data from a POST request
function collectRequestData(request, callback) {
  let requestData = '';
  request.on('data', (chunk) => {
    requestData += chunk.toString();
  });
  request.on('end', () => {
    const parsedData = JSON.parse(requestData);
    callback(parsedData);
  });
}

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
