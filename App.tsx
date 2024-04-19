import { StatusBar } from 'expo-status-bar'
import { FC } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { Home } from './src/Home'
import { client } from './src/client'

const App: FC = () => (
  <>
    <client.reactNative.WebView />
    <StatusBar style="auto" />

    <SafeAreaView style={styles.main}>
      <Home />
    </SafeAreaView>
  </>
)

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
})

export default App
