import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useLayoutEffect, useState } from 'react'
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';

import { ExpenseContext } from '../store/expense_context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { storeExpense, updateExpense } from '../utli/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

const ManageExpense = ({route, navigation}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState();

  const expensesCtx = useContext(ExpenseContext);

  const editingExpenseId  = route.params?.expenseId;
  const isEditing = !!editingExpenseId;

  const selectedExpense = expensesCtx.expenses.find(expense => expense.id === editingExpenseId)
  

  useLayoutEffect(()=>{
    navigation.setOptions({
      title: isEditing ? 'Editing Expense' : 'Add Expense'
    });
  },[navigation, isEditing]);

 const deleteExpenseHandler = async () =>{
  setIsSubmitted(true);
  try{
    await deleteExpense(editingExpenseId);
    expensesCtx.deleteExpense(editingExpenseId);
    navigation.goBack();

  }catch(error){
    setError('Could not delete expense - please try again later!');
    setIsSubmitted(false);
  }

 }

 const cancelHandler = () =>{
  navigation.goBack();
 }

 const confirmHandler = async (expenseData) =>{
  setIsSubmitted(true);
  try{

    if(isEditing){
      updateExpense(editingExpenseId, expenseData);
      await updateExpense(editingExpenseId, expenseData);
    }else{
       const id = await storeExpense(expenseData);
      expensesCtx.addExpense({...expenseData, id: id});
    }
     navigation.goBack();
   
  }catch(error){
   setError('Could not save data - please try again later!');
   setIsSubmitted(false);
  }
}

 const errorHandler = ()=>{
  setError(null);
 }

 if(error && !isSubmitted){
  return <ErrorOverlay message={error} onConfirm={errorHandler}/>
 }

 if(isSubmitted){
  return <LoadingOverlay/>
 }

  return (
    <View style={styles.container}>
      <ExpenseForm 
      submitButtonLabel={isEditing? 'Update': 'Add'}
      onSubmit={confirmHandler}
      onCancel={cancelHandler}
      defaultValues = {selectedExpense}/>
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
  deleteContainer:{
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
})