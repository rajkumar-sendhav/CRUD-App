import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import LoginForm from '../components/loginScreen/LoginForm'

const LoginScreen = ({ navigation }) => {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <LoginForm navigation={navigation} />
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default LoginScreen