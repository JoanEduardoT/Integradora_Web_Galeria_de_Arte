import {View, StyleSheet, Text, Image, Pressable} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React, {useState,useEffect, useCallback} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { useFocusEffect } from '@react-navigation/native';

const Navbar = () => {

    const [userData, setUserData] = useState(null)

    useFocusEffect(
        useCallback(() => {
        const fetchUserData = async () => {
          try {
            const userToken = await AsyncStorage.getItem('userToken')
            const userId = await AsyncStorage.getItem('userId')
    
            console.log("userToken:", userToken) 
            console.log("userId:", userId) // Depuración
    
            if (!userToken || !userId) {
              console.log('No hay token o userId disponibles') 
              return 
            }
    
            
            const response = await axios.get(`http://iwo4c40ogk48wo48w844ow0s.31.170.165.191.sslip.io/user/${userId}`, {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },

            })
    
            console.log(response.data[0])
            setUserData(response.data[0])
            setLoading(false) 
            
          } catch (error) {
            console.error('Error al obtener los datos del usuario', error)
            setLoading(false) 
          }
        }
        fetchUserData()
      }, []))
    


    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <View> 
                <Image style={styles.logoImage} source={require('../assets/LogoEncontrarte.png')} resizeMode='contain'/>
            </View>

            <View style={styles.pagesContainer}> 

                <Pressable style={styles.pageBtn} onPress={() => navigation.navigate('Dashboard')}>
                    <Text style={styles.textBtn}>Inicio</Text>
                </Pressable>

                <Pressable style={styles.pageBtn} onPress={() => navigation.navigate('Productos')}>
                    <Text style={styles.textBtn}>Productos</Text>
                </Pressable>

                <Pressable style={styles.pageBtn} onPress={() => navigation.navigate('Subastas')}>
                    <Text style={styles.textBtn}>Subastas</Text>
                </Pressable>

                <Pressable style={styles.pageBtn} onPress={() => navigation.navigate('Ventas')}>
                    <Text style={styles.textBtn}>Ventas</Text>
                </Pressable>

                <Pressable style={styles.pageBtn} onPress={() => navigation.navigate('Perfil')}>
                <Image 
                    style={styles.perfilImage} 
                    source={userData && userData.image ? { uri: userData.image } : require('../assets/icon.png')} 
                />

                </Pressable>


            </View>

        </View>
    )
}

export default Navbar

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#634455',
        width: '100%',
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '10%'
    },
    pagesContainer:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    pageBtn:{
        marginHorizontal: 10
    },
    textBtn:{
        color:'white',
    },
    logoImage:{
        width:200,
        height: 200,
    },
    perfilImage:{
        width: 40,
        height: 40,
        borderRadius: 100,
    }
});
