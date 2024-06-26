import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from './Button'

const ErrorOverlay = ({message, onConfirm}) => {
  return (
    <View>
      <Text style={[styles.text, styles.title]}>An error occurred!</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  )
}

export default ErrorOverlay

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
    },
    text:{
        color: 'white',
      textAlign: 'center',
      marginBottom: 8,
    },
    title:{
    fontSize: 20,
    fontWeight: 'bold',
    },
    message:{
     fontSize: 14,
    },
})