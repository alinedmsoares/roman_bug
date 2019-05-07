import React, { Component } from 'react';
import { StyleSheet, Text, View } from "react-native"
import LinearGradient from 'react-native-linear-gradient';

class Projetos extends Component {
    // static navigationOptions = {
    //     tabBarIcon : ({tintColor}) => (
    //         <Image
    //         source={require("../assets/img/icon-home.png")}
    //         style={StyleSheet.tabNavigatorIconHome}
    //         />
    //     )
    // };

    // constructor(props){
    //     super(props);
    //     this.state = {
    //         listaProjetos:[]
    //     };
    // }
    // componentDidMount(){
    //     this.carreagarProjetos();
    // }

    // carreagarProjetos = async() =>{
    //     const resposta = await applicationCache.get("/projetos");
    //     const dadosDaApi = resposta.data;
    //     this.setState({listaProjetos:dadosDaApi});
    // };

    render() {
        return (
                <View style={styles.body}>
                    <Text style={styles.welcome}>Funcionei!</Text>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});
export default Projetos;