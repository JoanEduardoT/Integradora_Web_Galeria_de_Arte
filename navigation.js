import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

//Paginas
import Dashboard from './pages/Dashboard';
import Productos from './pages/Productos';
import Perfil from './pages/Perfil';
import Subastas from './pages/Subastas';
import Ventas from './pages/Ventas';
import Login from './pages/Login';
import Register from './pages/Register';


const Stack = createStackNavigator();
function MyStack() {
    return(
        <Stack.Navigator
            initialRouteName="Productos"
        >
            <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    headerShown: false,
                    gestureEnabled: false 
                }}

            />

            <Stack.Screen
                name="Ventas"
                component={Ventas}
                options={{
                    headerShown: false,
                    gestureEnabled: false 
                }}

            />  

            <Stack.Screen
                name="Productos"
                component={Productos}
                options={{
                    headerShown: false,
                    gestureEnabled: false 
                }}

            />

                
            <Stack.Screen
                name="Subastas"
                component={Subastas}
                options={{
                    headerShown: false,
                    gestureEnabled: false 
                }}

            />

            <Stack.Screen
                name="Perfil"
                component={Perfil}
                options={{
                    headerShown: false,
                    gestureEnabled: false 
                }}

            />  

            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false,
                    gestureEnabled: false 
                }}

            />    

            <Stack.Screen
                name="Register"
                component={Register}
                options={{
                    headerShown: false,
                    gestureEnabled: false 
                }}

            /> 

        </Stack.Navigator>
    )
}


export default function Navigation() {
    return(
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    );
}
