import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../constants/styles'

const Button = ({ children, onPress, mode }) => {
    return (
        <View styles={styles}>
            <Pressable onPress={onPress}>
                <View style={[styles.button, mode === 'flat' && styles.flat]}>
                    <Text style={[styles.text, mode === 'flat' && styles.flatText]}>{children}</Text>
                </View>
            </Pressable>
        </View>
    )
}

export default Button

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        padding: 8,
        backgroundColor: GlobalStyles.colors.gr,
        elevation: 3,
        width: 150
    },
    flat: {
        backgroundColor: "transparent",
    },
    text: {
        color: 'white',
        textAlign: 'center',
    },
    flatText: {
        color: GlobalStyles.colors.b1,
    },
    pressed: {
        opacity: 0.7,
    }
})