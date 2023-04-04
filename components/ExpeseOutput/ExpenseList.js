import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import ExpenseItem from './ExpenseItem';

const renderExpenseItem = (itemData) => {
  return (
    <ExpenseItem {...itemData.item} />
  )
};

const ExpenseList = ({ expenses }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={(curItem) => curItem.id}
      />
    </View>
  )
}

export default ExpenseList

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
})