import React from 'react'
import {View, Text, ScrollView, StyleSheet, TouchableHighlight} from 'react-native'
import Navbar from '../components/Navbar'
import { useFonts } from 'expo-font'
import { useNavigation } from '@react-navigation/native';
import ProductContainer from '../components/ProductContainer';
import SubastaContainer from '../components/SubastaContainer';
import VentaContainer from '../components/VentaContainer';

//iconos
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Dashboard = () => {

    const navigation = useNavigation()

    //Fuentes Personalizadas
    const [fontsLoaded] = useFonts({
        MadeTommy: require('../assets/fonts/MADE TOMMY Regular_PERSONAL USE.otf'),
        MadeTommyBold: require('../assets/fonts/MADE TOMMY Bold_PERSONAL USE.otf'),
        MalgunGothic: require('../assets/fonts/malgun-gothic.ttf'),
    });

    

    return (
        <View style={{flex:1}}>
            <Navbar/>

            <ScrollView style={styles.scroll}>
            {/* <View style={{backgroundColor: '#fffff3'}}> */}
                <Text style={styles.tituloBold}>DASHBOARD</Text>
                

                <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginLeft:'8%', marginBottom: 30}}>
                    <Text style={styles.tituloBold2}>Bienvenido, </Text>
                    <Text style={styles.tituloRegular}>Nombre Usuario!</Text>
                </View>

                <View style={styles.boxContainer}>

                    <View style={styles.dashboardContainer}>
                        
                        <TouchableHighlight style={styles.tituloProductosContainer} onPress={()=> navigation.navigate('Productos')}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '80%' , alignItems: 'center'}}>
                                <Text style={{fontSize: 20, color: 'white'}}>Mis Productos</Text>
                                <MaterialIcons name="navigate-next" size={40} color="white" />
                            </View>
                            
                        </TouchableHighlight>

                        <ScrollView  style={styles.scrollContainer} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                            <ProductContainer nombre="Nombre Producto" cantidad={10} imageSource={require('../assets/producto.jpg')}/>
                            <ProductContainer nombre="Nombre Producto" cantidad={1} imageSource={require('../assets/producto3.jpg')}/>
                            <ProductContainer nombre="Nombre Producto" cantidad={20} imageSource={require('../assets/producto4.jpg')}/>
                            <ProductContainer nombre="Nombre Producto" cantidad={2} imageSource={require('../assets/producto5.jpg')}/>
                            <ProductContainer nombre="Nombre Producto" cantidad={16} imageSource={require('../assets/producto2.jpeg')}/>
                        </ScrollView>

                        
                    </View>

                    <View style={styles.dashboardContainer}>
                        <TouchableHighlight style={styles.tituloSubastasContainer} onPress={()=> navigation.navigate('Subastas')}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '80%' , alignItems: 'center'}}>
                                <Text style={{fontSize: 20, color: 'white'}}>Mis Subastas</Text>
                                <MaterialIcons name="navigate-next" size={40} color="white" />
                            </View>
                            
                        </TouchableHighlight>

                        <ScrollView  style={styles.scrollContainer} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                            <SubastaContainer nombre="Nombre Producto" oferta={150} tiempo={'05:22'} imageSource={require('../assets/producto.jpg')}/>
                            <SubastaContainer nombre="Nombre Producto" oferta={1200} tiempo={'23:05'} imageSource={require('../assets/producto3.jpg')}/>
                            <SubastaContainer nombre="Nombre Producto" oferta={270} tiempo={'10:36'} imageSource={require('../assets/producto4.jpg')}/>
                            <SubastaContainer nombre="Nombre Producto" oferta={530} tiempo={'24:43:10'} imageSource={require('../assets/producto5.jpg')}/>
                            <SubastaContainer nombre="Nombre Producto" oferta={970} tiempo={'1:10:9'} imageSource={require('../assets/producto2.jpeg')}/>

                        </ScrollView>

                        
                    </View>

                    <View style={styles.dashboardContainer}>
                        <TouchableHighlight style={styles.tituloVentasContainer} onPress={()=> navigation.navigate('Ventas')}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '80%', alignItems: 'center'}}>
                                <Text style={{fontSize: 20, color: 'white'}}>Ventas</Text>
                                <MaterialIcons name="navigate-next" size={40} color="white" />
                            </View>
                            
                        </TouchableHighlight>

                        <ScrollView  style={styles.scrollContainer} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                            <VentaContainer nombre="Nombre Producto" cantidad={10} imageSource={require('../assets/producto.jpg')}/>
                            <VentaContainer nombre="Nombre Producto" cantidad={1} imageSource={require('../assets/producto3.jpg')}/>
                            <VentaContainer nombre="Nombre Producto" cantidad={20} imageSource={require('../assets/producto4.jpg')}/>
                            <VentaContainer nombre="Nombre Producto" cantidad={2} imageSource={require('../assets/producto5.jpg')}/>
                            <VentaContainer nombre="Nombre Producto" cantidad={16} imageSource={require('../assets/producto2.jpeg')}/>
                        </ScrollView>
                        
                    </View>
                </View>

            {/* </View> */}
            </ScrollView>

        </View>
    )
}

export default Dashboard

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
    scroll:{
        width: '100%', // Asegura que el ScrollView ocupe todo el ancho
        height: '100vh', // Usa el 100% de la altura de la ventana para que se active el scroll
        backgroundColor: '#fffff3',
        paddingBottom: '15%',  // Ajusta el padding al final si es necesario
        overflowY: 'auto',
    },
    boxContainer:{
        width: '85%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center'
    },
    dashboardContainer:{
        width: '30%', 
        height: '60vh',
        paddingBottom: '1%',
        marginHorizontal: 10,
        borderRadius: 20,
        backgroundColor: '#FFF9F9',
        borderRadius: 20,
        boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)'
    },
    tituloProductosContainer:{
        height: 70,
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#e3298f',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tituloSubastasContainer:{
        height: 70,
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#1a1a1a',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tituloVentasContainer:{
        height: 70,
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#44634e',
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollContainer:{
        width: '95%',
        alignSelf: 'center',
        paddingVertical: 5
    }

    
});