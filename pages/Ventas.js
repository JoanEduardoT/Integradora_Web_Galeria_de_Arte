import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Navbar from '../components/Navbar';
import VentaList from '../components/VentaList';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Categorias = () => {

    const [ventas, setVentas] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId'); // Obtener el ID del usuario
                const token = await AsyncStorage.getItem('userToken'); // Obtener el token

                console.log("UserToken:", token);
                console.log("UserId:", userId);

                if (userId && token) {
                    // Hacemos la solicitud al backend para obtener las ventas
                    const ventasResponse = await axios.get(`http://localhost:4000/sales/${userId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    setVentas(ventasResponse.data);
                    console.log("Datos:", ventasResponse.data) // Actualizamos el estado con las ventas obtenidas
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

    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFF3' }}>
            <Navbar/>

            <ScrollView style={styles.scroll}>
                <Text style={styles.titulo}>MIS VENTAS</Text>

                {ventas.length > 0 ? (
                    ventas.map((venta, index) => (
                        <VentaList
                            key={index}
                            nombre={venta.title || 'Nombre Producto'} // Asegúrate de acceder correctamente a los datos
                            cantidad={venta.total_price || 1} // Total de la venta o cantidad
                            comprador={venta.name || 'Fidel Orozco'} // Asumiendo que tienes un campo comprador
                            ciudad={venta.city || 'San Luis Rio Colorado'} // Ciudad
                            direccion={venta.address || 'Colima y 17'} // Dirección
                            imageSource={{ uri: venta.artworkid?.image || 'defaultImage.jpg' }} // Asegúrate de tener la imagen asociada
                        />
                    ))
                ) : (
                    <Text>No tienes ventas.</Text>
                )}
            </ScrollView>
        </View>
    );
};

export default Categorias;

const styles = StyleSheet.create({
    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: '8%',
        marginTop: 30,
        color: '#1A1A1A'
    },
    scroll: {
        width: '100%',
        backgroundColor: '#fffff3',
        paddingBottom: '15%',
    },
});
