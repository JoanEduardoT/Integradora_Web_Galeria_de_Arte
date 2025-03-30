import React from 'react'
import {View, StyleSheet, Text, Image, Pressable} from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Navbar = () => {

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
                    <Image style={styles.perfilImage} source={require('../assets/icon.png')}/>
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
