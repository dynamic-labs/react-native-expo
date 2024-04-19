import { createClient } from '@dynamic-labs/client'
import { ReactNativeExtension } from '@dynamic-labs/react-native-extension'
import { OtpExtension } from '@dynamic-labs/otp-extension'

const environmentId =
  process.env.EXPO_PUBLIC_ENVIRONMENT_ID ||
  '67ddb74b-e30f-4039-9a25-f033c79f1207'

const apiBaseUrl =
  process.env.EXPO_PUBLIC_API_BASE_URL ||
  'https://app.dynamic-preprod.xyz/api/v0'

const webviewUrl =
  process.env.EXPO_PUBLIC_WEBVIEW_URL || 'http://localhost:4200/'

export const client = createClient({
  environmentId,
  apiBaseUrl,
  appLogoUrl: 'https://demo.dynamic.xyz/favicon-32x32.png',
  appName: 'Dynamic Demo',
})
  .extend(
    ReactNativeExtension({
      webviewUrl,
      webviewDebuggingEnabled: true,
    })
  )
  .extend(OtpExtension(['email', 'sms']))
