import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
  const { name, color } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      title: name,
      headerStyle: { backgroundColor: color },
    }); //the navigation header's title is set to the name

    //set chat message example
    //array is displayed on screen in reverse order
    //ie: the first item in the array is the latest item on the chatbox
    setMessages([
      {
        //Each message _id needs to be different
        //the user _id determines who's message it is
        //_id: 1 is you, _id: 2 is the other user

        _id: 1,
        text: "How are you?",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "React Native",
          avatar: "https://www.cnet.com/a/img/resize/995d4d237a8244ec255b27a6a35476c6c6622fcd/hub/2019/09/25/8be7b304-eba7-4094-a9c9-243422e2ddc3/doge-meme.jpg?auto=webp&fit=crop&height=675&width=1200",
        },
      },
      {
        _id: 2,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://www.cnet.com/a/img/resize/995d4d237a8244ec255b27a6a35476c6c6622fcd/hub/2019/09/25/8be7b304-eba7-4094-a9c9-243422e2ddc3/doge-meme.jpg?auto=webp&fit=crop&height=675&width=1200",
        },
      },
      {
        //system message (swaps user object for system boolean)
        _id: 3,
        text: `You've entered the chat`,
        createdAt: new Date(),
        system: true,
      },
    ]);
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
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
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
