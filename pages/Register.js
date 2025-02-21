import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Register = () => {

    const Navigation = useNavigation()


    return (
        <View style={styles.container}>

            <View style={styles.form}>

                <Image style={styles.image} source={require('../assets/LogoEncontrarteCafe.png')} resizeMode='contain'/>
                <Text style={styles.titulo}>Registrate</Text>

                <View style={{flexDirection: 'row', width: '80%'}}>
                    <TextInput style={styles.input} placeholder='Nombre(s)' keyboardType='email-address'/>
                    <TextInput style={styles.input} placeholder='Apellidos(s)' />
                </View>

                <View style={{flexDirection: 'row', width: '80%'}}>
                    <TextInput style={styles.input} placeholder='Correo Electronico' keyboardType='email-address'/>
                    <TextInput style={styles.input} placeholder='Contraseña' />
                </View>

                <View style={{flexDirection: 'row', width: '80%'}}>
                    <TextInput style={styles.input} placeholder='Ciudad' keyboardType='email-address'/>
                    <TextInput style={styles.input} placeholder='Fecha De Nacimiento' />
                </View>
                

                <TouchableOpacity style={styles.boton} onPress={()=> Navigation.navigate('Login')}>
                    <Text style={styles.textoBtn}>
                    Registrar
                    </Text>
                </TouchableOpacity>

                <View style={styles.containerTexto}>
                    <Text style={styles.texto}>¿Ya tienes cuenta? </Text>
                    <TouchableOpacity onPress={() => Navigation.navigate('Login')} >
                        <Text style={styles.registrate}>Inicia Sesion</Text>
                    </TouchableOpacity>
                </View>

            </View>

            <View style={{width: '30%', height: '70vh', }}>
                <Image style={{width: '100%', height: '70vh', borderRadius:20}} source={require('../assets/icon.png')} resizeMode='cover'/>
            </View>

        </View>
    )
}

export default Register

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#e3298f',
        height: "100%",
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    image:{
        width:'70%',
        height: 100,
        marginBottom: 10
    },
    form:{
        width:'55%',
        height: 'auto',
        backgroundColor: '#FFFFF3',
        borderRadius: 20,
        alignItems: 'center',
        paddingVertical: 30,
        boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)',
    },
    titulo:{
        fontWeight: 'bold',
        color: '#1A1A1A',
        fontSize: 35,
        marginBottom: 20
    },
    input:{
        backgroundColor: '#FFF9F9',
        width: '80%',
        height: 40,
        paddingHorizontal: 20,
        marginBottom: 15,
        marginHorizontal: 10,
        borderRadius:10,
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.3)',
    },
    boton:{
        marginTop: 10,
        width: '35%',
        height: 35,
        backgroundColor: '#44634E',
        borderRadius: 10,
        shadowColor: "black",
        shadowOffset: { height: 0, width: 0},
        shadowOpacity: 0.3,
        shadowRadius: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textoBtn:{
        fontSize: 15,
        color: '#FFFFF3'
    },
    containerTexto:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20
    },
    texto:{
        fontSize: 15,
        color: '#1A1A1A'
    },
    registrate:{
        fontSize: 15,
        textDecorationLine: 'underline',
        color: '#44634E'
    },
    marginBottom:{
        marginBottom: 50
    },

})

