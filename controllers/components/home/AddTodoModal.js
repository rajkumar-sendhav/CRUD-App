import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'

const AddTodoModal = (props) => {
    const [todo, setTodo] = useState('')

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Text style={{ color: 'black', fontSize: 25 }} >Add Todo</Text>
                <TextInput
                    style={[styles.textInput, styles.darkTextInput]}
                    placeholder='ToDo' placeholderTextColor='#BEBEBE'
                    value={todo}
                    onChangeText={setTodo}
                />
                <View style={[styles.rowContainer, styles.rightAligned, styles.rightMargin]}>
                    <TouchableOpacity onPress={props.onClose} >
                        <Text style={{ color: '#258EA6', fontSize: 25 }}>Cancel </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            props.addToDo(todo);
                            setTodo('');
                            props.onClose();
                        }} >
                        <Text style={{ color: '#258EA6', fontSize: 25 }}> Ok</Text>
                    </TouchableOpacity>
                </View>
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
        padding: 16
    },
    darkTextInput: {
        borderBottomColor: "#000000"
    },
    textInput: {
        alignSelf: 'stretch',
        padding: 8,
        borderBottomWidth: 2,
        marginVertical: 8,
        fontSize: 22
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "stretch",
        marginVertical: 4,
    },
    rightAligned: {
        justifyContent: "flex-end"
    },
    rightMargin: {
        marginRight: 16
    },
})

export default AddTodoModal
