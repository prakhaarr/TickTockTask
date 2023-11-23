// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { sendNotification } = require('./firebase'); // Assuming the correct path to your firebase.js

const app = express();

// Your existing server setup code here...

const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb+srv://merntask319:mern319@cluster0.qbo8zfk.mongodb.net/nextauth?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
// Middleware to parse JSON requests
app.use(bodyParser.json());

// Endpoint to receive the FCM token from the client
app.post('/store-fcm-token', async (req, res) => {
    const { userId, fcmToken } = req.body;

    try {
        // Store the FCM token in your database associated with the user
        await storeFCMTokenInDatabase(userId, fcmToken);

        // Send a welcome notification to the user
        const welcomeMessage = 'Welcome! You have successfully logged in.';
        await sendNotification(userId, welcomeMessage);

        res.status(200).json({ message: 'FCM token stored successfully' });
    } catch (error) {
        console.error('Error storing FCM token:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Function to store the FCM token in the database
// Replace this with your actual database logic
const storeFCMTokenInDatabase = async (userId, fcmToken) => {
    try {
        const collection = mongoose.connection.collection('users'); // Assuming 'users' is your collection name

        // Update the user's FCM token using updateOne operation
        const result = await collection.updateOne(
            { _id: mongoose.Types.ObjectId(userId) },
            { $set: { fcmToken: fcmToken } }
        );

        if (result.modifiedCount === 0) {
            console.error(`User with ID ${userId} not found or FCM token not updated.`);
            // You might want to handle this case based on your application logic
        } else {
            console.log(`FCM token stored in the database for user ${userId}.`);
        }
    } catch (error) {
        console.error('Error storing FCM token in the database:', error);
        throw error; // You may want to handle or log the error accordingly
    }
};

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});