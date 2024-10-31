import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/Home";
import Header from "./Header";
import { client } from "../client";
import { useReactiveClient } from "@dynamic-labs/react-hooks";
import { Button } from "react-native";
import Logout from "../screens/Logout";

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  const { auth } = useReactiveClient(client);

  const handleLogout = async () => {
    try {
      await auth.logout();
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      
      {/* Conditionally render "Profile" and "Logout" options if the user is authenticated */}
      {auth && auth.token && (
        <>
          <Drawer.Screen name="Profile" component={Home} />
          <Drawer.Screen
            name="Logout"
            component={Logout} // Use a placeholder component here
          />
        </>
      )}
    </Drawer.Navigator>
  );
};

export default MyDrawer;
