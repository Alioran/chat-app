# Chat App
This chat app is a platform for both iOS and Android, and allow users to send messages, images and locations to friends and family. The UI will also be customizable, and data is stored both online and offline.

## Tools used so far
- React Native
- Expo/Expo Go
- Gifted Chat
- Firestore/Firebase
- Android Studio

## Cloning the Repository and Self-testing
If you would like to duplicate this project, but want to use your own database, here's what you need to do:
### Install Libraries
Before installing expo, make sure you change to Node version 16
- nvm install 16.19.0
- nvm use 16.19.0
- nvm alias default 16.19.0

Install Expo and Expo CLI:
- npm install -g expo-cli

Now you can install the remaining libraries (locally or globally):
- npm install --save @react-navigation/native @react-navigation/native-stack
- expo install react-native-screens react-native-safe-area-context
- npm install react-native-gifted-chat --save
- npm install firebase@10.3.1 --save
- expo install @react-native-community/netinfo
- expo install @react-native-async-storage/async-storage 
- expo install expo-image-picker
- expo install expo-location
- expo install react-native-maps

### Emulators and Expo Go
1) Download a mobile emulator of your choice (such as Android Studio).
2) Set up a emulated device that has access to its corresponding app store (such as Google Play).
3) Download Expo Go on your emulator and physical phone (or set up two emulators if you prefer).

### Firebase Setup
1) Create an account/use a Google account on Google Firebase: https://firebase.google.com/
2) Create a project, then go to your project settings (gear icon). Under the General tab and the secion Your apps, click the Firestore for Web (</>) icon.
3)  Replace the code below in the App.js file with your own firebaseConfig.
```
// Set up firestore/firebase 
const firebaseConfig = {
  //=================================
  //Replace this code with your own if you replicating this project for yourself
  apiKey: "AIzaSyASFDDAl5yR0tKIOIUNiviNaPkHuonQXAY",
  authDomain: "chat-demo-a51ad.firebaseapp.com",
  projectId: "chat-demo-a51ad",
  storageBucket: "chat-demo-a51ad.appspot.com",
  messagingSenderId: "749210254465",
  appId: "1:749210254465:web:fd5a0f0f3d605f9d90e180"
  //=================================
};
```
4) Go to Build -> Firestore Database and create a database using production mode and use a multi-region label for the location.
5) On your new database, go to the Rules tab and change the line `allow read, write: if false;` from `false` to `true` and click publish. No need to start a collection since the app will do that on its own
6) Go to Build -> Storage, then click "Get started". Keep all the default settings. Once the storage has been made, repeat step 5 for this section.
7) Go to Build -> Authentication and click the "Sign-in" method tab. Click "Anonymous" and click the toggle to Enable, then save.

### Running the program
In your base folder, run `expo start`, then open up Expo Go on one or both devices to test the functionality. If you want to test the offline functionality, run `expo start --offline` and turn off your emulator's/devices Wi-Fi and cellular connection while running the program.

## Updates
- 10/19/23: Added functions to be able to upload and send images (both via library and camera) and location.
- 10/18/23: Set up app to allow users to cache previous messages and read them while offline. Text input is also disabled in offline mode.
- 10/17/23: Created a database with Firestore/Firebase to allow users to sign in anonymously and chat. Messages are stored on the database.
- 10/12/23: Added Gifted Chat to the chat page and applied dummy messages as an example. 
- 10/11/23: Created template using React Native and created 2 screens, the landing page screen where users can enter their username and color choice and second screen where the color and name carries over. No functionality for chatting yet.