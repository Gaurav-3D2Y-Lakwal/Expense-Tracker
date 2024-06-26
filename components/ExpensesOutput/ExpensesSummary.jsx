import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { GlobalStyles } from '../../constants/styles';

const ExpensesSummary = ({expenses, peroidName}) => {
    const expensesSum = expenses.reduce((sum, expense)=>{
        return sum + expense.amount
    },0);

  return (
    <View style={styles.contianer}>
      <Text style={styles.peroid}>{peroidName}</Text>
      <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
    </View>
  )
}

export default ExpensesSummary

const styles = StyleSheet.create({
    contianer:{
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 6,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    peroid:{
        fontSize: 12,
        color: GlobalStyles.colors.primary400,
    },
    sum: {
        fontSize: 16,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary500
    },
})