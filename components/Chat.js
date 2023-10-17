import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  LogBox,
} from "react-native";
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

const Chat = ({ db, route, navigation }) => {
  const { userID, name, color } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      title: name,
      headerStyle: { backgroundColor: color },
    }); //the navigation header's title is set to the name and color picked on previous screen

    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    // onSnapshot listens to changes in Firestore collection
    // q is the query the argument listens to
    // documentSnapshot is a callback function to see if there are any changes that match the query
    const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
      let newMessages = [];
      documentsSnapshot.forEach(doc => {
        const timestamp = doc.data().createdAt.toDate(); //convert the createdAt data to something Javascript can read
        newMessages.push({ id: doc.id, ...doc.data(), createdAt: timestamp }) //push new message onto the doc, replace createdAt with new timestamp
      });
      setMessages(newMessages);
    });

    // Clean up code
    // this stops further updates (unsubs from Firestore listener)
    return () => {
      if (unsubMessages) unsubMessages();
    }
  }, []);

  //show the speech bubble and color them based on side
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

  //add new messages to what was previously in messages
  const onSend = (newMessages) => {
    //add new messages as third argument for it to be the first to be the first item
    addDoc(collection(db, "messages"), newMessages[0])
  }

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
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
