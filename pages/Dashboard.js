import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import Navbar from '../components/Navbar';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import ProductContainer from '../components/ProductContainer';
import SubastaContainer from '../components/SubastaContainer';
import VentaContainer from '../components/VentaContainer';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = () => {
    const navigation = useNavigation();
    const [productos, setProductos] = useState([]);
    const [subastas, setSubastas] = useState([]);
    const [ventas, setVentas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null)
    

    // Cargar fuentes personalizadas
    const [fontsLoaded] = useFonts({
        MadeTommy: require('../assets/fonts/MADE TOMMY Regular_PERSONAL USE.otf'),
        MadeTommyBold: require('../assets/fonts/MADE TOMMY Bold_PERSONAL USE.otf'),
        MalgunGothic: require('../assets/fonts/malgun-gothic.ttf'),
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId'); // Obtener el ID del usuario
                const token = await AsyncStorage.getItem('userToken'); // Obtener el token

                console.log("UserToken:",token);
                console.log("UserId:", userId);

                if (userId && token) {
                    // Llamadas a la API con el userId y token
                    const productosResponse = await axios.get(`http://iwo4c40ogk48wo48w844ow0s.31.170.165.191.sslip.io/products/${userId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setProductos(productosResponse.data);

                    const subastasResponse = await axios.get(`http://iwo4c40ogk48wo48w844ow0s.31.170.165.191.sslip.io/auctions/${userId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setSubastas(subastasResponse.data);

                    const ventasResponse = await axios.get(`http://iwo4c40ogk48wo48w844ow0s.31.170.165.191.sslip.io/sales/${userId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setVentas(ventasResponse.data);

                    const response = await axios.get(`http://iwo4c40ogk48wo48w844ow0s.31.170.165.191.sslip.io/user/${userId}`, {
                        headers: {
                          Authorization: `Bearer ${token}`, // En caso de usar JWT o algún token
                        },
                      })
              
                      console.log(response.data[0])
                      setUserData(response.data[0])

                }
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            } finally {
                setLoading(false); // Finaliza el loading después de las solicitudes
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Text>Cargando...</Text>; // Mostrar texto de carga mientras se obtienen los datos
    }

    return (
        <View style={{ flex: 1 }}>
            <Navbar />

            <ScrollView style={styles.scroll}>
                <Text style={styles.tituloBold}>Inicio</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginLeft: '8%', marginBottom: 30 }}>
                    <Text style={styles.tituloBold2}>Bienvenido, </Text>
                    <Text style={styles.tituloRegular}>{userData.name} {userData.lastname}!</Text> {/* Aquí puedes mostrar el nombre del usuario si lo tienes */}
                </View>

                <View style={styles.boxContainer}>
                    {/* Mis Productos */}
                    <View style={styles.dashboardContainer}>
                        <TouchableHighlight style={styles.tituloProductosContainer} onPress={() => navigation.navigate('Productos')}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', alignItems: 'center' }}>
                                <Text style={{ fontSize: 20, color: 'white' }}>Mis Productos</Text>
                                <MaterialIcons name="navigate-next" size={40} color="white" />
                            </View>
                        </TouchableHighlight>

                        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                            {productos.length > 0 ? (
                                productos.map((producto, index) => (
                                    <ProductContainer
                                        key={index}
                                        nombre={producto.title}
                                        cantidad={producto.firstprice} // Ajusta según tu modelo de datos
                                        imageSource={{ uri: producto.image }} // Suponiendo que tienes la URL de la imagen
                                    />
                                ))
                            ) : (
                                <Text style={{margin: 15}}>No tienes productos.</Text>
                            )}
                        </ScrollView>
                    </View>

                    {/* Mis Subastas */}
                    <View style={styles.dashboardContainer}>
                        <TouchableHighlight style={styles.tituloSubastasContainer} onPress={() => navigation.navigate('Subastas')}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', alignItems: 'center' }}>
                                <Text style={{ fontSize: 20, color: 'white' }}>Mis Subastas</Text>
                                <MaterialIcons name="navigate-next" size={40} color="white" />
                            </View>
                        </TouchableHighlight>

                        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                            {subastas.length > 0 ? (
                                subastas.map((subasta, index) => (
                                    <SubastaContainer
                                        key={index}
                                        nombre={subasta.title} 
                                        oferta={subasta.currentBid}
                                        tiempo={new Date(subasta.endedtime).toLocaleString('es-MX', {
                                            year: 'numeric',
                                            month: 'numeric',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                        imageSource={{ uri: subasta.image }} 
                                    />
                                ))
                            ) : (
                                <Text style={{margin: 15}}>No tienes subastas.</Text>
                            )}
                        </ScrollView>
                    </View>

                    {/* Mis Ventas */}
                    <View style={styles.dashboardContainer}>
                        <TouchableHighlight style={styles.tituloVentasContainer} onPress={() => navigation.navigate('Ventas')}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', alignItems: 'center' }}>
                                <Text style={{ fontSize: 20, color: 'white' }}>Mis Ventas</Text>
                                <MaterialIcons name="navigate-next" size={40} color="white" />
                            </View>
                        </TouchableHighlight>

                        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                            {ventas.length > 0 ? (
                                ventas.map((venta, index) => (
                                    <VentaContainer
                                        key={index}
                                        nombre={venta.artworkTitle || 'no se encontró el nombre'} 
                                        cantidad={venta.total_price || 1}
                                        comprador={venta.buyerName || 'Anonimo'} 
                                        ciudad={venta.buyerCity || 'San Luis Rio Colorado'}
                                        direccion={venta.buyerAddress || 'sin dirección'} 
                                        imageSource={{ uri: venta.artworkImage || 'defaultImage.jpg' }}
                                    />
                                ))
                            ) : (
                                <Text style={{margin: 15}}>No tienes ventas.</Text>
                            )}
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Dashboard;

const styles = StyleSheet.create({ 
    tituloBold: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: '8%',
        marginTop: 30,
        color: '#1A1A1A'
    },
    tituloBold2: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1A1A1A'
    },
    tituloRegular: {
        fontSize: 20,
        color: '#1A1A1A'
    },
    scroll: {
        width: '100%',
        height: '100vh',
        backgroundColor: '#fffff3',
        paddingBottom: '15%',
        overflowY: 'auto',
    },
    boxContainer: {
        width: '85%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center'
    },
    dashboardContainer: {
        width: '30%',
        height: '60vh',
        paddingBottom: '1%',
        marginHorizontal: 10,
        borderRadius: 20,
        backgroundColor: '#FFF9F9',
        boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)'
    },
    tituloProductosContainer: {
        height: 70,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#e3298f',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tituloSubastasContainer: {
        height: 70,
        backgroundColor: '#1a1a1a',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tituloVentasContainer: {
        height: 70,
        backgroundColor: '#44634e',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollContainer: {
        width: '95%',
        alignSelf: 'center',
        paddingVertical: 5
    }
});

