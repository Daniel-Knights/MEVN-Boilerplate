const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

router.post('/', (req, res) => {
    const htmlOutput = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');
        </style>
        <body 
            style="
                padding: 10px 0px;
                width: fit-content;
                color: #2c3e50;
            "
        >
            <table 
                style="
                    width: 440px; 
                    min-height: 80vh;
                    background: linear-gradient(to right, #bcffb8, #5bd658 70%);
                "
            >
                <tbody>
                    <tr>
                        <td>
                            <h3 
                                style="
                                    display: block;
                                    margin: 30px auto 0;
                                    width: 440px;
                                    height: 30px;
                                    font-family: 'Raleway', 'Palatino Linotype', 'Book Antiqua', Palatino, serif; 
                                    font-size: 20px;
                                "
                                align="center"
                            >
                                Contact Details
                            </h3>
                        </td>
                    </tr>
                    <tr>
                        <td 
                            style="white-space: pre-line; 
                                font-family: 'Raleway', 'Palatino Linotype', 'Book Antiqua', Palatino, serif; 
                                font-size: 18px;" 
                            align="center"
                        >
                            Name: ${req.body.name}
                        </td>
                    </tr>
                    <tr>
                        <td 
                            style="white-space: pre-line; 
                                font-family: 'Raleway', 'Palatino Linotype', 'Book Antiqua', Palatino, serif; 
                                font-size: 18px;" 
                            align="center"
                        >
                            Email: ${req.body.email}
                        </td>
                    </tr>
                    <tr>
                        <td 
                            style="white-space: pre-line; 
                                font-family: 'Raleway', 'Palatino Linotype', 'Book Antiqua', Palatino, serif; 
                                font-size: 18px;" 
                            align="center"
                        >
                            Phone: ${req.body.phone}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h3 
                                style="
                                    display: block;
                                    margin: 30px auto 0;
                                    width: 440px;
                                    height: 30px;
                                    font-family: 'Raleway', 'Palatino Linotype', 'Book Antiqua', Palatino, serif; 
                                    font-size: 20px;
                                "
                                align="center"
                            >
                                Message
                            </h3>
                        </td>
                    </tr>
                    <tr>
                        <td 
                            style="white-space: pre-line; 
                                font-family: 'Raleway', 'Palatino Linotype', 'Book Antiqua', Palatino, serif; 
                                font-size: 18px; 
                                padding: 0 20px;" 
                            align="center"
                        >
                            ${req.body.message}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <small 
                                style="
                                    display: block;
                                    margin: 30px auto 0;
                                    width: 440px;
                                    height: 30px;
                                    font-family: 'Raleway', 'Palatino Linotype', 'Book Antiqua', Palatino, serif; 
                                "
                                align="center"
                            >
                                Daniel Knights | 2020
                            </small>
                        </td>
                    </tr>
                </tbody>
            </table>
        </body>
    `;

    const plaintextOutput = `
        Contact Details
        - Name:  ${req.body.name}
        - Email:  ${req.body.email}
        - Phone:  ${req.body.phone}
        
        Message:
        ${req.body.message}
    `;

    async function main() {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_ACCOUNT, // generated ethereal user
                pass: process.env.EMAIL_PASSWORD, // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: `"${req.body.name}" <${req.body.email}>`, // sender address
            to: process.env.EMAIL_ACCOUNT, // list of receivers
            subject: `Message from ${req.body.name}`, // Subject line
            text: plaintextOutput, // plain text body
            html: htmlOutput, // html body
        });

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.json({ success: true, msg: 'Message Sent' });
    }

    main().catch(err => {
        res.status(400).json({
            success: false,
            msg: 'Message Failed to Send',
            err: err.message,
        });
    });
});

module.exports = router;
