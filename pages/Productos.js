import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native'
import Navbar from '../components/Navbar'
import { FlatList, TextInput } from 'react-native-web'
import { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker';
import ProductList from '../components/ProductList'
import ProductCard from '../components/ProductCard'

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
    [categoria, setCategoria] = useState('');
    [precio, setPrecio] = useState('');
    [cantidad, setCantidad] = useState('');
    [descripcion, setDescripcion] = useState('');
    [image, setImage] = useState('');

    //Creacion Producto
    const handleSubmit = () => {
        if (nombre == '' || precio == '' || cantidad == '' || descripcion == ''){
            alert('No se puede crear el producto')

            setNombre('');
            setCategoria('');
            setPrecio('');
            setCantidad('');
            setDescripcion('');
            setImage('');
        }else{
            const producto = {nombre, categoria, precio, cantidad, descripcion, image}

            setListaProductos(prevProductos => [...prevProductos, producto])

            setNombre('');
            setCategoria('');
            setPrecio('');
            setCantidad('');
            setDescripcion('');
            setImage('');
        }
        
    }

    const handleDelete = (index) => {
        setListaProductos(prevProductos => prevProductos.filter((_, i) => i !== index));
    }


    //ImagePicker
    const handleImagePickerPress = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
        quality: 1,})

        if (!result.canceled){
            setImage(result.assets[0].uri)
        }
    }


    return (
        <View style={{flex:1}}>
            <Navbar/>

            <ScrollView style={styles.scroll}>
                    <Text style={styles.tituloBold}>CREAR PRODUCTOS</Text>

                    <View style={{ flexDirection: 'row', width: '80%', alignSelf: 'center', marginVertical: '5vh', }}>
                        <View style={{width: '80%'}}>
                            
                                <TextInput style={styles.input} 
                                placeholder='Nombre del Producto' 
                                value={nombre}
                                onChangeText={setNombre}
                                placeholderTextColor={'#634455'}/>

                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    
                                    <TextInput style={styles.inputDoble} 
                                    placeholder='Precio (MXN)' 
                                    value={precio}
                                    onChangeText={setPrecio}
                                    placeholderTextColor={'#634455'}/>

                                    <TextInput style={styles.inputDoble} 
                                    placeholder='Cantidad' 
                                    value={cantidad}
                                    onChangeText={setCantidad}
                                    placeholderTextColor={'#634455'}/>
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
                                    nombre={item.nombre}
                                    precio={item.precio}
                                    cantidad={item.cantidad}
                                    categoria={'Pendiente'}
                                    descripcion={item.descripcion}
                                    imageSource={item.image}
                                    onDelete={() => handleDelete(index)}
                                />
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    )}

                    {vista === 'Mosaico' && listaProductos.map((item, index)=> (
                        <ProductCard 
                            nombre={item.nombre}
                            precio={item.precio}
                            cantidad={item.cantidad}
                            categoria={'Pendiente'}
                            imageSource={item.image}
                            onDelete={() => handleDelete(index)}/>
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

