// Dependencies
import { StyleSheet, Text, View, Platform, KeyboardAvoidingView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

// FIREBASE SETUP
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyD1kJ4i_DbJ4a1yNPf3zVA57M76ea6JXSs",
  authDomain: "chattix-8a492.firebaseapp.com",
  projectId: "chattix-8a492",
  storageBucket: "chattix-8a492.appspot.com",
  messagingSenderId: "420773651874",
  appId: "1:420773651874:web:3d1c5f6737b1eb21e2befb"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)


// Chat - component
  const Chat = (props) => {
  const {name, activeColor} = props.route.params

  const referenceChatMessages = collection(db, 'messages');

  const [messages, setMessages] =  useState([referenceChatMessages])

  // Sets the navigation header's title to the name prop
  useEffect(() => {props.navigation.setOptions({title: name})}, [name]);

  // Functions
  const onSend = (messages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, messages))
  };

  const renderBubble = (props) => {
    return (
      <Bubble 
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          },
        }}
      />
    );
  }

  return (
    <View style={[styles.centeredContainer, {backgroundColor: activeColor}]}>
      <View style={styles.centeredContainer}>
        <GiftedChat 
        renderBubble={renderBubble.bind(Chat)}
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{_id: 1}}
        />
        {Platform.OS === 'android' ? <KeyboardAvoidingView behvaiour="height" /> : null }
      </View>
    </View>
  )
}

// Component Export
export default Chat

// Styling
const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    flexDirection: 'column',
  },
})
