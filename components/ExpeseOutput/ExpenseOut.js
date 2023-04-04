import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import ExpenseSummary from './ExpenseSummary';
import ExpenseList from './ExpenseList';
import { GlobalStyles } from '../../constants/styles';
const cl = GlobalStyles.colors;

const ExpenseOut = ({ expenses, expesePeriod }) => {
    return (
        <View style={styles.container}>
            <ExpenseSummary expenses={expenses} periodName={expesePeriod} />
            <ExpenseList expenses={expenses} />
        </View>
    )
}

export default ExpenseOut;
const styles = StyleSheet.create({
    container: {
        height: "100%",
        padding: 20,
        backgroundColor: cl.lgr,
    },

})