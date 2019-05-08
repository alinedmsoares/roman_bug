import React, {Component} from "react";
import api from "./src/services/api";
import {View, AsyncStorage, TextInput, Image, Text, TouchableOpacity} from "react-native";

class Login extends Component{
    static navigationOptions = {
        header: null
    };

    constructor(props){
        super(props);
        this.state = { emailUsuario: "", senhaUsuario: ""};
    }

    realizarLogin = async () => {
        const resposta = await api.post("/login",{
            emailUsuario: this.state.emailUsuario,
            senhaUsuario: this.state.senhaUsuario
        });

        const token = resposta.data.token;
        await AsyncStorage.setItem("userToken", token);
        this.props.navigation.navigate("MainNavigator");
    };

    render(){
        return(
            <View>
                <Image 
                    source={require("./src/assets/img/icon_user.png")}
                />
                <TextInput
                    placeholder="Email: "
                    onChangeText={emailUsuario => this.setState({emailUsuario})}
                />
                <TextInput
                    placeholder="Senha: "
                    onChangeText={senhaUsuario => this.setState({senhaUsuario})}
                />
                <TouchableOpacity
                    onPress={this.realizarLogin}
                >
                    <Text>Login</Text>
                </TouchableOpacity>

            </View>
        )
    }
}
export default Login;