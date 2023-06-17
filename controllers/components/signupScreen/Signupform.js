import { View, Text, StyleSheet, ImageBackground, TextInput, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

const SignupForm = ({ navigation }) => {
    const background = require('../../assests/background.jpg')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [validationMessage, setValidationMessage] = useState('')

    const validateAndSet = (value, valueToCompare, setValue) => {
        if (value !== valueToCompare) {
            setValidationMessage('Passwords do not match.')
        } else {
            setValidationMessage('')
        }

        setValue(value)
    }

    const signUp = () => {
        if (password === confirmPassword) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    sendEmailVerification(auth.currentUser)
                    navigation.navigate('HomeScreen', { user: userCredential.user })
                })
                .catch((error) => {
                    setValidationMessage(error.message)
                });
        }
    }

    return (
        <ImageBackground style={styles.container} source={background}>
            <View style={styles.backgroundCover}>
                <Text style={[styles.lightText, styles.header]}>Sign Up</Text>
                <Text style={styles.errorText}>{validationMessage}</Text>
                <TextInput
                    style={[styles.textInput, styles.lightTextInput, styles.lightText]}
                    placeholder='Email' placeholderTextColor='#BEBEBE'
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={[styles.textInput, styles.lightTextInput, styles.lightText]}
                    placeholder='Password' placeholderTextColor='#BEBEBE'
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(value) => validateAndSet(value, confirmPassword, setPassword)}
                />
                <TextInput
                    style={[styles.textInput, styles.lightTextInput, styles.lightText]}
                    placeholder='Confirm Password' placeholderTextColor='#BEBEBE'
                    secureTextEntry={true}
                    value={confirmPassword}
                    onChangeText={(value) => validateAndSet(value, password, setConfirmPassword)}
                />

                <View style={styles.rowContainer}>
                    <Text style={styles.lightText}>Already have an account?</Text>
                    <TouchableOpacity
                        onPress={() => navigation.popToTop()}>
                        <Text style={{ color: '#87F1FF' }}> Login</Text>
                    </TouchableOpacity>
                </View>

                <Button title='Sign Up' onPress={signUp} color='#f7b267' />
            </View>
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

export default SignupForm
