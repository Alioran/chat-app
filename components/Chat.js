import { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {

    const { name, color } = route.params;

    useEffect(() => {
        navigation.setOptions({ title: name, headerStyle: { backgroundColor: color } }); //the navigation header's title is set to the name
      }, []);
  
    return (
        <View style={[styles.container, { backgroundColor: color }]}>
        <Text style={{ color: "#425c4f" }}>Hi {name}! Start chatting!</Text>
      </View>
    );
  }

const styles = StyleSheet.create({
 container: {
    padding: 6,
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
 },

});

export default Chat;