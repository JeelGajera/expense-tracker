import { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManageExpense from './screens/ManageExpense';
import AllExpense from './screens/AllExpense';
import RecentExpense from './screens/RecentExpense';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import { GlobalStyles } from './constants/styles'
import { Ionicons } from '@expo/vector-icons';
import IconButton from './components/UI/IconButton';
import ExpenseContextProvider from './store/expenses_contex';
import AuthContextProvider, { AuthContext } from './store/auth_context';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const ExpenseOverview = () => {
  const authCtx = useContext(AuthContext);

  return (
    <BottomTab.Navigator
      screenOptions={({ navigation }) => ({
        headerTintColor: GlobalStyles.colors.y1,
        headerStyle: {
          backgroundColor: GlobalStyles.colors.b1,
        },
        tabBarStyle: { backgroundColor: GlobalStyles.colors.b1 },
        tabBarActiveTintColor: GlobalStyles.colors.y1,
        headerRight: () => (
          <>
            <View style={styles.headBtn}>
              <IconButton
                name="add"
                size={24}
                color={GlobalStyles.colors.y1}
                onPress={() => {
                  navigation.navigate('ManageExpense');
                }}
              />
              <IconButton
                name="exit"
                size={24}
                color={GlobalStyles.colors.y1}
                onPress={authCtx.logout}
              />
            </View>
          </>
        )
      })}>
      <BottomTab.Screen
        name="Recent Expense"
        component={RecentExpense}
        options={{
          title: "Recent Expense",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => <Ionicons name="hourglass" color={color} size={size} />
        }}
      />
      <BottomTab.Screen
        name="All Expense"
        component={AllExpense}
        options={{
          title: "All Expense",
          tabBarLabel: "All Expense",
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar" color={color} size={size} />
        }}
      />
    </BottomTab.Navigator>
  );
};

const AuthenticatedStack = () => {
  return (
    <ExpenseContextProvider>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: GlobalStyles.colors.y1,
          headerStyle: {
            backgroundColor: GlobalStyles.colors.b1,
          }
        }}
      >
        <Stack.Screen
          name="ExpenseOverview"
          component={ExpenseOverview}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManageExpense"
          component={ManageExpense}
          options={{
            presentation: 'modal',
          }}
        />
      </Stack.Navigator>
    </ExpenseContextProvider>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.b1 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: GlobalStyles.colors.lgr },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
};

export default function App() {

  function Root() {
    const authCtx = useContext(AuthContext);
    useEffect(() => {
      async function getToken() {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          authCtx.authenticate(storedToken);
        }
      }
      getToken();
    }, []);
    return <Navigation />;
  }
  
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root/>
      </AuthContextProvider>
    </>
  );
}


const styles = StyleSheet.create({
  headBtn: {
    flexDirection: 'row',
  }
});