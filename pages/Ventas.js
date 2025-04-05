import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
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
                const userId = await AsyncStorage.getItem('userId'); 
                const token = await AsyncStorage.getItem('userToken'); 

                if (userId && token) {
                    const ventasResponse = await axios.get(`http://iwo4c40ogk48wo48w844ow0s.31.170.165.191.sslip.io/sales/${userId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    setVentas(ventasResponse.data);
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
        return <Text style={styles.loadingText}>Cargando...</Text>; 
    }

    return (
        <SafeAreaView style={styles.container}>
            <Navbar />

            <ScrollView 
                style={styles.scroll} 
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.titulo}>MIS VENTAS</Text>

                {ventas.length > 0 ? (
                    ventas.map((venta, index) => (
                        <VentaList
                            key={index}
                            nombre={venta.artworkTitle || 'Nombre Producto'}
                            cantidad={venta.total_price || 1}
                            comprador={venta.buyerName || 'Fidel Orozco'}
                            ciudad={venta.buyerCity || 'San Luis Rio Colorado'}
                            direccion={venta.buyerAddress || 'Colima y 17'}
                            imageSource={{ uri: venta.artworkImage || 'defaultImage.jpg' }}
                        />
                    ))
                ) : (
                    <Text style={styles.noVentas}>No tienes ventas.</Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default Categorias;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFF3',
    },
    scroll: {
        height: '100vh',
        overflowY: 'auto',
        width: '100%',
        backgroundColor: '#FFFFF3',
        paddingBottom: 100
    },
    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: '8%',
        marginTop: 30,
        color: '#1A1A1A',
    },
    noVentas: {
        marginLeft: '8%',
        marginTop: 40,
    },
    loadingText: {
        textAlign: 'center',
        marginTop: 20,
    },
});

