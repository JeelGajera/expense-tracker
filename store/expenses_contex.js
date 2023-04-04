import { createContext, useReducer } from 'react';

// const DUMMY_DATA = [
//     {
//         id: 1,
//         description: "Math books",
//         amount: 100,
//         date: new Date(2022, 10, 19),
//     },
//     {
//         id: 2,
//         description: "Pair if shoes",
//         amount: 200,
//         date: new Date(2022, 10, 20),
//     },
//     {
//         id: 3,
//         description: "Pairs of socks",

//         amount: 300,
//         date: new Date(2022, 10, 21),
//     },
//     {
//         id: 4,
//         description: "Pair of Trousers",
//         amount: 400,
//         date: new Date(2022, 10, 2),
//     },
//     {
//         id: 5,
//         description: "Pair if shoes",
//         amount: 200,
//         date: new Date(2022, 10, 1),
//     },
//     {
//         id: 6,
//         description: "Pairs of socks",

//         amount: 300,
//         date: new Date(2022, 10, 21),
//     },
//     {
//         id: 7,
//         description: "Pair of Trousers",
//         amount: 400,
//         date: new Date(2022, 10, 22),
//     },
//     {
//         id: 8,
//         description: "Pair of Trousers",
//         amount: 400,
//         date: new Date(2022, 10, 22),
//     },
//     {
//         id: 9,
//         description: "Pair of Trousers",
//         amount: 400,
//         date: new Date(2022, 10, 22),
//     },
//     {
//         id: 10,
//         description: "Pair of Trousers",
//         amount: 400,
//         date: new Date(2022, 10, 22),
//     },
// ]

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => { },
    deleteExpense: (id) => { },
    updateExpense: (id, { description, amount, date }) => { },
    setExpenses: (expenses) => { }
});

const expensesReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [...state, { ...action.payload }];
        case 'DELETE_EXPENSE':
            return state.filter((expense) => expense.id !== action.payload);
        case 'UPDATE_EXPENSE':
            const updatableExpenseIndex = state.findIndex(
                (expense) => expense.id === action.payload.id
            );
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = { ...updatableExpense, ...action.payload };
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case 'SET_EXPENSES':
            const inverted = action.payload.reverse();
            return inverted;
        default:
            return state;
    }
}

const ExpenseContextProvider = ({ children }) => {
    const [expensesState, dispatch] = useReducer(expensesReducer, []);

    const addExpense = (expenseData) => {
        dispatch({
            type: 'ADD_EXPENSE',
            payload: expenseData,
        });
    };
    const deleteExpense = (id) => {
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: id
        });
    };
    const updateExpense = (id, expenseData) => {
        dispatch({
            type: 'UPDATE_EXPENSE',
            payload: expenseData,
        });
    };

    const setExpenses = (expenses) => {
        dispatch({
            type: 'SET_EXPENSES',
            payload: expenses,
        });
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
        setExpenses: setExpenses
    };

    return (
        <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
    );
};

export default ExpenseContextProvider;