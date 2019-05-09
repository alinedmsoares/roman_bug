import React from 'react';
import { Component } from 'react';
import style from 'react';
import { StyleSheet, Text, View, FlatList, Picker, TouchableOpacity, TextInput } from "react-native";
import api from "../romanBug/src/services/api";
import jwt from "jwt-decode";

class Projetos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listaProjetos: [],
            listaProfessores: [],
            listaTemas: [],
            fkIdTema: "",
            nomeProjeto: "",
            IdUsuario: "",
            token: ""
        };
    }
    componentDidMount() {
        this.carreagarProjetos();
        this.carregarProfessores();
        this.carreagarTemas();
        this.buscarDados();
    }
    buscarDados = async () => {
        try {
            const value = await AsyncStorage.getItem("userToken");
            if (value !== null) {
                this.setState({ IdUsuario: jwt(value).IdUsuario });
                this.setState({ token: value });
            }
        } catch (error) { }
    };

    carreagarProjetos = async () => {
        const resposta = await api.get("/projetos");
        const dadosDaApi = resposta.data;
        this.setState({ listaProjetos: dadosDaApi });
    };
    carregarProfessores = async () => {
        const resposta = await api.get("/professores");
        const dadosDaApi = resposta.data;
        this.setState({ listaProfessores: dadosDaApi })
    };
    carreagarTemas = async () => {
        const resposta = await api.get("/temas");
        const dadosDaApi = resposta.data;
        this.setState({ listaTemas: dadosDaApi })
    }
    cadastrarProjeto = async () => {
        const resposta = await api.post("/projetos", {
            nomeProjeto: this.state.nomeProjeto,
            fkIdTema: this.state.fkIdTema,
            IdUsuario: this.state.IdUsuario
        }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + AsyncStorage.getItem("userToken")
                }
            });

        const token = resposta.data.token;
        await AsyncStorage.setItem('userToken', token);
    }

    render() {
        return (
            <View style={styles.appBody}>
                <Text style={styles.appText}>Projetos</Text>
                <View style={styles.appLine}></View>
                <View style={styles.appCadastro}>
                <TextInput
                    placeholder="Nome"
                    placeholderTextColor="white"
                    onChangeText={nomeProjeto => this.setState({ nomeProjeto })}
                    style={styles.appInputNome}
                />
                <View style={styles.appPicker}>
                <Picker
                    selectedValue={this.state.fkIdTema}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ fkIdTema: itemValue })
                    }


                >
                    {this.state.listaTemas.map((element) => (
                        <Picker.Item label={element.nomeTema} value={element.idTema}
                                                         />
                    ))}
                </Picker>
                </View>
                </View>
                <TouchableOpacity
                    onPress={this.cadastrarProjeto}
                >
                    <Text style={styles.appCadastrarText}>Cadastrar</Text>
                </TouchableOpacity>
                <View style={styles.appHeader}>
                    <Text style={styles.appHeaderNome}>Nome</Text>
                    <Text style={styles.appHeaderProfessor}>Professor</Text>
                    <Text style={styles.appHeaderTema}>Tema</Text>
                </View>
                <FlatList
                    contentContainerStyle={styles.appTableConteudo}
                    data={this.state.listaProjetos}
                    keyExtractor={item => item.id}
                    renderItem={this.renderizaItem}
                />
            </View>
        );
    }
    renderizaItem = ({ item }) => (
        <View style={style.flatItemLinha}>
            <View style={styles.flatItemContainer}>
                <Text style={styles.flatItemNome}>{item.nomeProjeto}</Text>
                <Text style={styles.flatItemProfessor}>{item.fkIdProfessorNavigation.nomeProfessor}</Text>
                <Text style={styles.flatItemTema}>{item.fkIdTemaNavigation.nomeTema}</Text>
            </View>
        </View>
    )
}
renderizaTema = ({ tema }) => (
    <View>
        <Text>{tema.nomeTema}</Text>
    </View>
)

const styles = StyleSheet.create({
    appBody: {
        flex: 1,
        backgroundColor: '#532DA6',
    },
    appText: {
        color: 'white',
        fontFamily: "OpenSans-Light",
        letterSpacing: 2,
        fontSize: 35,
        marginTop: 40,
        marginLeft: 20
    },
    appLine: {
        borderBottomColor: 'white',
        borderBottomWidth: 0.9,
        width: 145,
        marginTop: 2,
        marginLeft: 21
    },
    appTableConteudo: {
        paddingTop: 30,
        paddingRight: 50,
        paddingLeft: 50
    },
    flatItemLinha: {
        flexDirection: "row",
        borderBottomWidth: 0.9,
        borderBottomColor: "gray"
    },
    flatItemContainer: {
        flex: 7,
        marginTop: 5,
        borderColor: "white",
        borderWidth: 0.9,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,

    },
    flatItemNome: {
        fontSize: 15,
        color: "white",
        fontFamily: "OpenSans-Light",
    },
    flatItemProfessor: {
        fontSize: 15,
        color: "white",
        fontFamily: "OpenSans-Light",
    },
    flatItemTema: {
        fontSize: 15,
        color: "white",
        fontFamily: "OpenSans-Light",
    },
    appHeaderNome: {
        fontSize: 15,
        color: "white",
        marginTop: 4,
        fontFamily: "OpenSans-Bold",
    },
    appHeaderProfessor: {
        fontSize: 15,
        color: "white",
        marginTop: 4,
        fontFamily: "OpenSans-Bold",
    },
    appHeaderTema: {
        fontSize: 15,
        color: "white",
        marginTop: 4,
        fontFamily: "OpenSans-Bold",
    },
    appHeader: {
        width: 400,
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 50,
    },
    appInputNome: {
        borderColor: "white",
        borderWidth: 0.9,
        width: 120,
        fontSize: 18
    },
    appPicker:{
        borderColor: "white",
        borderWidth: 0.9,
        width: 120
    },
    appCadastro:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        marginTop: 40


    },
    appCadastrarText: {
        color: "#FFFFFF",
        fontSize: 18,
        borderColor: "white",
        borderWidth: 0.9,
        width: 120
    }

});
export default Projetos;