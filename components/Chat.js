import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Test,
  View,
  Platform,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
const firebase = require("firebase");
require("firebase/firestore");

// COMPONENT
const Chat = (props) => {
  // STATE & PROPS
  const { name, activeColor } = props.route.params;
  const [messages, setMessages] = useState([]);
  const firebaseConfig = {
    apiKey: "AIzaSyD1kJ4i_DbJ4a1yNPf3zVA57M76ea6JXSs",
    authDomain: "chattix-8a492.firebaseapp.com",
    projectId: "chattix-8a492",
    storageBucket: "chattix-8a492.appspot.com",
    messagingSenderId: "420773651874",
    appId: "1:420773651874:web:3d1c5f6737b1eb21e2befb",
  };

  // FUNCTION METHODS
  const onSend = (messages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, messages));
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
        }}
      />
    );
  };

  // LIFECYCLE
  useEffect(() => {
    props.navigation.setOptions({ title: name }); // Set header with name
  }, [name]);

  useEffect(() => {
    setMessages([ // Create initial state with system message
      {
        _id: 2,
        text: `${name} has entered the chat`,
        createdAt: new Date(),
        system: true,
      },
    ]);

    if (!firebase.apps.length) { // Initialise Firebase
      firebase.initializeApp(firebaseConfig);
    }

    // FIREBASE METHODS
    const onCollectionUpdate = (snapshot) => { // Set state with message data from Firestore
      let messagesList = [];
      snapshot.forEach((doc) => {
        let data = doc.data();
        messagesList.push({
          _id: data._id,
          text: data.text,
          createdAt: data.createdAt.toDate(),
          user: {
            _id: data.user._id,
            name: data.user.name,
            avatar: data.user.avatar || "",
          },
        });
      });
      setMessages(messagesList);
    };
    const referenceChatMessages = firebase.firestore().collection("messages"); // Reference messages collection in Firestore
    const unsubscribe = referenceChatMessages.onSnapshot(onCollectionUpdate); // Create database listener & create unsubscribe function

    return () => {
      unsubscribe(); // Call the created unsubscribe function
    };
  }, [name]);

  // RENDER
  return (
    <View style={[styles.centeredContainer, { backgroundColor: activeColor }]}>
      <View style={styles.centeredContainer}>
        <GiftedChat
          renderBubble={renderBubble.bind(Chat)}
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{ _id: 1 }}
        />
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behvaiour="height" />
        ) : null}
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    flexDirection: "column",
  },
});
