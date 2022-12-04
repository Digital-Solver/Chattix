import React, { useEffect, useState } from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView } from "react-native";
import CustomActions from "./CustomActions";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import MapView from "react-native-maps";

const firebase = require("firebase");
require("firebase/firestore");

// COMPONENT
const Chat = (props) => {
  // STATE, PROPS, CONTEXT
  const { name, activeColor } = props.route.params;
  const [messages, setMessages] = useState([]);
  const [uid, setUid] = useState([]);
  const [loggedInText, setLoggedInText] = useState("Logging in...");
  const [isUserConnected, setIsUserConnected] = useState(false);
  const firebaseConfig = {
    apiKey: "AIzaSyD1kJ4i_DbJ4a1yNPf3zVA57M76ea6JXSs",
    authDomain: "chattix-8a492.firebaseapp.com",
    projectId: "chattix-8a492",
    storageBucket: "chattix-8a492.appspot.com",
    messagingSenderId: "420773651874",
    appId: "1:420773651874:web:3d1c5f6737b1eb21e2befb",
  };

  // Initialise Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const referenceChatMessages = firebase.firestore().collection("messages");

  // FUNCTION METHODS

  // Firestore methods
  const addMessages = (message) => {
    referenceChatMessages.add({
      _id: message._id,
      createdAt: message.createdAt,
      text: message.text,
      user: { _id: message.user._id },
      image: message.image || null,
      location: message.location || null,
    });
  };
  const onCollectionUpdate = (snapshot) => {
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
        image: data.image || null,
        location: data.location || null,
      });
    });
    setMessages(messagesList);
  };

  // GiftedChat functionality
  const onSend = (messages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, messages));
    addMessages(messages[0]);
    saveMessages();
  };

  // GiftedChat components customisation
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
  const renderInputToolbar = (props) => {
    if (!isUserConnected) {
    } else {
      return <InputToolbar {...props} />;
    }
  };
  const renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };
  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3,
          }}
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
  };

  // Async Storage Methods
  const getMessages = async () => {
    let messages = "";
    try {
      messages = (await AsyncStorage.getItem("messages")) || [];
      setMessages(JSON.parse(messages));
    } catch (err) {
      console.log(err.message);
    }
  };
  const saveMessages = async () => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messages));
    } catch (err) {
      console.log(err.message);
    }
  };
  const deleteMessages = async () => {
    // For Dev Use Only
    try {
      await AsyncStorage.removeItem("messages");
      setMessages([]);
    } catch (err) {
      console.log(err.message);
    }
  };

  // LIFECYCLE
  // Set header with custom name
  useEffect(() => {
    props.navigation.setOptions({ title: name });
  }, [name]);

  // Check if Online
  useEffect(() => {
    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        setIsUserConnected(true);
      } else {
        setIsUserConnected(false);
      }
    });
  });

  // Async Storage
  useEffect(() => {
    getMessages();
  }, []);

  // Firebase Authentication
  useEffect(() => {
    if (isUserConnected) {
      const authUnsubscribe = firebase
        .auth()
        .onAuthStateChanged(async (user) => {
          if (!user) {
            await firebase.auth().signInAnonymously();
          }

          setUid(uid);
          setLoggedInText("Hello there");

          const authMessage = {
            _id: "authMessage",
            createdAt: new Date(),
            text: `${loggedInText}. You are now logged in to Firestore.`,
            system: true,
            user: {
              _id: "Firestore Authentication Service",
            },
          };

          setMessages((prevMessages) =>
            GiftedChat.append(prevMessages, authMessage)
          );
        });

      return () => {
        authUnsubscribe();
      };
    }
  }, []);

  // Firestore retrieve messages
  useEffect(() => {
    // Create initial state with system message
    const entryMessage = {
      _id: 2,
      text: `${name || "You"} entered the chat`,
      createdAt: new Date(),
      system: true,
    };

    setMessages([entryMessage]);

    // Initialise Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    // Reference messages collection in Firestore
    const referenceChatMessages = firebase.firestore().collection("messages");

    // Create database listener & create unsubscribe function
    const unsubscribe = referenceChatMessages
      .orderBy("createdAt", "desc")
      .onSnapshot(onCollectionUpdate);

    return () => {
      // Unsubscribe from Firestore updates
      unsubscribe();
    };
  }, []);

  // RENDER
  return (
    <ActionSheetProvider>
      <View
        style={[styles.centeredContainer, { backgroundColor: activeColor }]}
      >
        <View style={styles.centeredContainer}>
          <GiftedChat
            renderBubble={renderBubble.bind(Chat)}
            renderInputToolbar={renderInputToolbar}
            renderActions={renderCustomActions.bind(Chat)}
            renderCustomView={renderCustomView}
            messages={messages}
            onSend={(messages) => onSend(messages)}
            user={{ _id: 1, avatar: "https://placeimg.com/140/140/any" }}
          />
          {Platform.OS === "android" ? (
            <KeyboardAvoidingView behvaiour="height" />
          ) : null}
        </View>
      </View>
    </ActionSheetProvider>
  );
};

export default Chat;

// Styles
const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    flexDirection: "column",
  },
});
