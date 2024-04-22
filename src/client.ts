import { createClient } from '@dynamic-labs/client'
import { ReactNativeExtension } from '@dynamic-labs/react-native-extension'
import { OtpExtension } from '@dynamic-labs/otp-extension'

const environmentId =
  process.env.EXPO_PUBLIC_ENVIRONMENT_ID ||
  '36107460-1867-45d5-901b-6a3581025990'

const apiBaseUrl =
  process.env.EXPO_PUBLIC_API_BASE_URL ||
  'https://app.dynamic-preprod.xyz/api/v0'

export const client = createClient({
  environmentId,
  apiBaseUrl,
  appLogoUrl: 'https://demo.dynamic.xyz/favicon-32x32.png',
  appName: 'Dynamic Demo',
})
  .extend(ReactNativeExtension())
  .extend(OtpExtension(['email', 'sms']))
