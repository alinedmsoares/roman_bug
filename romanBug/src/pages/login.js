import React, {Component} from "react";
import api from "../services/api";
import {View, AsyncStorage, TextInput, Image, Text, TouchableOpacity, StyleSheet} from "react-native";

class Login extends Component{
    static navigationOptions = {
        header: null
    };

    constructor(props){
        super(props);
        this.state = { emailUsuario: "", senhaUsuario: ""};
    }

    realizarLogin = async () => {
        const resposta = await api.post("/login", {
            emailUsuario: this.state.emailUsuario,
            senhaUsuario: this.state.senhaUsuario
        });

        const token = resposta.data.token;
        await AsyncStorage.setItem("userToken", token);
        this.props.navigation.navigate("ProjetosNavigator");
    };

    render(){
        return(
            <View style={styles.appBody}
            colors={['#448AFF', '#9E9E9E', '#FFEB3B', '#FF5722']}
            >
                <Image style={styles.loginImg}
                    source={require("../assets/img/icon_user.png")}
                />
                <Text style={styles.loginRoman}>Roman</Text>
                <TextInput style={styles.loginEmail}
                    underlineColorAndroid="#FFFFFF"
                    placeholderTextColor="white"
                    placeholder="Email: "
                    onChangeText={emailUsuario => this.setState({emailUsuario})}
                /> 
                <TextInput style={styles.loginSenha}
                    underlineColorAndroid="#FFFFFF"
                    placeholderTextColor="white"
                    placeholder="Senha: "
                    secureTextEntry={true}
                    onChangeText={senhaUsuario => this.setState({senhaUsuario})}
                />
                <TouchableOpacity
                style={styles.loginEntrar}
                    onPress={this.realizarLogin}
                >
                    <Text style={styles.loginLoginText}>Entrar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    appBody: {
        backgroundColor: "#311964",
        alignItems: "center",
        flex: 1,
        padding: 40,
    },
    loginImg: {
        borderColor: "#BEB2D7",
        borderWidth: 1 ,
        borderRadius: 400,
        width: 200,
        height: 200,
    },
    loginEmail: {
        margin: 8,
        fontSize: 18,
        width: 250,
        color: "white"
    },
    loginSenha: { 
        textDecorationColor: "#BEB2D7",
        margin: 8,
        fontSize: 18,
        width: 250,
        color: "white"

    },
    loginEntrar: {
        borderColor: "#BEB2D7",
        borderWidth: 1 ,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        width: 200,
        margin: 15,
        fontSize: 40,
        height: 45
    },
    loginRoman: {
        color: "#BEB2D7",
        margin: 10,
        fontSize: 40

    },
    loginLoginText: {
        color: "#BEB2D7",
        fontSize: 28,
        
    }

});
export default Login;