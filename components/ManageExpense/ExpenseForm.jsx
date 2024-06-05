import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Input from './input'
import Button from '../UI/Button';
import { getFormattedDate } from '../../utli/date';
import { useNavigation } from '@react-navigation/native';

const ExpenseForm = ({submitButtonLabel, onSubmit, onCancel, defaultValue }) => {
  
    const [inputValue, setInputValue] =useState({
        amount: defaultValue? defaultValue.amount.toString() : '',
        date: defaultValue? getFormattedDate(defaultValue.date): '',
        description: defaultValue? defaultValue.description: ''
    });

    const inputHandler = (inputIdentifier, enteredValue) =>{
       setInputValue((curInputValues)=>{
        return(
           { ...curInputValues,
            [inputIdentifier]: enteredValue}
       )
    })
    }

    const submitHandler = () =>{
      const expenseData = {
        amount: +inputValue.amount,
        date: new Date(inputValue.date),
        description: inputValue.description
      }

      const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
      const dateIsValid = getFormattedDate(expenseData.date) !== 'Invalid Date';
      const descriptionIsValid = expenseData.description.trim().length > 0;
  
      if(!amountIsValid || !dateIsValid || !descriptionIsValid){
          Alert.alert('Invalid Input', 'Please check your input values');
          return;
      }
      onSubmit(expenseData)
    }

  return (
    <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputRow}>
      <Input label="Amount" style={styles.rowInput} textInputConfig={{
        keyboardType: 'decimal-pad',
        onChangeText: inputHandler.bind(this, 'amount'),
        value: inputValue.amount,
      }}/>
      <Input label="Date" style={styles.rowInput} textInputConfig={{
        placeholder: 'YYYY-MM-DD',
        maxLenght: 10,
        onChangeText: inputHandler.bind(this, 'date'),
        value: inputValue.date,
      }}/>
      </View>
      <Input label="Description" textInputConfig={{
         multiline: true,
         onChangeText: inputHandler.bind(this, 'description'),
         value: inputValue.description,
      }}/>
      <View style={styles.buttons}>
        <Button onPress={onCancel} mode="flat" style={styles.button}>
            Cancel
            </Button>
        <Button onPress={submitHandler} style={styles.button} >
            {submitButtonLabel}
            </Button>
      </View>
    </View>
  )
}

export default ExpenseForm

const styles = StyleSheet.create({
    form:{
        marginTop: 40,
    },
    title:{
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
      marginVertical: 24,
      textAlign: 'center',
    },
    inputRow:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput:{
        flex: 1,
    },
    buttons:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      button:{
        minWidth: 120,
        marginHorizontal: 8,
      },
})