import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../constants/styles';
const cl = GlobalStyles.colors;

const ExpenseSummary = ({ expenses, periodName }) => {
    const expsum = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    return (
        <View style={styles.container}>
            <Text style={styles.period}>{periodName}</Text>
            <Text style={styles.sum}>₹ {expsum.toFixed(2)}</Text>
        </View>
    )
}

export default ExpenseSummary

const styles = StyleSheet.create({
    container: {
        padding: 0,
        backgroundColor: 'gray',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    period: {
        fontSize: 16,
        padding: 10,
        color: cl.b1,
    },
    sum: {
        fontSize: 18,
        padding: 10,
        color: cl.y1,
    },

})