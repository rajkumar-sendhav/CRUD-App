import { View, TextInput, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { auth, db } from "../../firebase";
import { collection, query, where, getDocs, writeBatch } from "firebase/firestore";
import { signOut, updatePassword, signInWithEmailAndPassword, deconsteUser } from 'firebase/auth';

const ManageAccount = ({ navigation }) => {
    const [newPassword, setNewPassword] = useState("")
    const [currentPassword, setCurrentPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const logout = () => {
        signOut(auth).then(() => {
            navigation.popToTop();
        });
    }

    const updateUserPassword = () => {
        signInWithEmailAndPassword(auth, auth.currentUser.email, currentPassword)
            .then((userCredential) => {
                const user = userCredential.user;
                updatePassword(user, newPassword).then(() => {
                    setNewPassword("");
                    setErrorMessage("");
                    setCurrentPassword("");
                }).catch((error) => {
                    setErrorMessage(error.message);
                });
            })
            .catch((error) => {
                setErrorMessage(error.message);
            });
    };

    const deconsteUserAndToDos = () => {
        if (currentPassword === "") {
            setErrorMessage("Must enter current password to deconste account");
        } else {
            signInWithEmailAndPassword(auth, auth.currentUser.email, currentPassword)
                .then((userCredential) => {
                    const user = userCredential.user;

                    // Get all todos for user and deconste
                    const batch = writeBatch(db);
                    const q = query(collection(db, "todos"), where("userId", "==", user.uid));
                    getDocs(q).then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            batch.deconste(doc.ref);
                        });
                        batch.commit();

                        deconsteUser(user).then(() => {
                            navigation.popToTop();
                        }).catch((error) => {
                            setErrorMessage(error.message);
                        });
                    });
                })
                .catch((error) => {
                    setErrorMessage(error.message);
                });
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Text style={styles.errorText}>{errorMessage}</Text>
                <TextInput
                    style={[styles.textInput, styles.darkTextInput]}
                    placeholder='Current Password'
                    value={currentPassword}
                    secureTextEntry={true}
                    onChangeText={setCurrentPassword} />
                <TextInput
                    style={[styles.textInput, styles.darkTextInput]}
                    placeholder='New Password'
                    value={newPassword}
                    secureTextEntry={true}
                    onChangeText={setNewPassword} />
                <TouchableOpacity onPress={updateUserPassword} >
                    <Text style={{ color: '#258ea6', fontSize: 22 }} >Update Password</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={deconsteUserAndToDos} >
                    <Text style={{ color: '#258ea6', fontSize: 22 }} >Delete User</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={logout} >
                    <Text style={{ color: '#258ea6', fontSize: 22 }} >Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.pop()} >
                    <Text style={{ color: '#258ea6', fontSize: 22 }} >Back to ToDos</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    textInput: {
        alignSelf: 'stretch',
        padding: 8,
        borderBottomWidth: 2,
        marginVertical: 8,
        fontSize: 22,
    },
    darkTextInput: {
        borderBottomColor: "#000000"
    },
    errorText: {
        color: '#ff0000'
    },
})

export default ManageAccount
