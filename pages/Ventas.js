import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import Navbar from '../components/Navbar'
import VentaList from '../components/VentaList'

const Categorias = () => {


    return (
        <View style={{ flex:1, backgroundColor: '#FFFFF3'}}>
            <Navbar/>

            <ScrollView style={styles.scroll}>

                    <Text style={styles.titulo}>MIS VENTAS</Text>
                    
                    <View style={{marginBottom: '5vh'}}> </View>
                    <VentaList nombre={'Nombre Producto'} cantidad={1} comprador={'Fidel Orozco'} ciudad={'San Luis Rio Colorado'}
                    direccion={'Colima y 17'} imageSource={require('../assets/producto5.jpg')}/>

                    <VentaList nombre={'Nombre Producto'} cantidad={1} comprador={'Fidel Orozco'} ciudad={'San Luis Rio Colorado'}
                    direccion={'Colima y 17'} imageSource={require('../assets/producto.jpg')}/>

                    <VentaList nombre={'Nombre Producto'} cantidad={1} comprador={'Fidel Orozco'} ciudad={'San Luis Rio Colorado'}
                    direccion={'Colima y 17'} imageSource={require('../assets/producto2.jpeg')}/>

                    <VentaList nombre={'Nombre Producto'} cantidad={1} comprador={'Fidel Orozco'} ciudad={'San Luis Rio Colorado'}
                    direccion={'Colima y 17'} imageSource={require('../assets/producto3.jpg')}/>
                
            </ScrollView>
            
        </View>
    )
}

export default Categorias

const styles = StyleSheet.create({
    titulo: {
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
})
