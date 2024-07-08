// otpService.js
const nodemailer = require('nodemailer');
const crypto = require('crypto');

let otpStorage = {};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bakytdeveloper@gmail.com',
        pass: 'vlud glov uens emlz'
    }
});

const sendOTP = (email) => {
    const otp = crypto.randomInt(100000, 999999).toString();
    otpStorage[email] = otp;
    transporter.sendMail({
        from: 'bakytdeveloper@gmail.com',
        to: email,
        subject: 'Проверка получения OTP',
        text: `Здравствуйте, это ваш код: ${otp}`
    });
    return otp;
};

const verifyOTP = (email, otp) => {
    return otpStorage[email] === otp;
};

module.exports = { sendOTP, verifyOTP, transporter };
