import { View, StyleSheet, Text } from 'react-native'
import React from 'react'
import ToDo from '../components/home/ToDo'

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ToDo navigation={navigation} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default HomeScreen