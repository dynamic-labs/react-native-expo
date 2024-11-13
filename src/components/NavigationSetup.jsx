import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Header from "./Header";
import UserWallets from "../screens/Wallets";
import WalletDetails from "../screens/WalletDetails";
import Logout from "../screens/Logout";
import { client } from "../client";
import { useReactiveClient } from "@dynamic-labs/react-hooks";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const WalletStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="UserWallets"
      component={UserWallets}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="WalletDetails" component={WalletDetails} />
  </Stack.Navigator>
);

const MyDrawer = () => {
  const { auth } = useReactiveClient(client);

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Wallets" component={WalletStack} />

      {auth && auth.token && (
        <>
          <Drawer.Screen name="Profile" component={Home} />
          <Drawer.Screen name="Logout" component={Logout} />
        </>
      )}
    </Drawer.Navigator>
  );
};

export default MyDrawer;
