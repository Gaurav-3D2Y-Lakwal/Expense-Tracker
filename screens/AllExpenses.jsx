import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { ExpenseContext } from '../store/expense_context'

const AllExpenses = () => {
  const expensesCtx = useContext(ExpenseContext);

  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses} 
      expensesPeroid="Total"
      fallbackText="No registered expenses found!"/>
  )
}

export default AllExpenses

const styles = StyleSheet.create({})