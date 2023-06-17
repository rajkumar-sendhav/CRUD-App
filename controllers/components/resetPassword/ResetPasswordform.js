import { View, Text, StyleSheet, ImageBackground, TextInput, Button, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../../firebase';
import { sendPasswordResetEmail } from 'firebase/auth'
const ResetPasswordform = ({ navigation }) => {
    const background = require('../../assests/background.jpg')

    const [email, setEmail] = useState('')
    const [errorMessage, setErroeMessage] = useState('')

    const resetPassword = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                navigation.popToTop()
            })
            .catch((error) => {
                setErroeMessage(error.message)
            });
    }

    return (
        <ImageBackground style={styles.container} source={background}>
            <KeyboardAvoidingView style={styles.backgroundCover}>
                <Text style={[styles.lightText, styles.header]}>Reset Password</Text>
                <Text style={styles.errorText}>{errorMessage}</Text>
                <TextInput
                    style={[styles.textInput, styles.lightTextInput, styles.lightText]}
                    placeholder='Eamil' placeholderTextColor='#BEBEBE'
                    value={email}
                    onChangeText={setEmail}
                />

                <View style={styles.rowContainer}>
                    <Text style={styles.lightText}>Don't have an account?</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignupScreen')}
                    >
                        <Text style={{ color: '#87F1FF' }}> Sign Up</Text>
                    </TouchableOpacity>
                </View>

                <Button title='Reset Password' onPress={resetPassword} color='#f7b267' />
            </KeyboardAvoidingView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundCover: {
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        opacity: 0.7,
        padding: 16
    },
    lightText: {
        color: "#fff"
    },
    header: {
        fontSize: 20,
        alignSelf: "center"
    },
    textInput: {
        alignSelf: 'stretch',
        padding: 8,
        borderBottomWidth: 2,
        marginVertical: 8,
        fontSize: 22,
    },
    lightTextInput: {
        borderBottomColor: "#ffffff"
    },
    rowContainer: {
        flexDirection: "row",
        marginVertical: 16,
    },
    errorText: {
        color: '#ff0000'
    },
})

export default ResetPasswordform
