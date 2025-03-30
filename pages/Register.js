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
    const [errors, setErrors] =useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    //regex
    const latinChars = /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s\'\-]*)$/gi; //nombre, apellido, ciudad
    const emailChars = /\S+@\S+\.\S+/ //email
    const direccionChars = /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff0-9\s\'\-\.,]*)$/gi // direccion
    const phoneChars = /^\d{2}[-\s]?\d{4}[-\s]?\d{4}$/ //numero telefonico

    const validateForm = () => {
        let errors = {};
        let errorMessages = ''; // Variable para almacenar los errores

        if (!nombre) {
            errors.nombre = 'El nombre es obligatorio.';
            errorMessages += 'El nombre es obligatorio.\n';
        } else if (!latinChars.test(nombre)) {
            errors.nombre = 'El nombre debe contener solo texto.';
            errorMessages += 'El nombre debe contener solo texto.\n';
        }

        if (!apellido) {
            errors.apellido = 'El apellido es obligatorio.';
            errorMessages += 'El apellido es obligatorio.\n';
        } else if (!latinChars.test(apellido)) {
            errors.apellido = 'El apellido debe contener solo texto.';
            errorMessages += 'El apellido debe contener solo texto.\n';
        }

        if (!email) {
            errors.email = 'El email es obligatorio.';
            errorMessages += 'El email es obligatorio.\n';
        } else if (!emailChars.test(email)) {
            errors.email = 'El email no es válido.';
            errorMessages += 'El email no es válido.\n';
        }

        if (!password) {
            errors.password = 'Contraseña es obligatoria';
            errorMessages += 'Contraseña es obligatoria.\n';
        } else if (password.length < 6) {
            errors.password = 'La contraseña debe tener al menos 6 caracteres.';
            errorMessages += 'La contraseña debe tener al menos 6 caracteres.\n';
        }

        if (!ciudad) {
            errors.ciudad = 'La ciudad es obligatorio.';
            errorMessages += 'La ciudad es obligatorio.\n';
        } else if (!latinChars.test(ciudad)) {
            errors.ciudad = 'La ciudad debe contener solo texto.';
            errorMessages += 'La ciudad debe contener solo texto.\n';
        }

        if (!direccion) {
            errors.direccion = 'La dirección es obligatoria.';
            errorMessages += 'La dirección es obligatoria.\n';
        } else if (!direccionChars.test(direccion)) {
            errors.direccion = 'La direccion solo incluye letras, números, espacios, guiones, comas y puntos.';
            errorMessages += 'La direccion solo incluye letras, números, espacios, guiones, comas y puntos.\n';
        }

        if (!phone) {
            errors.phone = 'El celular es obligatorio';
            errorMessages += 'El celular es obligatorio.\n';
        } else if (!phoneChars.test(phone)) {
            errors.phone = 'El celular debe contener 10 dígitos.';
            errorMessages += 'El celular debe contener 10 dígitos.\n';
        }

        // Mostrar alerta con los errores acumulados
        if (Object.keys(errors).length > 0) {
            window.alert(errorMessages); // Muestra los errores acumulados en la alerta
        }

        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
    }
    

    const onSubmit = async () => {
        console.log("Dato:", nombre, apellido, email, password, direccion, ciudad, phone); // Asegúrate de que los valores estén aquí
    
        validateForm();

        try {
            const response = await axios.post('http://iwo4c40ogk48wo48w844ow0s.31.170.165.191.sslip.io/register', {
                name: nombre,
                lastname: apellido,
                email: email,
                pass: password,
                address: direccion,
                city: ciudad,
                phone: phone,
                birth: '2003-05-10'
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
                    <TextInput style={styles.input} placeholder='Nombre(s)' value={nombre} onChangeText={setNombre}/>
                    <TextInput style={styles.input} placeholder='Apellidos(s)' value={apellido} onChangeText={setApellido}/>
                </View>

                <View style={{flexDirection: 'row', width: '80%'}}>
                    <TextInput style={styles.input} placeholder='Correo Electronico' keyboardType='email-address' value={email} onChangeText={setEmail}/>
                    <TextInput style={styles.input} placeholder='Contraseña' value={password} secureTextEntry={true} onChangeText={setPassword} />
                </View>

                <View style={{flexDirection: 'row', width: '80%'}}>
                    <TextInput style={styles.input} placeholder='Ciudad' value={ciudad} onChangeText={setCiudad}/>
                    <TextInput style={styles.input} placeholder='Direccion' value={direccion} onChangeText={setDireccion}/>
                </View>

                <View style={{flexDirection: 'row', width: '80%'}}>
                    <TextInput style={styles.inputUnico} placeholder='Celular' value={phone} onChangeText={setPhone}/>
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
    inputUnico:{
        backgroundColor: '#FFF9F9',
        width: '100%',
        height: 40,
        paddingHorizontal: 20,
        marginBottom: 15,
        marginHorizontal: 10,
        borderRadius:10,
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.3)'
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

