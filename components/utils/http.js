import axios from 'axios'

//Authentication Configuration Function
API_KEY = 'AIzaSyDasu2pjUhsUl--csgOqjDUiZlpXrP2kx8';
AUTH_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:'
// https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

async function authentication(email, password, mode) {
    const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`,
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
    );
    const token = response.data.idToken;
    return token;
}

export function createUser(email, password) {
    return authentication(email, password, 'signUp');
}

export function loginUser(email, password) {
    return authentication(email, password, 'signInWithPassword');
}


//Database Confuguration Function

const FIRE_URL = 'https://native-test-dd9f9-default-rtdb.firebaseio.com'

export async function storeExpense(expenseData) {
    const response = await axios.post(FIRE_URL + '/expenses.json', expenseData);
    const id = response.data.id
    return id;
}

export async function getExpenses() {
    const response = await axios.get(FIRE_URL + '/expenses.json');
    const expenses = [];
    for (const key in response.data) {
        expenses.push({
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
        });
    }
    return expenses;
};

export function updateExpense(id, expenseData) {
    return axios.put(FIRE_URL + '/expenses/' + id + '.json', expenseData);
};

export function deleteExpense(id) {
    return axios.delete(FIRE_URL + '/expenses/' + id + '.json');
};