import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { ExpenseContext } from '../store/expense_context';
import { getDateMinusDays } from '../utli/date';
import { fetchExpenses } from '../utli/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

const RecentExpenses = () => {
   const [isFetching, setIsFetching ] = useState(true);
   const [error,setError] = useState();

   const expensesCtx = useContext(ExpenseContext);
   
   useEffect(()=>{
    const getExpenses = async ()=>{
      setIsFetching(true);
      try{
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      }catch(error){
        setError('Could not fetch expenses!');
      }
       
       setIsFetching(false);
     
    }

    getExpenses();
   },[]);
    
   const recentExpenses = expensesCtx.expenses.filter((expense)=>{
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo
   })

   const errorHandler = ()=>{
    setError(null);
   }

   if(error && !isFetching){
    return <ErrorOverlay message={error} onConfirm={errorHandler}/>
  }

   if(isFetching){
    return <LoadingOverlay/>
   }
   
  return (
    <ExpensesOutput 
    expenses={recentExpenses}
     expensesPeroid="Last 7 Days"
     fallbackText="No expenses registered for the last 7 days."/>
  )
}

export default RecentExpenses

const styles = StyleSheet.create({})