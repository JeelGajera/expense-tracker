import { View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ExpenseOut from '../components/ExpeseOutput/ExpenseOut';
import { ExpensesContext } from '../store/expenses_contex';
import { getDateMinusDays } from '../components/utils/date';
import { getExpenses } from '../components/utils/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

const RecentExpense = () => {
  const expensesCtx = useContext(ExpensesContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState();

  useEffect(() => {
    async function fetchExpenses() {
      setIsLoading(true);
      try {
        const expenses = await getExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setIsError('Something went wrong!, Could not fetch expenses');
      }
      setIsLoading(false);
    }
    fetchExpenses();
  },[]);

  function  errorhandler() {
    setIsError(null);
  }

  if (isError && !isLoading) {
    return <ErrorOverlay message={isError} onConfirm={errorhandler}/>;
  }

  if (isLoading) {
    return <LoadingOverlay/>;
  }

  const recent_expense = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return ((expense.date >= date7DaysAgo) && (expense.date <= today));
  });

  return (
    <View>
      <ExpenseOut expenses={recent_expense} expesePeriod="Recent 7 day" />
    </View>
  )
}

export default RecentExpense;
