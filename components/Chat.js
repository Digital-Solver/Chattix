// Dependencies
import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

// Chat - component
const Chat = (props) => {
  const {name, activeColor} = props.route.params

  const black = "#090C08"
  const purple = "#474056"
  const grey = "#B9C6AE"
  const green = "#B9C6AE"

  // Sets the navigation header's title to the name prop
  useEffect(() => {props.navigation.setOptions({title: name})}, [name]);

  return (
    <View style={[styles.centeredContainer, {backgroundColor: activeColor}]}>
      <Text style={{color: "white"}}>Your Name is: <Text style={{fontWeight: "bold", color: "white"}}>{name}</Text></Text>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
})
