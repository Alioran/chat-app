// import the screens
import Start from './components/Start';
import Chat from './components/Chat';
// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { Alert } from "react-native";
import { useEffect } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// connect to firestore
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";

import { useNetInfo }from '@react-native-community/netinfo';
import { getStorage } from "firebase/storage";

const App = () => {
// Create the navigator
const Stack = createNativeStackNavigator();

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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); //get database from firestore to pass into Chat

// store connection status in a variable
const connectionStatus = useNetInfo();
// Disable/Enable db if there isn't/is internet connection
useEffect(() => {
  if (connectionStatus.isConnected === false) {
    Alert.alert("Connection Lost!");
    disableNetwork(db);
  } else if (connectionStatus.isConnected === true) {
    enableNetwork(db);
  }
}, [connectionStatus.isConnected]); //run useEffect when connection changes

const storage = getStorage(app);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start" //the app starts on Start screen
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
        >
          {props => <Chat isConnected={connectionStatus.isConnected} db={db} storage={storage} {...props} />}
          </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

