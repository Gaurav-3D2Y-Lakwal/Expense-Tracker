import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { ExpenseContext } from '../store/expense_context';
import { getDateMinusDays } from '../utli/date';

const RecentExpenses = () => {
   const expensesCtx = useContext(ExpenseContext);
    
   const recentExpenses = expensesCtx.expenses.filter((expense)=>{
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo
   })
   
  return (
    <ExpensesOutput 
    expenses={recentExpenses}
     expensesPeroid="Last 7 Days"
     fallbackText="No expenses registered for the last 7 days."/>
  )
}

export default RecentExpenses

const styles = StyleSheet.create({})