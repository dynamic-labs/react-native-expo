# Dynamic React Native + Expo Example App

Welcome to the Dynamic React Native + Expo Example App! This repository contains a simple application demonstrating how to integrate the Dynamic product with React Native using Expo.

## Requirements

To run this example app locally, you'll need to have Node.js installed, as well as npm (Node Package Manager). Additionally, you must install Expo CLI. For detailed setup instructions, please visit the [Expo installation guide](https://docs.expo.dev/get-started/installation/).

You will also need a Dynamic account. If you don't have one yet, you can sign up for free at [Dynamic](https://dynamic.xyz/).
With an account created, you can create a new project and obtain the environment ID, which you will need to initialize the Dynamic client in the example app.
You will also need to enable the SMS and/or Email Login options to have a login method available in the example app.

## Installation

Follow these steps to get the app up and running:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/dynamic-labs/react-native-expo.git
   cd react-native-expo
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up your Dynamic environment ID:**

   ```bash
   EXPO_PUBLIC_ENVIRONMENT_ID=<dynamic project environment id>
   ```

4. **Start the application:**

   ```bash
   npm start
   ```

   This will start the Expo CLI server, and you can open the app on your device using the Expo Go app, or in a web browser.

For further development, you may find the following files relevant:

- dynamic client initialization: `src/client.ts`
- HomeView: `src/Home/Home.tsx`
- LoginView: `src/LoginView/LoginView.tsx`
- DisplayAuthenticatedUserView: `src/DisplayAuthenticatedUserView/DisplayAuthenticatedUserView.tsx`

## Documentation

For more detailed information on integrating Dynamic with React Native, please refer to our official documentation: [Dynamic React Native Integration](#) (link to be updated).

## Disclaimer

Please note that our React Native package is currently in early alpha. It is subject to changes and might have limited functionalities. Feel free to provide feedback to help us improve future releases.

Thank you for trying out our example app!
