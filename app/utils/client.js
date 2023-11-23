
// client.js (Assuming you're using some kind of client-side JS framework)

// Import Clerk and other necessary modules
import { loginUser } from './clerk'; // Assuming you have a Clerk authentication function
import { getMessaging, getToken } from 'firebase/messaging';
import firebaseConfig from './firebaseConfig'; // Ensure you have the correct path to your Firebase config
import { sendFCMTokenToServer } from './server'; // Function to send FCM token to your server

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

// Function to handle user login with Clerk
const handleLogin = async () => {
    try {
        // Assuming you have a function for user login using Clerk
        const user = await loginUser();

        // After successful login, get the FCM token
        const currentToken = await getToken(messaging);

        if (currentToken) {
            // Send the FCM token to your server to associate it with the user
            await sendFCMTokenToServer(user.id, currentToken);
        } else {
            console.log("No FCM token available.");
        }
    } catch (error) {
        console.error("Error during login:", error);
    }
};

// Call the handleLogin function when the user logs in
handleLogin();
