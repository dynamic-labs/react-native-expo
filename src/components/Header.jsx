import React from "react";
import { Appbar } from "react-native-paper";
import { Image, StyleSheet, View } from "react-native";

const Header = ({ navigation, previous }) => {
  return (
    <Appbar.Header
      theme={{ colors: { primary: "#037FFF" } }} // Set the background color here
      style={styles.header}
    >
      {previous ? (
        <Appbar.BackAction onPress={navigation.goBack} />
      ) : (
        <Appbar.Action icon="menu" onPress={navigation.openDrawer} />
      )}
      <View style={styles.logoContainer}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
      </View>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    height: 60,
    justifyContent: "center",
  },
  logo: {
    width: 100, // Adjust as necessary
    height: 40, // Adjust as necessary
    resizeMode: "contain",
  },
  logoContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default Header;
