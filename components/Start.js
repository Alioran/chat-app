import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";

const Start = ({ navigation }) => {
  //make a state for the user's name input
  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  const image = require("../assets/Background-Image.png");

  const onPress = (backgroundColor) => setColor(backgroundColor);

  return (
    <View style={styles.container}>

      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.title}>App Title</Text>

        {/* Settings Container - need to set this at 88% */}
        <View style={styles.settingsContainer}>
          {/* Text Input Container - need to have border wrap around the icon and the textbox */}
          <View style={styles.textContainer}>
            <Image
              source={require("../assets/person-icon.png")}
              style={styles.icon}
            />
            <TextInput
              style={[styles.textInput, styles.defaultText]}
              value={name} //get the value from the textbox and set it as the name
              onChangeText={setName} //if the text changes, change the useState
              placeholder="Your Name"
              placeholderStyle={{ opacity: 0.5 }}
            />
          </View>

          {/* Specific container for the colors */}
          <View style={{ height: 85, marginTop: 5, }}>
            {/* Need an outer box to have everything contained for justifyContent */}
            <Text style={styles.defaultText}>Choose a Background Color:</Text>
            <View style={styles.colorContainer}>

              <View style={[styles.border, color === "#090C08" ? { borderColor: "#757083" } : null,]}>
                <TouchableOpacity
                  style={[
                    styles.colorSelect,
                    { backgroundColor: "#090C08" },
                  ]}
                  onPress={() => onPress("#090C08")}
                ></TouchableOpacity>
              </View>

              <View style={[styles.border, color === "#474056" ? { borderColor: "#757083" } : null,]}>
                <TouchableOpacity
                  style={[
                    styles.colorSelect,
                    { backgroundColor: "#474056" },
                  ]}
                  onPress={() => onPress("#474056")}
                ></TouchableOpacity>
              </View>

              <View style={[styles.border, color === "#8A95A5" ? { borderColor: "#757083" } : null,]}>
                <TouchableOpacity
                  style={[
                    styles.colorSelect,
                    { backgroundColor: "#8A95A5" },
                  ]}
                  onPress={() => onPress("#8A95A5")}
                ></TouchableOpacity>
              </View>

              <View style={[styles.border, color === "#B9C6AE" ? { borderColor: "#757083" } : null,]}>
                <TouchableOpacity
                  style={[
                    styles.colorSelect,
                    { backgroundColor: "#B9C6AE" },
                  ]}
                  onPress={() => onPress("#B9C6AE")}
                ></TouchableOpacity>
              </View>
            </View>
          </View>

          <Pressable
            style={styles.button}
            onPress={() =>
              navigation.navigate("Chat", { name: name, color: color })
            }
          >
            <Text
              style={[
                styles.defaultText,
                { fontWeight: "600", color: "#FFFFFF", alignSelf: "center" },
              ]}
            >
              Start Chatting
            </Text>
          </Pressable>
        </View>
      </ImageBackground>

      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" /> //prevents keyboard from hiding parts of the page 
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  title: {
    marginTop: 100,
    flex: 1,
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    alignSelf: "center",
  },
  settingsContainer: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "white",
    width: "88%",
    alignSelf: "center",
    height: "44%",
    minHeight: 170,
    marginBottom: 20,
  },
  colorContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "75%",
    marginTop: 10,
    height: 100,
  },
  border: {
    justifyContent: 'center',
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "white",
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  icon: {
    width: 25,
    height: 25,
    alignSelf: "center",
    marginLeft: 10,
  },
  defaultText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
  },
  textContainer: {
    width: "100%",
    flexDirection: "row",
    borderWidth: 1.5,
    borderColor: "#757083",
    borderRadius: 3,
  },
  textInput: {
    padding: 15,
    width: "90%",
  },
  button: {
    backgroundColor: "#757083",
    paddingTop: 15,
    paddingBottom: 15,
  },
});

export default Start;
