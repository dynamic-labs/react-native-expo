jest.mock("react-native-webview", () => {
  const { View } = require("react-native");
  const WebView = (props) => {
    return View(props);
  };
  WebView.propTypes = { ...View.propTypes };
  return WebView;
});

jest.mock("expo-linking", () => {
  const module: typeof import("expo-linking") = {
    ...jest.requireActual("expo-linking"),
    createURL: jest.fn(),
  };

  return module;
});
