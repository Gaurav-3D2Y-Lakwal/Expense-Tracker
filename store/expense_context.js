import { createContext, useReducer } from "react";


export const ExpenseContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    setExpenses: () => {},
    deleteExpense: (id) => {},
    updateExpense: (id,{description, amount, date}) => {},
});

const expensesReducer = (state, action)=>{
    switch(action.type){
        case 'ADD': 
           return [action.payload, ...state]
        case 'SET':
            const inverted = action.payload.reverse();
            return inverted
        case 'UPDATE':
            console.log(action.payload)
            const updateableExpenseIndex = state.findIndex(
                (expense)=>expense.id === action.payload.id
            );
            const updatableExpense = state[updateableExpenseIndex];
            const updatedItem = {...updatableExpense, ...action.payload.data};
            const updatedExpenses = [...state];
            updatedExpenses[updateableExpenseIndex] = updatedItem;
            return updatedExpenses
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;
    }
}


function ExpenseContextProvider({children}){
    const [expenseState, dispatch] = useReducer(expensesReducer, []);

    const addExpense = (expenseData) =>{
      dispatch({type: 'ADD', payload: expenseData})
    }

    const setExpenses=(expenses)=>{
        dispatch({type: 'SET', payload: expenses})
    }
    
    const updateExpense = (id, expenseData) =>{
      dispatch({type: 'UPDATE', payload: {id:id, data: expenseData} });
    }

    const deleteExpense = (id) =>{
       dispatch({type: 'DELETE', payload: id });
    }
    
    const value = {
        expenses: expenseState,
        addExpense: addExpense,
        setExpenses: setExpenses,
        updateExpense: updateExpense,
        deleteExpense: deleteExpense,
    };
  
    return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
}

export default ExpenseContextProvider; 