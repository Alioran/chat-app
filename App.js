// import the screens
import Start from './components/Start';
import Chat from './components/Chat';
// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// connect to firestore
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Create the navigator
const Stack = createNativeStackNavigator();

// Set up firestore/firebase 
const firebaseConfig = {
  apiKey: "AIzaSyASFDDAl5yR0tKIOIUNiviNaPkHuonQXAY",
  authDomain: "chat-demo-a51ad.firebaseapp.com",
  projectId: "chat-demo-a51ad",
  storageBucket: "chat-demo-a51ad.appspot.com",
  messagingSenderId: "749210254465",
  appId: "1:749210254465:web:fd5a0f0f3d605f9d90e180"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); //get database from firestore to pass into Chat

const App = () => {
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
          {props => <Chat db={db} {...props} />}
          </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

