import { StatusBar } from "expo-status-bar";
import { FC } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Home } from "./src/Home";
import { client } from "./src/client";
import { Buffer } from "buffer";
import "react-native-get-random-values";

global.TextEncoder = require("text-encoding").TextEncoder;
global.Buffer = Buffer;

const App: FC = () => (
  <>
    <client.reactNative.WebView />
    <StatusBar style="auto" />

    <SafeAreaView style={styles.main}>
      <ScrollView>
        <Home />
      </ScrollView>
    </SafeAreaView>
  </>
);

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});

export default App;
