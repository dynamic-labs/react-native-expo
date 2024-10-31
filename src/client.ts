import "fast-text-encoding";
import { createClient } from "@dynamic-labs/client";
import { ReactNativeExtension } from "@dynamic-labs/react-native-extension";
import { ViemExtension } from "@dynamic-labs/viem-extension";

const environmentId =
  (process.env.EXPO_PUBLIC_ENVIRONMENT_ID as string) ||
  "6a1e9351-8209-4f7a-b4a4-f17895ace559";

if (!environmentId) {
  throw new Error("EXPO_PUBLIC_ENVIRONMENT_ID is required");
}

// Leave this undefined to use the default dynamic api base url
const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;

export const client = createClient({
  environmentId,
  apiBaseUrl,
  appLogoUrl: "https://demo.dynamic.xyz/favicon-32x32.png",
  appName: "Dynamic Demo",
})
  .extend(ReactNativeExtension({appOrigin: "https://demo.dynamic.xyz"}))
  .extend(ViemExtension());


  //use ngrok to expose the localhost to the internet for well known endpoints
  //https://docs.dynamic.xyz/sdks/react-native/setup-passkey 
  //updatte CORS