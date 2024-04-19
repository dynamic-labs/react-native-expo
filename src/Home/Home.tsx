import { useReactiveClient } from '@dynamic-labs/react-hooks'
import { OtpDestination, PhoneData } from '@dynamic-labs/types'
import { FC, useMemo, useState } from 'react'
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import { InputField } from '../InputField'
import { client } from '../client'

export const Home: FC = () => {
  const { auth } = useReactiveClient(client)

  const [otpDestination, setOtpDestination] = useState<
    OtpDestination | undefined
  >(undefined)

  const [error, setError] = useState<string | undefined>(undefined)

  const sendOtp = async <T extends OtpDestination>(
    destination: T,
    target: 'email' extends T ? string : PhoneData
  ): Promise<void> => {
    try {
      if (destination === 'email') await auth.email.sendOTP(target as string)
      if (destination === 'sms') await auth.sms.sendOTP(target as PhoneData)
    } catch (error: any) {
      setError(JSON.stringify(error, null, 2))

      return
    }

    setError(undefined)
    setOtpDestination(destination)
  }

  const verifyOtp = (
    destination: OtpDestination,
    token: string
  ): Promise<void> => {
    switch (destination) {
      case 'email':
        return auth.email.verifyOTP(token)

      case 'sms':
        return auth.sms.verifyOTP(token)
    }
  }

  const logout = () => {
    setOtpDestination(undefined)

    return auth.logout()
  }

  const content = useMemo<JSX.Element>(() => {
    if (auth.token && auth.authenticatedUser)
      return (
        <>
          <View style={styles.section}>
            <Text style={styles.section__heading}>JWT:</Text>
            <Text>{auth.token}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.section__heading}>User:</Text>
            <Text>{JSON.stringify(auth.authenticatedUser, null, 2)}</Text>
          </View>

          <Button title="Logout" onPress={logout} />
        </>
      )

    if (otpDestination)
      return (
        <>
          <InputField
            key="otp"
            placeholder="OTP token"
            onSubmit={(token) => verifyOtp(otpDestination, token)}
          />

          <Button title="Cancel" onPress={() => setOtpDestination(undefined)} />
        </>
      )

    return (
      <>
        <InputField
          key="email"
          placeholder="Email login"
          onSubmit={(email) => sendOtp('email', email)}
        />

        <InputField
          key="sms"
          placeholder="US/CA SMS login"
          onSubmit={(phone) =>
            sendOtp('sms', { dialCode: '1', iso2: 'us', phone })
          }
        />
      </>
    )
  }, [auth.token, auth.authenticatedUser, otpDestination])

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.heading__text}>Dynamic Demo</Text>
        </View>

        <Text style={styles.error}>{error}</Text>

        {content}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'stretch',
    gap: 40,
    padding: 20,
  },

  scroll: {
    alignContent: 'stretch',
  },

  heading: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -50,
  },

  heading__text: {
    fontSize: 20,
  },

  error: {
    color: 'red',
  },

  section: {
    gap: 5,
  },

  section__heading: {
    fontSize: 14,
    fontWeight: 'bold',
  },
})
