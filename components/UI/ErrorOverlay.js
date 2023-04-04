import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from './Button'
import { GlobalStyles } from '../../constants/styles'

const ErrorOverlay = ({ message, onConfirm }) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.title, style.text]}>Error !</Text>
            <Text style={styles.text}>{message}</Text>
            <Button onPress={onConfirm}>Okay</Button>
        </View>
    )
}

export default ErrorOverlay

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.lgr,
    },
    text: {
        textAlign: 'center',    
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: GlobalStyles.colors.y1,
    },
})