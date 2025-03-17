import React,{useState,useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

const Register = () => {

    const Navigation = useNavigation()

    const [nombre,setNombre] = useState('');
    const [apellido,setApellido] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [direccion,setDireccion] = useState('');
    const [ciudad,setCiudad] = useState('');
    const [phone,setPhone] = useState('');
    const [Birth,setBirth] = useState('');


    const onSubmit = async () => {
        console.log("Dato:", nombre, apellido, email, password, direccion, ciudad, phone, Birth); // Asegúrate de que los valores estén aquí
    
        try {
            const response = await axios.post('http://localhost:4000/register', {
                name: nombre,
                lastname: apellido,
                email: email,
                pass: password,
                address: direccion,
                city: ciudad,
                phone: phone,
                birth: Birth
            });
    
            if (response.status === 201) {
                Alert.alert('Registro exitoso');
                Navigation.navigate('Login');
            } else {
                Alert.alert('Error en el registro', response.data.message);
            }
        } catch (error) {
            console.error("Error en el registro:", error);
            Alert.alert('Error', 'No se pudo completar el registro. Inténtalo de nuevo.');
        }
    };
    


    return (
        <View style={styles.container}>

            <View style={styles.form}>

                <Image style={styles.image} source={require('../assets/LogoEncontrarteCafe.png')} resizeMode='contain'/>
                <Text style={styles.titulo}>Registrate</Text>

                <View style={{flexDirection: 'row', width: '80%'}}>
                    <TextInput style={styles.input} placeholder='Nombre(s)' keyboardType='email-address' onChangeText={setNombre}/>
                    <TextInput style={styles.input} placeholder='Apellidos(s)' onChangeText={setApellido}/>
                </View>

                <View style={{flexDirection: 'row', width: '80%'}}>
                    <TextInput style={styles.input} placeholder='Correo Electronico' keyboardType='email-address' onChangeText={setEmail}/>
                    <TextInput style={styles.input} placeholder='Contraseña' onChangeText={setPassword} />
                </View>

                <View style={{flexDirection: 'row', width: '80%'}}>
                    <TextInput style={styles.input} placeholder='Ciudad' keyboardType='email-address' onChangeText={setCiudad}/>
                    <TextInput style={styles.input} placeholder='Fecha De Nacimiento' onChangeText={setBirth}/>
                </View>
                

                <TouchableOpacity style={styles.boton} onPress={onSubmit}>
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

