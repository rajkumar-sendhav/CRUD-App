import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import SignupForm from '../components/signupScreen/Signupform'

const SignupScreen = ({ navigation }) => {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <SignupForm navigation={navigation} />
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default SignupScreen