import React,{useState,useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform, Alert, ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

const Login = () => {

    const [loading, setLoading] = useState(false); 
          
    const Navigation = useNavigation()
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const onSubmit = async (data) => {
        console.log('Formulario enviado:', email);
        try {
          const response = await axios.post('http://localhost:4000/login', {
            email: email,
            pass: password,
          });
      
          const { token, user } = response.data; // Extraemos 'user' y 'token'
          const userId = user.id; // Ahora extraemos el 'id' correctamente
      
          console.log('Respuesta del servidor:', response.data);
          console.log('userId:', userId); // Verificamos si ahora 'userId' es válido
      
          // Guardamos 'userId' en AsyncStorage
          await AsyncStorage.setItem('userToken', token);
          await AsyncStorage.setItem('userId', userId.toString());
      
          Navigation.navigate('Dashboard');
        } catch (error) {
          console.log("Error que da:", error);
          setLoading(false);
          if (error.response) {
            setErrorMessage(error.response.data.message || 'Error al iniciar sesión');
          } else {
            setErrorMessage('No se pudo conectar al servidor');
          }
        }
      };

    return (
        <ImageBackground style={styles.background} source={require('../assets/Background.png')} resizeMode='cover'>
        <View style={styles.container} >

            

            <View style={styles.form}>

                <Image style={styles.image} source={require('../assets/LogoEncontrarteCafe.png')} resizeMode='contain'/>
                <Text style={styles.titulo}>Iniciar Sesión</Text>


                <TextInput style={styles.input} placeholder='Correo Electronico' keyboardType='email-address' onChangeText={setEmail}/>
                <TextInput style={styles.input} placeholder='Contraseña' secureTextEntry={true} onChangeText={setPassword}/>



                <TouchableOpacity style={styles.boton} onPress={onSubmit}>
                    <Text style={styles.textoBtn}>
                    Ingresar
                    </Text>
                </TouchableOpacity>

                <View style={styles.containerTexto}>
                    <Text style={styles.texto}>¿No tienes cuenta? </Text>
                    <TouchableOpacity onPress={() => Navigation.navigate('Register')} >
                        <Text style={styles.registrate}>Registrate</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </View>
        </ImageBackground>
    )
}

export default Login

const styles = StyleSheet.create({
    background:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container:{
        height: "100%",
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    image:{
        width:'70%',
        height: 100,
        marginBottom: 20
    },
    form:{
        width:'30%',
        marginLeft: '20vh',
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
        marginBottom: 30
    },
    input:{
        backgroundColor: '#FFF9F9',
        width: '70%',
        height: 40,
        paddingHorizontal: 20,
        marginBottom: 15,
        borderRadius:10,
        boxShadow: 'inset 0px 1px 2px rgba(0, 0, 0, 0.3)',
    },
    boton:{
        marginTop: 10,
        width: '35%',
        height: 35,
        backgroundColor: '#44634E',
        borderRadius: 10,
        boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)',
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

})
