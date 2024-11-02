// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); // Increase limit for large base64 images

app.post('/send-email', async (req, res) => {
    try {
        const { emailAddress, chartImage } = req.body;
        console.log("Email sent successfully");
        // let transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: process.env.EMAIL_USER,
        //         pass: process.env.EMAIL_PASS
        //     }
        // });

        // let mailOptions = {
        //     from: `"Bucks2Bar" <${process.env.EMAIL_USER}>`,
        //     to: emailAddress,
        //     subject: 'Monthly Chart',
        //     text: 'Please find the attached chart image.',
        //     attachments: [
        //         {
        //             filename: 'chart.png',
        //             content: chartImage.split("base64,")[1],
        //             encoding: 'base64'
        //         }
        //     ]
        // };

        // transporter.sendMail(mailOptions, (error, info) => {
        //     if (error) {
        //         return res.status(500).send(error.toString());
        //     }
        //     res.status(200).send('Message sent: ' + info.messageId);
        // });
    } catch (error) {
        res.status(500).send('Error sending email: ' + error.toString());
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});