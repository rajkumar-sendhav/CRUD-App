import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'
import ResetPassword from './screens/ResetPassword'
import HomeScreen from './screens/HomeScreen'
import ManageAccount from './components/home/ManageAccount'

const Stack = createNativeStackNavigator()

const screenOptions = {
    headerShown: false,
}

export const StackScreen = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='LoginScreen'
                screenOptions={screenOptions}
            >
                <Stack.Screen name='LoginScreen' component={LoginScreen} />
                <Stack.Screen name='SignupScreen' component={SignupScreen} />
                <Stack.Screen name='ResetPassword' component={ResetPassword} />
                <Stack.Screen name='HomeScreen' component={HomeScreen} />
                <Stack.Screen name='ManageAccount' component={ManageAccount}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
