import React, {useState,useEffect} from 'react'
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Modal,TextInput} from 'react-native'
import Navbar from '../components/Navbar'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'


const Perfil = () => {

    const navigation = useNavigation()
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState(false);
    


    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const userToken = await AsyncStorage.getItem('userToken')
            const userId = await AsyncStorage.getItem('userId')
    
            console.log("userToken:", userToken) // Depuración
            console.log("userId:", userId) // Depuración
    
            if (!userToken || !userId) {
              console.log('No hay token o userId disponibles') // Depuración
              return // Si no hay token o ID, no seguir con la solicitud
            }
    
            // Realiza la solicitud al servidor para obtener los datos del usuario
            const response = await axios.get(`http://localhost:4000/user/${userId}`, {
              headers: {
                Authorization: `Bearer ${userToken}`, // En caso de usar JWT o algún token
              },
            })
    
            console.log(response.data[0])
            setUserData(response.data[0])
            setLoading(false) // Cambia el estado de carga a false cuando se obtienen los datos
    
          } catch (error) {
            console.error('Error al obtener los datos del usuario', error)
            setLoading(false) // Cambia el estado de carga a false en caso de error
          }
        }
    
        fetchUserData()
      }, [])

      if (loading) {
        // Si los datos aún están cargando, muestra un mensaje de carga
        return (
          <View style={styles.loadingContainer}>
            <Text>Cargando...</Text>
          </View>
        )
      }
    
      if (!userData) {
        // Si no se han recibido datos del usuario, mostrar mensaje de error
        return (
          <View style={styles.loadingContainer}>
            <Text>No se pudo obtener la información del usuario.</Text>
          </View>
        )
      }


    return (
        <View style={{flex:1}}>
            <Navbar/>
            
            <ScrollView style={styles.scroll}>
                <Text style={styles.tituloBold}>MI PERFIL</Text>

                <View style={styles.botonContainer}>
                    <TouchableOpacity style={styles.botonEditar} onPress={()=> setModalVisible(true)}>
                        <Text style={styles.textoBtn}>Editar Perfil</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.botonCerrar} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.textoBtn}>Cerrar Sesion</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.perfilContainer}>
                    <Image style={styles.image} source={require('../assets/icon.png')} />

                    
                    <View style={{width: '100%', flexDirection: 'row', alignItems: 'flex-start'}}>

                    
                    <View style={{width: '60%'}}>
                        <Text style={styles.nombreUsuario}>
                            {userData.name} {userData.lastname}
                        </Text>

                        <View style={styles.containerDescripcion}>
                            <Text style={styles.descripcion}>
                            {userData.email}
                            </Text>
                        </View>
                        
                    </View>

                    <View style={{width: '20%'}}>
                        <Text style={styles.informacionTitulo}>
                            Informacion
                        </Text>
                        <Text style={styles.informacion}>
                            • {userData.addres}
                            • {userData.city}
                        </Text>
                        <Text style={styles.informacion}>
                            • {userData.phone}
                        </Text>
                        
                    </View>

                    </View>

                     <Modal
                                            animationType="fade"
                                            visible={modalVisible}
                                            transparent={true}
                                            onRequestClose={() => {
                                                Alert.alert('Modal has been closed.');
                                                setModalVisible(!modalVisible);
                                            }}>
                                            <View style={styles.modalBackdrop}>
                                                <View style={styles.modal}>
                    
                                                        <Text style={styles.tituloBold}>
                                                            Editar Perfil
                                                        </Text>
                                                    
                                                        <View style={{ width: '80%', backgroundColor: 'blue', justifyContent: 'center'}}>
                    
                                                        <View style={{alignSelf: 'center'}}>
                                                            <View style={{flexDirection: 'row', width: '100%'}}>
                                                                <TextInput style={styles.input} placeholder='Nombre(s)'/>
                                                                <TextInput style={styles.input} placeholder='Apellidos(s)' />
                                                            </View>
                                                        
                                                            <View style={{flexDirection: 'row', width: '80%'}}>
                                                                <TextInput style={styles.input} placeholder='Correo Electronico' keyboardType='email-address'/>
                                                                <TextInput style={styles.input} placeholder='Contraseña' />
                                                            </View>
                    
                                                            <View style={{flexDirection: 'row', width: '80%'}}>
                                                                <TextInput style={styles.input} placeholder='Ciudad'/>
                                                                <TextInput style={styles.input} placeholder='Telefono'/>
                                                            </View>
                    
                                                            <TouchableOpacity style={styles.boton} onPress={()=> Navigation.navigate('Login')}>
                                                                <Text style={styles.textoBtn}>
                                                                    Registrar
                                                                </Text>
                                                            </TouchableOpacity>
                    
                                                        </View>
                                                    </View>
                                                    
                                                </View>
                                            </View>
                                        </Modal>


                </View>
            </ScrollView>

        </View>
    )
}

export default Perfil

const styles = StyleSheet.create({ 
    tituloBold: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: '8%',
        marginTop: 30,
        color: '#1A1A1A'
    },   
    scroll:{
        width: '100%', // Asegura que el ScrollView ocupe todo el ancho
        height: '100vh', // Usa el 100% de la altura de la ventana para que se active el scroll
        backgroundColor: '#fffff3',
        paddingBottom: '15%',  // Ajusta el padding al final si es necesario
        overflowY: 'auto',
    },
    botonContainer:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '80%',
        alignSelf: 'center'
    },
    botonEditar:{
        marginHorizontal: 5,
        width: '20vh',
        height: 40,
        backgroundColor: '#446e3e',
        borderRadius: 10,
        boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    botonCerrar:{
        width: '20vh',
        height: 40,
        backgroundColor: '#e3298f',
        borderRadius: 10,
        boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textoBtn:{
        fontSize: 15,
        color: '#FFFFF3'
    },
    perfilContainer:{
        width: '80%',
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',

    },
    image:{
        width: '30vh',
        height: '30vh',
        borderRadius: 100,
        marginTop: '5vh'
    },
    nombreUsuario:{
        marginLeft: '5vh',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#1a1a1a'
    },
    containerDescripcion:{
        width: '80%',
        height: 'auto',
        marginLeft: '5vh',
    },
    descripcion:{
        fontSize: 15,
        color: '#1a1a1a'
    },
    informacionTitulo:{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#634455'
    },
    informacion:{
        fontSize: 15,
        color: '#634455'
    },
    modal:{
        height: '60vh',
        width: '60%',
        alignSelf: 'center',
        backgroundColor: 'red',
    },
    modalBackdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro
        justifyContent: 'center',
        alignItems: 'center',
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
    }
});