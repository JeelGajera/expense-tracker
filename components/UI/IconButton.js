import { StyleSheet, Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react'

const IconButton = ({ name, size, color, onPress}) => {
  return (
    <Pressable onPress={onPress} style={ ({pressed}) => pressed && styles.pressed}>
        <View style={styles.container}>
            <Ionicons name={name} size={size} color={color} />
        </View>
    </Pressable>
  )
}

export default IconButton

const styles = StyleSheet.create({
    container: {
        borderRadius: 24,
        padding: 6,
        marginHorizontal: 20,
    },
    pressed: {
        opacity: 0.75,
    },
})