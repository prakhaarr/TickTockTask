// Example: notificationService.js

const nodemailer = require('nodemailer');

const sendNotification = async (email, subject, message) => {
    // Set up the nodemailer transporter with your email service credentials
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your_email@gmail.com',
            pass: 'your_email_password',
        },
    });

    // Define the email options
    const mailOptions = {
        from: 'your_email@gmail.com',
        to: email,
        subject,
        text: message,
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);
        console.log('Notification email sent successfully');
    } catch (error) {
        console.error('Error sending notification email:', error);
    }
};

module.exports = {
    sendNotification,
};
