import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";

// Component
const CustomActions = (props) => {
  const { wrapperStyle, iconTextStyle } = props;

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
            return;
          case 1:
            console.log("User wants to take a photo");
            return;
          case 2:
            console.log("User wants to get their location.");
            return;
          default:
        }
      }
    );
  };

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
