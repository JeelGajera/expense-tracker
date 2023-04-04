import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import ExpenseOut from '../components/ExpeseOutput/ExpenseOut';
import { ExpensesContext } from '../store/expenses_contex';

const AllExpense = () => {
  const expensesCtx = useContext(ExpensesContext);

  return (
    <View>
      <ExpenseOut expenses={expensesCtx.expenses} expesePeriod="Total" />
    </View>
  )
}

export default AllExpense;

const styles = StyleSheet.create({})