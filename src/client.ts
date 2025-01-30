import "fast-text-encoding";
import { createClient, ClientProps } from "@dynamic-labs/client"; // ClientProps is imported here
import { ReactNativeExtension } from "@dynamic-labs/react-native-extension";
import { ViemExtension } from "@dynamic-labs/viem-extension";
import { ZeroDevExtension } from "@dynamic-labs/zerodev-extension";

// Define your environment ID
const environmentId =
  (process.env.EXPO_PUBLIC_ENVIRONMENT_ID as string) ||
  "6a1e9351-8209-4f7a-b4a4-f17895ace559";

if (!environmentId) {
  throw new Error("EXPO_PUBLIC_ENVIRONMENT_ID is required");
}

// Define your CSS overrides as a string
const cssOverrides: ClientProps["cssOverrides"] = `
  .body {
    .dynamic-shadow-dom {
      --dynamic-font-family-primary: "Poppins", sans-serif;
      --dynamic-font-family-numbers: "Roboto Mono", monospace, sans-serif;

      /* Background and Base Colors */
      --dynamic-base-1: #0a0a0b; /* Dark background */
      --dynamic-base-2: #1a1a1b; /* Slightly lighter for contrast */
      --dynamic-base-3: #1e1f22; /* Modal background */
      --dynamic-base-4: #232527; /* Footer or secondary backgrounds */
      --dynamic-base-5: #2c2f33; /* Card backgrounds */

      /* Branding Colors */
      --dynamic-brand-hover-color: linear-gradient(90deg, #805ad5, #5a67d8); /* Purple/blue gradient */
      --dynamic-brand-primary-color: #5a67d8; /* Kraken primary blue */
      --dynamic-brand-secondary-color: rgba(90, 103, 216, 0.15); /* Light blue for accents */

      /* Connection Status */
      --dynamic-connection-green: #41cc99;

      /* Borders, Shadows, and Radius */
      --dynamic-border-radius: 8px;
      --dynamic-hover: rgba(255, 255, 255, 0.05); /* Subtle hover effect */
      --dynamic-shadow-down-1: 0px 2px 0px rgba(0, 0, 0, 0.2);
      --dynamic-shadow-down-2: 0px 4px 0px rgba(0, 0, 0, 0.3);
      --dynamic-shadow-down-3: 0px 6px 0px rgba(0, 0, 0, 0.4);
      --dynamic-shadow-up-1: 0px -8px 48px -8px rgba(255, 255, 255, 0.16);

      /* Text Colors */
      --dynamic-text-primary: #ffffff; /* Main text */
      --dynamic-text-secondary: rgba(255, 255, 255, 0.8); /* Less prominent text */
      --dynamic-text-tertiary: rgba(255, 255, 255, 0.6); /* Subtle text */
      --dynamic-text-link: #5a67d8; /* Kraken link blue */

      /* Error States */
      --dynamic-error-1: #ff4646; /* Error red */
      --dynamic-error-2: rgba(255, 70, 70, 0.1);

      /* Footer */
      --dynamic-footer-background-color: #1a1a1b;
      --dynamic-footer-text-color: #ffffff;
      --dynamic-footer-icon-color: #5a67d8;
      --dynamic-footer-border: 1px solid rgba(255, 255, 255, 0.1);
      --dynamic-footer-padding: 1.25rem 1.25rem 1.25rem 1.5rem;

      /* Search Bar */
      --dynamic-search-bar-background: #232527;
      --dynamic-search-bar-background-hover: #2c2f33;
      --dynamic-search-bar-border: 1px solid rgba(255, 255, 255, 0.1);
      --dynamic-search-bar-border-hover: 1px solid rgba(255, 255, 255, 0.2);
      --dynamic-search-bar-border-focus: 1px solid #5a67d8;

      /* Wallet List Tiles */
      --dynamic-wallet-list-tile-background: #232527;
      --dynamic-wallet-list-tile-border: 1px solid rgba(255, 255, 255, 0.1);
      --dynamic-wallet-list-tile-shadow: 0px 2px 0px rgba(0, 0, 0, 0.2);
      --dynamic-wallet-list-tile-background-hover: #2c2f33;
      --dynamic-wallet-list-tile-border-hover: 

  }
  }
`;

const clientProps: ClientProps = {
  environmentId,
  apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL, // Optional base URL
  appLogoUrl: "https://demo.dynamic.xyz/favicon-32x32.png",
  appName: "Dynamic Demo",
  cssOverrides, // Pass the CSS overrides here
};

// Create the client
export const client = createClient(clientProps)
  .extend(
    ReactNativeExtension({
      appOrigin: "https://infinite-collie-teaching.ngrok-free.app",
    }),
  )
  .extend(ViemExtension())
  .extend(ZeroDevExtension());
