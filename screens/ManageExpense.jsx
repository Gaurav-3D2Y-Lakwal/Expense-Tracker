import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useLayoutEffect } from 'react'
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import Button from '../components/UI/Button';
import { ExpenseContext } from '../store/expense_context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';

const ManageExpense = ({route, navigation}) => {
  const expensesCtx = useContext(ExpenseContext);

  const editingExpenseId  = route.params?.expenseId;
  const isEditing = !!editingExpenseId;

  useLayoutEffect(()=>{
    navigation.setOptions({
      title: isEditing ? 'Editing Expense' : 'Add Expense'
    });
  },[navigation, isEditing]);

 const deleteExpenseHandler = () =>{
  expensesCtx.deleteExpense(editingExpenseId);
  navigation.goBack();
 }

 const cancelHandler = () =>{
  navigation.goBack();
 }

 const confirmHandler = () =>{
  if(isEditing){
    expensesCtx.updateExpense();
  }else{
    expensesCtx.addExpense();
  }
   navigation.goBack();
 }

  return (
    <View style={styles.container}>
      <ExpenseForm/>
      <View style={styles.buttons}>
        <Button onPress={cancelHandler} mode="flat" style={styles.button} >Cancel</Button>
        <Button onPress={confirmHandler} style={styles.button} >{isEditing? 'Update': 'Add' }</Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
        <IconButton
         icon="trash" 
         color={GlobalStyles.colors.error500}
         size={36}
         onPress={deleteExpenseHandler}/>
         </View>
        )}
    </View>
  )
}

export default ManageExpense

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
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
  deleteContainer:{
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
})