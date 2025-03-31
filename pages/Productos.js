import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native'
import Navbar from '../components/Navbar'
import { FlatList, TextInput } from 'react-native-web'
import { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import ProductList from '../components/ProductList';
import ProductCard from '../components/ProductCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

import {Picker} from '@react-native-picker/picker';


//iconos
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Productos = () => {

    //Modo de vista
    [vista, setVista] = useState('Lista');

    const handleVista = (tipo) => {
        console.log('Cambiando vista a:', tipo);  // Para ver si se cambia correctamente
        setVista(tipo);
    }

    //Crear Producto Local
    [listaProductos, setListaProductos] = useState([]);
    [nombre, setNombre] = useState('');
    [categoria, setCategoria] = useState('1');
    [precio, setPrecio] = useState('');
    [descripcion, setDescripcion] = useState('');
    [image, setImage] = useState('');

    //Mostrar Productos
    const fetchProductos = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId'); // Obtener el ID del usuario
            const token = await AsyncStorage.getItem('userToken'); // Obtener el token
            
            console.log("UserToken:",token);
            console.log("UserId:", userId);

            const response = await axios.get(`http://iwo4c40ogk48wo48w844ow0s.31.170.165.191.sslip.io/products/${userId}`,{
                headers: { Authorization: `Bearer ${token}` },
            });// Asegúrate de que el backend está corriendo
            setListaProductos(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    };

    // Llamar a la API cuando se carga el componente
    useEffect(() => {
        fetchProductos();
    }, []);

    //Creacion Producto

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
                headers: { "Content-Type": "application/json" }
            });
    
            let result = await response.json();
            return result.secure_url; // URL de la imagen subida
        } catch (error) {
            console.error("Error al subir la imagen a Cloudinary:", error);
            return null;
        }
    };

    const handleSubmit = async () => {
        if (!nombre || !precio || !descripcion || !categoria || !image) {
            Alert.alert("Error", "Todos los campos son obligatorios");
            return;
        }
    
        try {
            const userId = await AsyncStorage.getItem("userId");
            if (!userId) {
                Alert.alert("Error", "No se encontró el ID del usuario");
                return;
            }
    
            const imageUrl = await uploadImageToCloudinary(image);
            if (!imageUrl) {
                Alert.alert("Error", "No se pudo subir la imagen");
                return;
            }
    
            const formData = {
                artwork_type: "Directa",
                title: nombre,
                descripcion: descripcion,
                image: imageUrl, 
                firstprice: parseFloat(precio),
                artistid: userId,
                categoriaid: categoria
            };
    
            const response = await axios.post("http://iwo4c40ogk48wo48w844ow0s.31.170.165.191.sslip.io/Addartworks", formData);
            console.log("Producto registrado:", response.data);
            Alert.alert("Éxito", "Producto registrado correctamente");
            
            setListaProductos(prevProductos => [...prevProductos, formData]);
            setNombre("");
            setCategoria("");
            setPrecio("");
            setDescripcion("");
            setImage(null); 
        } catch (error) {
            console.error("Error al registrar el producto:", error.response ? error.response.data : error.message);
            Alert.alert("Error", "No se pudo registrar el producto");
        }
    };
    
    

    const handleDelete = (index) => {
        setListaProductos(prevProductos => prevProductos.filter((_, i) => i !== index));
    }


    //ImagePicker
    const handleImagePickerPress = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            quality: 1,
            allowsEditing: true,
            base64: true // Activar conversión automática a Base64
        });
    
        if (!result.canceled) {
            setImage(`data:image/jpeg;base64,${result.assets[0].base64}`); // Guardar en estado
        }
    };
   
    


    return (
        <View style={{flex:1}}>
            <Navbar/>

            <ScrollView style={styles.scroll}>
                    <Text style={styles.tituloBold}>CREAR PRODUCTOS</Text>

                    <View style={{ flexDirection: 'row', width: '80%', alignSelf: 'center', marginVertical: '5vh', }}>
                        <View style={{width: '80%'}}>
                            
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    
                                    <TextInput style={styles.inputDoble} 
                                    placeholder='Nombre Del Producto' 
                                    value={nombre}
                                    onChangeText={setNombre}
                                    placeholderTextColor={'#634455'}/>

                                    <Picker
                                    style={styles.selectDoble}
                                    selectedValue={categoria}
                                    selectionColor={'#634455'}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setCategoria(itemValue)
                                    }>
                                        <Picker.Item label="Pintura" value="1" />
                                        <Picker.Item label="Escultura" value="2" />
                                        <Picker.Item label="Fotografia" value="3" />
                                        <Picker.Item label="Arte Digital" value="4" />
                                        <Picker.Item label="Instalacion" value="5" />
                                    </Picker>


                                </View>
                            
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    
                                <TextInput
                                    style={styles.input}
                                    placeholder="Precio (MXN)"
                                    value={precio}
                                    onChangeText={(text) => {
                                        const numericText = text.replace(/[^0-9.]/g, ''); // Permitir solo números y punto decimal
                                        setPrecio(numericText);
                                    }}
                                    keyboardType="numeric"
                                    placeholderTextColor={'#634455'}
                                />


                                    
                                </View>


                            <TextInput multiline={true} 
                            style={styles.inputDescripcion} 
                            placeholder='Descripcion' 
                            value={descripcion}
                            onChangeText={setDescripcion}
                            placeholderTextColor={'#634455'}/>                      
                        </View>

                        <View style={{width: '20%'}}>
                            <TouchableOpacity style={styles.imagePickerBtn} onPress={handleImagePickerPress}>

                                {!image && <View style={{alignItems:'center'}}>
                                    
                                <Feather name="upload" size={24} color="#634455" />
                                <Text style={{color: '#634455'}}>Cargar Imagen</Text>
                                
                                </View>}

                                {image && <Image source={{ uri: image }} style={{width: '100%', height: '100%', resizeMode: 'contain'}}/>}
                                
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.boton} onPress={handleSubmit}>
                        <Text style={styles.textoBtn}>Crear Producto</Text>
                    </TouchableOpacity>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={styles.tituloBold}>MIS PRODUCTOS</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginRight: '8%'}}>
                            
                            <TouchableOpacity style={styles.botonVistaMosaico} onPress={()=> handleVista('Mosaico')}>
                                <MaterialCommunityIcons name="view-grid" size={24} color="white" />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.botonVistaLista} onPress={()=> handleVista('Lista')}>
                                <MaterialCommunityIcons name="format-list-bulleted" size={24} color="white" />
                            </TouchableOpacity>

                        </View>
                    </View>
                    

                    
                    <View style={{width: '80%', marginVertical: '5vh', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', alignSelf: 'center'}}>
                    
                    {vista === 'Lista' && (
                        <FlatList
                            data={listaProductos}
                            renderItem={({item, index}) => (
                                <ProductList
                                nombre={item.title}
                                precio={item.firstprice}
                                descripcion={item.descripcion}
                                imageSource={{uri: item.image}}
                                onDelete={() => handleDelete(index)}
                            />
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    )}

                    {vista === 'Mosaico' && listaProductos.map((item, index)=> (
                        <ProductCard 
                        nombre={item.title}
                        precio={item.firstprice}
                        descripcion={item.descripcion}
                        imageSource={{uri: item.image}}
                        onDelete={() => handleDelete(index)}
                            />
                            
                    ))}

                    </View>
                    

                    
                
            </ScrollView>
            
        </View>
    )
}

export default Productos



const styles = StyleSheet.create({
    scroll:{
        width: '100%', // Asegura que el ScrollView ocupe todo el ancho
        height: '100vh', // Usa el 100% de la altura de la ventana para que se active el scroll
        backgroundColor: '#fffff3',
        paddingBottom: '15%',  // Ajusta el padding al final si es necesario
        overflowY: 'auto',
    },
    tituloBold: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: '8%',
        marginTop: 30,
        color: '#1A1A1A'
    },
    containerForm:{
        width: '80%',
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: '5vh',
        backgroundColor: '#FFF9F9',
        padding: 30,
        borderRadius: 50,
        boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)',

    },
    inputGroup:{
        flexDirection: 'row',
        justifyContent: 'space-between'
        
    },
    input:{
        backgroundColor: '#FFF9F9',
        width: '100%',
        height: 60,
        paddingHorizontal: 20,
        marginBottom: 20,
        borderRadius: 10,
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)',
    },
    inputDoble:{
        backgroundColor: '#FFF9F9',
        width: '49%',
        height: 60,
        paddingHorizontal: 20,
        marginBottom: 20,
        borderRadius: 10,
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)',
    },
    selectDoble:{
        backgroundColor: '#FFF9F9',
        borderColor: 'transparent',
        width: '49%',
        height: 60,
        paddingHorizontal: 20,
        marginBottom: 20,
        borderRadius: 10,
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)',
    },
    inputDescripcion:{
        padding: 10,
        backgroundColor: '#FFF9F9',
        width: '100%',
        height: 100,
        paddingHorizontal: 20,
        marginRight: 20,
        borderRadius:10,
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)', 
    },
    imagePickerBtn:{
        padding: 10,
        backgroundColor: '#FFF9F9',
        flex: 1,
        width: '100%',
        paddingHorizontal: 20,
        marginHorizontal: 20,
        borderRadius:10,
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    boton:{
        marginTop: 5,
        width: '20vh',
        height: 50,
        backgroundColor: '#e3298f',
        borderRadius: 10,
        boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    textoBtn:{
        fontSize: 15,
        color: '#FFFFF3'
    },
    botonVistaMosaico:{
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: '#634455',
        width: 50,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    botonVistaLista:{
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#634455',
        width: 50,
        height: 30,
        marginLeft: 2,
        justifyContent: 'center',
        alignItems: 'center'
    }
})



