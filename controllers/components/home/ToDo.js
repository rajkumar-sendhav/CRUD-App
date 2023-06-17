import { View, StyleSheet, Button, Text, TouchableOpacity, SafeAreaView, Modal, ActivityIndicator, FlatList } from 'react-native'
import React, { useState } from 'react'
import { auth, db } from '../../firebase'
import { sendEmailVerification } from 'firebase/auth'
import AddTodoModal from './AddTodoModal'
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore";
// import CheckBox from '@react-native-community/checkbox';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const ToDo = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [toDos, setToDos] = useState([])
  const [isRefreshing, setIsRefreshing] = useState(false)

  const loadToDoList = async () => {
    const q = query(collection(db, "todos"), where("userId", "==", auth.currentUser.uid));

    const querySnapshot = await getDocs(q);
    let toDos = [];
    querySnapshot.forEach((doc) => {
      let toDo = doc.data();
      toDo.id = doc.id;
      toDos.push(toDo);
    });

    setToDos(toDos);
    setIsLoading(false);
    setIsRefreshing(false);
  }

  if (isLoading) {
    loadToDoList()
  }

  const checkToDoItem = (item, isChecked) => {
    const toDoRef = doc(db, 'todos', item.id);
    setDoc(toDoRef, { completed: isChecked }, { merge: true });
  }

  const deleteToDo = async (toDoId) => {
    await deleteDoc(doc(db, "todos", toDoId));
    let updatedToDos = [...toDos].filter((item) => item.id != toDoId);
    setToDos(updatedToDos);
  }

  const renderToDoItem = ({ item }) => {
    return (
      <View style={[styles.rowContainer, styles.rightMargin, styles.leftMargin]}>
        <View style={{ flex: 1 }}>
          <BouncyCheckbox
            isChecked={item.complated}
            size={25}
            fillColor="#258ea6"
            unfillColor="#FFFFFF"
            text={item.text}
            iconStyle={{ borderColor: "#258ea6" }}
            onPress={(isChecked) => { checkToDoItem(item, isChecked) }}
          />
        </View>
        <TouchableOpacity onPress={() => deleteToDo(item.id)} >
          <Text style={{ color: '#258EA6', fontSize: 22 }} >Delete</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const showToDoList = () => {
    return (
      <FlatList
        data={toDos}
        refreshing={isRefreshing}
        onRefresh={() => {
          loadToDoList();
          setIsRefreshing(true);
        }}
        renderItem={renderToDoItem}
        keyExtractor={item => item.id} />
    )
  }

  const showContent = () => {
    return (
      <View>
        {isLoading ? <ActivityIndicator size='large' /> : showToDoList()}
        <TouchableOpacity onPress={() => setModalVisible(true)} >
          <Text style={{ color: '#fb4d3d', fontSize: 25, textAlign: 'center' }}>Add ToDo</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const showSendVerificationEmail = () => {
    return (
      <View>
        <Text style={{ fontSize: 27, color: 'black', marginBottom: 10 }}>Please verify your email to ToDo</Text>
        <Button title='Send Verification Email' onPress={() => sendEmailVerification(auth.currentUser)} />
      </View>
    )
  }

  const addToDo = async (todo) => {
    const toDoToSave = {
      text: todo,
      completed: false,
      userId: auth.currentUser.uid
    };
    const docRef = await addDoc(collection(db, "todos"), toDoToSave);

    toDoToSave.id = docRef.id;

    const updatedToDos = [...toDos];
    updatedToDos.push(toDoToSave);

    setToDos(updatedToDos);
  }

  return (
    <SafeAreaView >
      <View style={[styles.rowContainer, styles.rightAligned, styles.rightMargin, styles.topMargin]}>
        <TouchableOpacity onPress={() => navigation.navigate('ManageAccount')} >
          <Text style={{ color: '#258EA6', fontSize: 20, justifyContent: 'flex-end' }} >Manage Account</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <AddTodoModal
          onClose={() => setModalVisible(false)}
          addToDo={addToDo} />
      </Modal>
      <Text style={{
        fontSize: 30,
        alignSelf: "center",
        fontWeight: 'bold'
      }}>ToDo</Text>
      {auth.currentUser.emailVerified ? showContent() : showSendVerificationEmail()}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    marginVertical: 4,

  },
  rightMargin: {
    marginRight: 16
  },
  leftMargin: {
    marginLeft: 16
  },
  rightAligned: {
    justifyContent: "flex-end"
  },
  topMargin: {
    marginTop: 16
  },
})

export default ToDo
