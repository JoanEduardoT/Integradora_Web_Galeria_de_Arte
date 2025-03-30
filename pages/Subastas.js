import React,{useEffect,useState} from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native'
import Navbar from '../components/Navbar'
import { FlatList, TextInput } from 'react-native-web'
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


//iconos
import Feather from '@expo/vector-icons/Feather';
import SubastaList from '../components/SubastaList'

const Subastas = () => {

    //Crear Producto Local
    const [listaSubastas, setListaSubastas] = useState([]);

    [nombre, setNombre] = useState('');
    [precio, setPrecio] = useState('');
    [tiempo, setTiempo] = useState('');
    [descripcion, setDescripcion] = useState('');
    [image, setImage] = useState('');
    [loading, setLoading] = useState(true); 
   
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId'); // Obtener el ID del usuario
                const token = await AsyncStorage.getItem('userToken'); // Obtener el token

                console.log("UserToken:",token);
                console.log("UserId:", userId);

                if (userId && token) {
                    const subastasResponse = await axios.get(`http://iwo4c40ogk48wo48w844ow0s.31.170.165.191.sslip.io/auctions/${userId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setListaSubastas(subastasResponse.data);
                    console.log(subastasResponse.data)
                }
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            } finally {
                setLoading(false); 
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Text>Cargando...</Text>; // Mostrar texto de carga mientras se obtienen los datos
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
                headers: { "Content-Type": "application/json" }
            });
    
            let result = await response.json();
            return result.secure_url; // URL de la imagen subida
        } catch (error) {
            console.error("Error al subir la imagen a Cloudinary:", error);
            return null;
        }
    };

    
     //Creacion Producto
     const handleSubmit = async () => {
        if (nombre === '' || precio === '' || tiempo === '' || descripcion === '' || !image) {
            Alert.alert('Error', 'Todos los campos son obligatorios');
            return;
        }
    
        try {
            const userId = await AsyncStorage.getItem('userId'); // Obtener el ID del usuario
    
            if (!userId) {
                Alert.alert('Error', 'No se encontró el ID del usuario');
                return;
            }
            
            const imageUrl = await uploadImageToCloudinary(image);
                        if (!imageUrl) {
                            Alert.alert("Error", "No se pudo subir la imagen");
                            return;
                        }
            console.log(imageUrl)            
            const formData = {
                title: nombre,
                descripcion: descripcion,
                image: imageUrl, 
                currentBid:parseFloat(precio),
                artistid: userId,  
                endedtime:tiempo
            };
    
            const response = await axios.post('http://iwo4c40ogk48wo48w844ow0s.31.170.165.191.sslip.io/Addactions', formData);
            console.log("datos enviados:", formData);
            console.log('Producto registrado:', response.data);
            Alert.alert('Éxito', 'Producto registrado correctamente');
    
            setListaSubastas(prevSubastas => [...prevSubastas, formData]);
    
            // Limpiar los inputs
            setNombre('');
            setPrecio('');
            setTiempo('');
            setDescripcion('');
            setImage('');
    
        } catch (error) {
            console.error('Error al registrar el producto:', error.response ? error.response.data : error.message);
            Alert.alert('Error', 'No se pudo registrar el producto');
        }
    };
    
    

    const handleDelete = (index) => {
        setListaSubastas(prevSubastas => prevSubastas.filter((_, i) => i !== index));
    }

    /* useEffect(() => {
        console.log(listaProductos);
    }, [listaProductos]); */ 


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
                    <Text style={styles.tituloBold}>CREAR SUBASTA</Text>
                    

                    <View style={{ flexDirection: 'row', width: '80%', alignSelf: 'center', marginVertical: '5vh', }}>
                        <View style={{width: '80%'}}>
                            
                                <TextInput style={styles.input} 
                                placeholder='Nombre del Producto' 
                                value={nombre}
                                onChangeText={setNombre}
                                placeholderTextColor={'#634455'}/>

                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    
                                <TextInput
                                    style={styles.inputDoble}
                                    placeholder="Precio (MXN)"
                                    value={precio}
                                    onChangeText={(text) => {
                                        const numericText = text.replace(/[^0-9.]/g, ''); // Permitir solo números y punto decimal
                                        setPrecio(numericText);
                                    }}
                                    keyboardType="numeric"
                                    placeholderTextColor={'#634455'}
                                />


                                    <TextInput
                                        style={styles.inputDoble}
                                        placeholder="AAAA-MM-DD"
                                        value={tiempo}
                                        onChangeText={(text) => {
                                            let cleaned = text.replace(/[^0-9]/g, ''); // Eliminar caracteres no numéricos
                                            let formatted = '';

                                            if (cleaned.length > 4) {
                                                formatted = `${cleaned.slice(0, 4)}-${cleaned.slice(4, 6)}`;
                                            } else {
                                                formatted = cleaned;
                                            }
                                            if (cleaned.length > 6) {
                                                formatted += `-${cleaned.slice(6, 8)}`;
                                            }

                                            setTiempo(formatted);
                                        }}
                                        keyboardType="numeric"
                                        maxLength={10} // Para evitar que se ingresen más caracteres de los necesarios
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
                            nombre={item.title}
                            precio={item.currentBid}
                            tiempo={new Date(item.endedtime).toLocaleString('es-MX', {
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                            imageSource={{uri: item.image}}
                            descripcion={item.descripcion}
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

