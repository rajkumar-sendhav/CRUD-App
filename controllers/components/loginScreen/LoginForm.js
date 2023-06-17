import { View, Text, StyleSheet, ImageBackground, TextInput, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const LoginForm = ({ navigation }) => {
    const background = require('../../assests/background.jpg')

    if (auth.currentUser) {
        navigation.navigate('HomeScreen')
    } else {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.navigate('HomeScreen')
            }
        })
    }

    const [errorMessage, setErrorMessage] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const login = () => {
        if (email !== "" && password !== "") {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    navigation.navigate("ToDo", { user: userCredential.user });
                    setErrorMessage("");
                    setEmail("");
                    setPassword("");
                })
                .catch((error) => {
                    setErrorMessage(error.message)
                });
        } else {
            setErrorMessage("Please enter an email and password");
        }
    }

    return (
        <ImageBackground style={styles.container} source={background}>
            <View style={styles.backgroundCover}>
                <Text style={[styles.lightText, styles.header]}>Login</Text>
                <Text style={styles.errorText}>{errorMessage}</Text>
                <TextInput
                    style={[styles.textInput, styles.lightTextInput, styles.lightText]}
                    placeholder='Eamil' placeholderTextColor='#BEBEBE'
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={[styles.textInput, styles.lightTextInput, styles.lightText]}
                    placeholder='Password' placeholderTextColor='#BEBEBE'
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />

                <View style={styles.rowContainer}>
                    <Text style={styles.lightText}>Don't have an account?</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignupScreen')}
                    >
                        <Text style={{ color: '#87F1FF' }}> Sign Up</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.rowContainer1}>
                    <Text style={styles.lightText}>Forgot your password?</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ResetPassword')}>
                        <Text style={{ color: '#87F1FF' }}> Reset</Text>
                    </TouchableOpacity>
                </View>

                <Button title='Login' onPress={login} color='#f7b267' />
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
        marginVertical: 4,
        marginTop: 16,
    },
    rowContainer1: {
        flexDirection: "row",
        marginVertical: 4,
        marginBottom: 16,
    },
    errorText: {
        color: '#ff0000'
    },
})

export default LoginForm
