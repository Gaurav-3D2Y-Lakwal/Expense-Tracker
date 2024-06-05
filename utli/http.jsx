import axios from 'axios';

const url= 'https://react-native-3714e-default-rtdb.asia-southeast1.firebasedatabase.app'
export const storeExpense = async (expenseData) =>{
    const response = await axios.post(url + '/expenses.json', expenseData)
    const id = response.data.name;
    return id
} 

export const fetchExpenses = async() =>{
    const response = await axios.get(url + '/expenses.json');

    const expenses = [];
    for(const key in response.data){
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        }
         expenses.push(expenseObj);
    }

    return expenses;
}

export const updateExpense = async (id, expenseData) =>{
    return axios.put(url + `/expenses/${id}.json`, expenseData)
}

export const deleteExpense = async (id) =>{
    return axios.delete(url + `/expenses/${id}.json`)
}
