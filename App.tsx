import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import MyDrawer from './src/components/NavigationSetup';
import { client } from "./src/client";


const App = () => (
  <>
  <client.reactNative.WebView />
  <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  </GestureHandlerRootView>
  </>
);

export default App;
