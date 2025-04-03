import React, {useState,useEffect, useCallback} from 'react'
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Modal,TextInput} from 'react-native'
import Navbar from '../components/Navbar'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect } from '@react-navigation/native';


const Perfil = () => {

    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState('');
    
    

    


    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const userToken = await AsyncStorage.getItem('userToken')
            const userId = await AsyncStorage.getItem('userId')
    
            console.log("userToken:", userToken) 
            console.log("userId:", userId) 
    
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
      }, [])

      if (loading) {
        
        return (
          <View style={styles.loadingContainer}>
            <Text>Cargando...</Text>
          </View>
        )
      }
    
      if (!userData) {
        
        return (
          <View style={styles.loadingContainer}>
            <Text>No se pudo obtener la información del usuario.</Text>
          </View>
        )
      }

      const uploadImageToCloudinary = async (image) => {
        const cloudName = "doptv8gka";
        const uploadPreset = "ml_default"; 
    
        let base64Img = image.split(',')[1]; 
        let data = {
            file: `data:image/jpeg;base64,${base64Img}`,
            upload_preset: uploadPreset
        };
    
        try {
            let response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
                
            });

    
            let result = await response.json();
            return result.secure_url; 
        } catch (error) {
            console.error("Error al subir la imagen a Cloudinary:", error);
            return null;
        }
    };
    
    const handleSubmit = async () => {

        if (!image) {
            Alert.alert('Error', 'Debes seleccionar una imagen');
            return;
        }
    
        try {
            const userId = await AsyncStorage.getItem('userId'); 
    
            if (!userId) {
                Alert.alert('Error', 'No se encontró el ID del usuario');
                return;
            }
    
            const imageUrl = await uploadImageToCloudinary(image);
            if (!imageUrl) {
                Alert.alert("Error", "No se pudo subir la imagen");
                return;
            }
    
            const formData = {
                id: userId,  
                image: imageUrl, 
            };
    
            console.log("Enviando datos:", formData);
    
            const response = await axios.put('http://iwo4c40ogk48wo48w844ow0s.31.170.165.191.sslip.io/imageupdate', formData); 
            setModalVisible(false);

            if (response.status === 200) {
                Alert.alert('Éxito', 'Imagen actualizada correctamente');
                setImage('');
            } else {
                throw new Error("Error al actualizar la imagen");
            }
    
        } catch (error) {
            console.error('no se subió', error.response ? error.response.data : error.message);
            Alert.alert('Error', 'No se pudo actualizar la imagen');
        }
    };
    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
            base64: true,
        });

        if (!result.canceled) {
            setImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
        }
    };


    return (
        
        <View style={{flex:1}}>
            <Navbar/>
            
            <ScrollView style={styles.scroll}>
            <Text style={styles.tituloBold}>MI PERFIL</Text>

                <View style={styles.botonContainer}>
                    <TouchableOpacity style={styles.botonEditar} onPress={() => setModalVisible(true)}>
                        <Text style={styles.textoBtn}>Editar Imagen de perfil</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.perfilContainer}>
                    <Image style={styles.image} source={userData.image ? { uri: userData.image } : require('../assets/icon.png')} />
                
                    
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
                            Información
                        </Text>
                        
                        { userData ? (
                        <Text style={styles.informacion}>• {userData.city} </Text>
                        ) : (
                        <Text> No hay direccion para mostrar </Text>
                        )}           
                        <Text style={styles.informacion}>
                            • {userData.phone}
                        </Text>
                        
                    </View>

                    </View>
                    <Modal visible={modalVisible} transparent animationType="fade">
                        <View style={styles.modalBackdrop}>
                            <View style={styles.modalContainer}>
                            <Text style={styles.modalTitle}>Cambiar Imagen de Perfil</Text>
                            
                            <TouchableOpacity style={[styles.modalButton, styles.modalSelectbtn]} onPress={pickImage}>
                                <Text style={styles.modalButtonText}>Seleccionar Imagen</Text>
                            </TouchableOpacity>
                            
                            {image && <Image source={{ uri: image }} style={styles.modalImage} />}
                            
                            <TouchableOpacity style={[styles.modalButton, styles.modalButtonGuardar]} onPress={handleSubmit}>
                                <Text style={styles.modalButtonText}>Guardar</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity style={[styles.modalButton, styles.modalButtonCancelar]} onPress={() => setModalVisible(false)}>
                                <Text style={styles.modalButtonText}>Cancelar</Text>
                            </TouchableOpacity>
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
        width: '100%', 
        height: '100vh', 
        backgroundColor: '#fffff3',
        paddingBottom: '15%',  
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
        width: '30vh',
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
    },
    //MODAAL ALV
        modalBackdrop: {
          flex: 3,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro semi-transparente
          justifyContent: 'center',
          alignItems: 'center',
        },
        modalContainer: {
          width: '40%',
          backgroundColor: '#fff',
          padding: 20,
          borderRadius: 15,
          alignItems: 'center',
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.3,
          shadowRadius: 10,
          elevation: 10,
        },
        modalTitle: {
          fontSize: 25,
          fontWeight: 'bold',
          marginBottom: 15,
          color: '#1A1A1A',
          textAlign: 'center',
        },
        modalImage: {
          width: 100,
          height: 100,
          borderRadius: 50,
          marginVertical: 15,
          borderWidth: 2,
          borderColor: '#446e3e',
        },
        modalButton: {
          width: '80%',
          height: 45,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 5,
        },
        modalButtonGuardar: {
          backgroundColor: '#446e3e',
        },
        modalButtonCancelar: {
          backgroundColor: '#e3298f',
        },
        modalButtonText: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#FFFFF3',
        },
        modalSelectbtn: {
            backgroundColor:'#634455',
        },
});