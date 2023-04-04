import { StyleSheet, View } from 'react-native'
import React, { useContext, useLayoutEffect, useState } from 'react'
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses_contex';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { deleteExpense, storeExpense, updateExpense } from '../components/utils/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';


const ManageExpense = ({ route, navigation }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();

  const expensesCtx = useContext(ExpensesContext);

  const expEditeId = route.params?.expId;
  const isEditing = !!expEditeId;

  const expToSelect = expensesCtx.expenses.find(exp => exp.id === expEditeId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  async function deleteHandler() {
    setIsLoading(true);
    try {
      await deleteExpense(expEditeId);
      expensesCtx.deleteExpense(expEditeId);
      navigation.goBack();
    } catch (error) {
      setIsError('Something went wrong!, Could not delete expense');
      setIsLoading(false);
    }
  }

  function cancleHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsLoading(true);
    try {
      if (isEditing) {
        expensesCtx.updateExpense(expEditeId, expenseData);
        await updateExpense(expEditeId, expenseData);
      }
      else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) { 
      setIsError('Something went wrong!, Could not save expense');
      setIsLoading(false);
    }
  }

  function errorhandler() {
    setIsError(null);
  }

  if (isError && !isLoading) {
    return <ErrorOverlay message={isError} onConfirm={errorhandler} />;
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        onCancle={cancleHandler}
        defaultValues={expToSelect}
      />
      <View style={styles.deleteContainer}>
        {isEditing && (
          <IconButton
            name="trash"
            color={GlobalStyles.colors.b1}
            size={24}
            onPress={deleteHandler}
          />)}
      </View>
    </View>
  )
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.lgr,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    alignItems: 'center',
    borderTopColor: GlobalStyles.colors.gr,
  },
})