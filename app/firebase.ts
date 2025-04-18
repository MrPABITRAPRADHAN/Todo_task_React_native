// Import necessary Firebase services
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB1AD9ALzHJkRaqq2ElosuIdinrR9DbDE0",
    authDomain: "todo-f417a.firebaseapp.com",
    projectId: "todo-f417a",
    storageBucket: "todo-f417a.firebasestorage.app",
    messagingSenderId: "195372160141",
    appId: "1:195372160141:web:63c2353fe8870e7a98fec4",
    measurementId: "G-BPLSXPL9SG"
};

// Initialize Firebase app with the configuration
const app = initializeApp(firebaseConfig);

// Get Firebase authentication
const auth = getAuth(app);

// Export the auth object
export {auth };

// Optionally, you can also export the app object if you need it
export { app };
