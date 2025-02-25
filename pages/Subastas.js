import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native'
import Navbar from '../components/Navbar'
import { FlatList, TextInput } from 'react-native-web'
import { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker';

//iconos
import Feather from '@expo/vector-icons/Feather';
import SubastaList from '../components/SubastaList'

const Subastas = () => {

    //Crear Producto Local
    const [listaSubastas, setListaSubastas] = useState([]);

    [nombre, setNombre] = useState('');
    [categoria, setCategoria] = useState('');
    [precio, setPrecio] = useState('');
    [tiempo, setTiempo] = useState('');
    [descripcion, setDescripcion] = useState('');
    [image, setImage] = useState('');

    const handleSubmit = () => {
        if (nombre == '' || precio == '' || tiempo == '' || descripcion == ''){
            alert('No se puede crear el producto')

            setNombre('');
            setCategoria('');
            setPrecio('');
            setTiempo('');
            setDescripcion('');
            setImage('');
        }else{
            const subasta = {nombre, precio, tiempo, descripcion, image}

            setListaSubastas(prevSubastas => [...prevSubastas, subasta])

            setNombre('');
            setCategoria('');
            setPrecio('');
            setTiempo('');
            setDescripcion('');
            setImage('');
        }
        
    }

    const handleDelete = (index) => {
        setListaSubastas(prevSubastas => prevSubastas.filter((_, i) => i !== index));
    }

    /* useEffect(() => {
        console.log(listaProductos);
    }, [listaProductos]); */ 

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
                    <Text style={styles.tituloBold}>CREAR SUBASTA</Text>
                    

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
                                    placeholder='Tiempo' 
                                    value={tiempo}
                                    onChangeText={setTiempo}
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

                                {image && <Image source={{ uri: image }} style={{width: '100%', height: '100%'}} resizeMode='contain'/>}
                                
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.boton} onPress={handleSubmit}>
                        <Text style={styles.textoBtn}>Crear Subasta</Text>
                    </TouchableOpacity>

                    <Text style={styles.tituloBold}>MIS SUBASTAS</Text>

                    
                    <View style={{marginVertical: '5vh'}}>


                        <FlatList
                        data={listaSubastas}
                        renderItem={({item, index}) => (
                            
                            <SubastaList
                            nombre={item.nombre}
                            precio={item.precio}
                            tiempo={item.tiempo}
                            descripcion={item.descripcion}
                            imageSource={item.image}
                            onDelete={() => handleDelete(index)}
                            />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        />

                    </View>
                    

                    
                
            </ScrollView>
            
        </View>
    )
}

export default Subastas

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
    }
})

