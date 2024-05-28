import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Input from './input'

const ExpenseForm = () => {
  return (
    <View>
      <Input label="Amount" textInputConfig={{
        keyboardType: 'decimal-pad',
        onChangeText: amountChangedHandler
      }}/>
      <Input label="Date" textInputConfig={{
        placeholder: 'YYYY-MM-DD',
        maxLenght: 10,
        onChangeText: () => {}
      }}/>
      <Input label="Description" textInputConfig={{
        multiline: true,
                 
      }}/>
    </View>
  )
}

export default ExpenseForm

const styles = StyleSheet.create({})