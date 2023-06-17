import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import ResetPasswordform from '../components/resetPassword/ResetPasswordform'

const ResetPassword = ({ navigation }) => {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <ResetPasswordform navigation={navigation} />
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default ResetPassword