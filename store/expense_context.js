import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2021-12-19')
    },
    {
        id: 'e2',
        description: 'A pair of trousers',
        amount: 89.29,
        date: new Date('2022-01-05')
    },
    {
        id: 'e3',
        description: 'Some bananas',
        amount: 5.99,
        date: new Date('2022-01-19')
    },
    {
        id: 'e4',
        description: 'A book',
        amount: 14.99,
        date: new Date('2022-02-19')
    },
    {
        id: 'e5',
        description: 'Another book',
        amount: 14.99,
        date: new Date('2022-03-05')
    },
    ]

export const ExpenseContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    updateExpense: (id) => {},
    deleteExpense: (id,{description, amount, date}) => {},
});

const expensesReducer = (state, action)=>{
    switch(action.type){
        case 'ADD': 
           const id = new Date().toString() + Math.random.toString();
           return [{...action.payload, id: id },...state]
        case 'UPDATE':
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
    const [expenseState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    const addExpense = ({expenseData}) =>{
      dispatch({type: 'ADD', payload: expenseData})
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
        updateExpense: updateExpense,
        deleteExpense: deleteExpense,
    };
  
    return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
}

export default ExpenseContextProvider; 