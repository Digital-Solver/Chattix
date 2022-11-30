// Dependencies
import { StyleSheet, Text, View, Platform, KeyboardAvoidingView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

// Chat - component
const Chat = (props) => {
  const {name, activeColor} = props.route.params

  const [messages, setMessages] =  useState([
    {
      _id: 1,
      text: `Hello ${name}`,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "React Native",
        avatar: "https://placeimg.com/140/140/any"
      },
    },
    {
      _id: 2,
      text: `${name} has entered the chat.`,
      createdAt: new Date(),
      system: true,
    }
  ])

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
