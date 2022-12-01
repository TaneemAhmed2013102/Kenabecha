const nodemailer = require('nodemailer');

const sendEmail = async (toAddress, link) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'meow666587@gmail.com',
            pass: 'Meow@@121'
        }
    });

    const mailOptions = {
        from: "BechaKena",
        to: toAddress,
        subject: "Verify Your Email at BechaKena",
        text: `http://localhost:3000/verifyemail/${link}`,
    }

    let info = await transporter.sendMail(mailOptions);
    console.log(info);
}

exports.sendEmail = sendEmail;