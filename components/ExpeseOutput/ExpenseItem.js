import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { getFormattedDate } from '../utils/date';
import { useNavigation } from '@react-navigation/native';

const ExpenseItem = ({ description, amount, date, id }) => {
    const navigation = useNavigation();
    function expensesPressHandler() {
        navigation.navigate('ManageExpense',  {expId : id});
    }
    return (
        <Pressable
            onPress={expensesPressHandler}
            style={({ pressed }) => pressed && styles.pressed}
        >
            <View style={styles.expItem}>
                <View>
                    <Text style={styles.description}>{description}</Text>
                    <Text>{getFormattedDate(date)}</Text>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.amount}>{amount.toFixed(2)}</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default ExpenseItem;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.7
    },
    expItem: {
        padding: 10,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        backgroundColor: "#eee",
        elevation: 6,
        shadowColor: "black",
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
    },
    description: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    priceContainer: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        elevation: 3,
    },
    amount: {
        fontWeight: 'bold',
    }
})