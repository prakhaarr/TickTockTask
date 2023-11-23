
// firebase.js

const { initializeApp } = require("firebase/app");
const { getMessaging, getToken } = require("firebase/messaging");

const { prisma } = require('./connect.ts');
const admin = require('firebase-admin');

const firebaseConfig = {

    apiKey: "AIzaSyD9fnIK10HRCzqFpsltC4PkuZ5ZMYk_bJo",
    authDomain: "todo-app-319.firebaseapp.com",
    projectId: "todo-app-319",
    storageBucket: "todo-app-319.appspot.com",
    messagingSenderId: "994180155749",
    appId: "1:994180155749:web:d44b9b185b9cd1bcb2f98c",
    measurementId: "G-NBMBMNWVTR"
};
// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);
const serviceAccount = require('C:\\Users\\HP\\Desktop\\todoapp\\todo\\todo-app-319-firebase-adminsdk-qyeiw-ae1f8c506d.json'); // Replace with your service account key
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // Other configurations if needed
});
// Function to send FCM notification
const sendNotification = async (userId, message) => {
    try {
        // Assuming you have a function to get the FCM token for the user from your database
        const fcmToken = await getFCMToken(userId);
        console.log(`FCM Token for user ${userId}:`, fcmToken);

        // Check if the user has a valid FCM token
        if (fcmToken) {
            // Set up the FCM payload
            const payload = {
                notification: {
                    title: 'Task Reminder',
                    body: message,
                },
            };

            // Send the FCM notification
            // Assuming admin.messaging() is already initialized elsewhere in your code
            await admin.messaging().sendToDevice(fcmToken, payload);

            console.log(`Notification sent to user ${userId}: ${message}`);
        } else {
            console.log(`User ${userId} does not have a valid FCM token.`);
        }
    } catch (error) {
        console.error('Error sending FCM notification:', error);
    }
};

// Function to get FCM token for a user (replace this with your actual logic)
const messaging = getMessaging(firebaseApp);

const getFCMToken = async (userId) => {
    try {
        const currentToken = await getToken(messaging);
        return currentToken || null;
    } catch (error) {
        console.error('Error getting FCM token:', error);
        throw error;
    }
};


module.exports = {
    sendNotification,
    getFCMToken, // Export this function if needed
};















