import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  LogBox,
} from "react-native";
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const Chat = ({ isConnected, db, storage, route, navigation }) => {
  const { userID, name, color } = route.params;
  const [messages, setMessages] = useState([]);

useEffect(() => {
  //set the Chat header to have the name and color selected on Start
  navigation.setOptions({
    title: name,
    headerStyle: { backgroundColor: color },
  });

  let unsubMessages;
  //if there is a connection, then load messages from the database
  if (isConnected === true) {
    // unregister current onSnapshot() listener to avoid registering multiple listeners when
    // useEffect code is re-executed.
    if (unsubMessages) unsubMessages();
    unsubMessages = null;

    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    // onSnapshot listens to changes in Firestore collection
    // q is the query the argument listens to
    // documentSnapshot is a callback function to see if there are any changes that match the query
    unsubMessages = onSnapshot(q, (documentsSnapshot) => {
      let newMessages = [];
      documentsSnapshot.forEach((doc) => {
        const timestamp = doc.data().createdAt.toDate(); //convert the createdAt data to something Javascript can read
        newMessages.push({ id: doc.id, ...doc.data(), createdAt: timestamp }); //push new message onto the doc, replace createdAt with new timestamp
      });
      //put any new messages into the database and the cache
      cacheMessages(newMessages);
      setMessages(newMessages);
    });
  } else loadCachedMessages(); //otherwise load the cached messages

  // Clean up code
  // this stops further updates (unsubs from Firestore listener)
  return () => {
    if (unsubMessages) unsubMessages();
  };
}, [isConnected]); //run useEffect again whenever the connection changes


  // show the speech bubble and color them based on side
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
      />
    );
  };

  // prevent toolbar render if there is no connection
  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

  // renders CustomActions.js
  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} userID={userID} {...props} />;
  };

  // renders the map within the chat bubble
  const renderCustomView = (props) => {
    const { currentMessage} = props;
    if (currentMessage.location) {
      return (
          <MapView
            style={{width: 150,
              height: 100,
              borderRadius: 13,
              margin: 3}}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
      );
    }
    return null;
  }

  //add new messages to what was previously in messages
  const onSend = (newMessages) => {
    //add new messages as third argument for it to be the first to be the first item
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  // load cached messages when offline
  // data is stored as JSON strings so need to parse
  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  // cache messages for offline use
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        onSend={(messages) => onSend(messages)}
        renderCustomView={renderCustomView}
        user={{
          _id: userID,
          name: name,
        }}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" /> //prevents keyboard from hiding parts of the page
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
