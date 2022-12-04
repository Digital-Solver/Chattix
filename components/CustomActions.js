import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

const firebase = require("firebase");
require("firebase/firestore");

// ***Component***
const CustomActions = (props) => {
  // ***State, Props, and Context***
  const { wrapperStyle, iconTextStyle, onSend } = props;

  // ***Methods***
  // Firestore methods
  const uploadImage = async (uri) => {
    // Create a connection to the devices local storage
    const blob = await new Promise((resolve, reject) => {
      // XHR Objects used to interact with servers to retrieve data selectively
      // XMLHttpRequest can be used to retrieve any type of data, not just XML
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        // On load, resolve the promise
        resolve(xhr.response);
      };
      xhr.onerror = (error) => {
        // On Error, reject the promise
        console.log(error);
        reject(new TypeError("Network request failed."));
      };
      xhr.responseType = "blob"; // Will change the response given to type "blob"
      xhr.open("GET", uri, true); // Initialises the request, params: (method, url, async)
      xhr.send(); // Sends the request
    });

    const imageNameBefore = uri.split("/");
    const imageName = imageNameBefore[imageNameBefore.length - 1];

    const ref = firebase.storage().ref().child(`images/${imageName}`); // Creates a reference/pointer to the particular document we want to manipulate
    const snapshot = await ref.put(blob); // Send local data to that firebase reference using a PUT request
    blob.close(); // close the connection
    return await snapshot.ref.getDownloadURL(); // Return the download url
  };

  // Custom Actions
  const chooseImage = async () => {
    const status = await ImagePicker.requestMediaLibraryPermissionsAsync();

    try {
      if (status.granted) {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: "Images",
        }).catch((error) => console.log(error));

        if (!result.canceled) {
          const imageURI = result.uri;
          const imageURL = await uploadImage(imageURI);
          onSend({
            createdAt: new Date(),
            user: props.uid,
            image: imageURL,
          });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const takePhoto = async () => {
    const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
    const libStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus.granted && libStatus.granted) {
      const result = await ImagePicker.launchCameraAsync().catch((error) =>
        console.log(error)
      );

      if (!result.canceled) {
        const imageURI = result.uri;
        const imageURL = await uploadImage(imageURI);
        onSend({
          createdAt: new Date(),
          user: props.uid,
          image: imageURL,
        });
      }
    }
  };
  const getLocation = async () => {
    const geoStatus = await Location.requestForegroundPermissionsAsync();

    if (geoStatus.granted) {
      let result = await Location.getCurrentPositionAsync({});

      if (!result.canceled) {
        props.onSend({
          createdAt: new Date(),
          user: props.uid,
          location: {
            latitude: result.coords.latitude,
            longitude: result.coords.longitude,
          },
        });
      }
    }
  };

  // Action Sheet Creation
  const { showActionSheetWithOptions } = useActionSheet();
  const onActionPress = () => {
    const options = [
      "Choose From Library",
      "Take Picture",
      "Send Location",
      "Cancel",
    ];

    const cancelButtonIndex = options.length - 1;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            console.log("User wants to pick an image.");
            return chooseImage();
          case 1:
            console.log("User wants to take a photo");
            return takePhoto();
          case 2:
            console.log("User wants to get their location.");
            return getLocation();
          default:
        }
      }
    );
  };

  // ***Render***
  return (
    <TouchableOpacity style={[styles.container]} onPress={onActionPress}>
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text stye={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

CustomActions.contextTypes = {
  actionSheet: PropTypes.func,
};

export default CustomActions;

// ***Styling***
const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: "#b2b2b2",
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: "#b2b2b2",
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: "transparent",
    textAlign: "center",
  },
});
