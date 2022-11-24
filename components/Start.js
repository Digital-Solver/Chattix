// Dependencies
import { Button, ScrollView, Pressable, StyleSheet, Text, Image, View, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'

// Set color variables
const black = "#090C08"
const purple = "#474056"
const grey = "#8A95A5"
const green = "#B9C6AE"

// Start - Component
const Start = (props) => {

  const [ name, setName ] = useState('')
  const [ activeColor, setActiveColor ] = useState(black)

  return (
    <View className="screen" style={styles.screen}>
      <ImageBackground 
        source={require('../assets/background-image.png')}
        resizeMode="cover"
        style={styles.backgroundImage}>

        <Text style={styles.appTitle}>App Title</Text>

        <View className="controls-ui" style={styles.controlsUI}>

          <View className="inputContainer" style={styles.inputContainer}>
            <Image
              source={require('../assets/icon.svg')}
            />
            <TextInput // Updates the 'name' state
              style={styles.textInput}
              placeholder='Your Name'
              value={name}
              onChangeText={(name) => setName(name)}
            />
          </View>

          <View className="colorPicker">
            <Text className="colorPickerLabel" style={styles.colorPickerLabel}>Choose Background Color:</Text>
            <View className="colorPickerControlContainer" style={styles.colorPickerControlContainer}>
              
              <Pressable 
                className="colorPickerControl" 
                style={[styles.colorPickerControl, styles.black, activeColor === black ? styles.colorPickerActiveLight : null]}
                onPress={() => setActiveColor(black)}>
              </Pressable>

              <Pressable 
                className="colorPickerControl" 
                style={[styles.colorPickerControl, styles.purple, activeColor === purple ? styles.colorPickerActiveLight : null]}
                onPress={() => setActiveColor(purple)}>
              </Pressable>

              <Pressable 
                className="colorPickerControl" 
                style={[styles.colorPickerControl, styles.grey, activeColor === grey ? styles.colorPickerActiveDark : null]}
                onPress={() => setActiveColor(grey)}>
              </Pressable>

              <Pressable 
                className="colorPickerControl" 
                style={[styles.colorPickerControl, styles.green, activeColor === green ? styles.colorPickerActiveDark : null]}
                onPress={() => setActiveColor(green)}>
              </Pressable>
            </View>
          </View>

          <Pressable // Takes user to 'Chat' component
            style={styles.startChattingButtonBackground}
            onPress={() => props.navigation.navigate('Chat', { name: name, activeColor: activeColor })} 
          >
            <Text style={styles.startChattingButtonText}>
              Start Chatting
            </Text>

          </Pressable>

        </View>
      </ImageBackground>
    </View>
  )
}

// Component Export
export default Start

// Styling
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  backgroundImage: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  appTitle: {
    fontSize: 45,
    fontWeight: "600",
    color: "white",
  },

  controlsUI: {
    display: "flex",
    flexDirection: 'column',
    backgroundColor: "white",
    width: "88%",
    alignSelf: "center",
    padding: 15,
    height: "44%",
    justifyContent: "space-evenly",
    borderRadius: 2,
  },

  inputContainer: {
    display: "flex",
    flexDirection: 'row',
    alignSelf: "center",
    width: "88%",
    borderColor: "#757083",
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
  },

  textInput: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    // opacity: "50%",
  },

  colorPickerLabel: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    // opacity: "100%",
    height: 35,
  },

  colorPickerControlContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    marginBottom: 50,
  },

  colorPickerControl: {
    width: 40,
    height: 40,
    borderRadius: 40/2,
  },

  colorPickerActiveLight: {
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "steelblue",
  },

  colorPickerActiveDark: {
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "black",
  },

  black: {
    backgroundColor: black,
  },
  
  purple: {
    backgroundColor: purple,
  },

  grey: {
    backgroundColor: grey,
  },

  green: {
    backgroundColor: green,    
  },

  startChattingButtonBackground: {
    backgroundColor: "#757083",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
    height: 50,

  },

  startChattingButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  }

})
