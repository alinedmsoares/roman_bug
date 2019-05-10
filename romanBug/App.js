import React from 'react';
import { Component } from 'react';
import style from 'react';
import { StyleSheet, Text, View, FlatList, Picker, TouchableOpacity, TextInput, AsyncStorage, Alert } from "react-native";
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
            fkIdProfessor: "",
            nomeProjeto: "",
            IdUsuario: "",
            token: ""
        };
    };


    componentDidMount() {
        this.carregaToken();

    };

    carregaToken = async () => {
        await AsyncStorage.getItem("userToken").then((token) => {
            this.setState({ token: token }, () => {
                this.carreagarProjetos();
                this.carregarProfessores();
                this.carreagarTemas();
                this.buscarDados();
            });

        });
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
        const usertoken = this.state.token;
        const resposta = await api.get("/projetos", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + usertoken
            }
        });
        const dadosDaApi = resposta.data;
        this.setState({ listaProjetos: dadosDaApi });
    };

    carregarProfessores = async () => {
        const usertoken = this.state.token;
        const resposta = await api.get("/professores",
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + usertoken
                }
            });
        const dadosDaApi = resposta.data;
        this.setState({ listaProfessores: dadosDaApi });
    };

    carreagarTemas = async () => {
        const usertoken = this.state.token;
        const resposta = await api.get("/temas",
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + usertoken
                }
            });
        const dadosDaApi = resposta.data;
        this.setState({ listaTemas: dadosDaApi });
    };

    cadastrarProjeto = async () => {
        const usertoken = this.state.token;
        const resposta = await api.post("/projetos", {
            nomeProjeto: this.state.nomeProjeto,
            fkIdTema: this.state.fkIdTema,
            fkIdProfessor: this.state.fkIdProfessor
        }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + usertoken
                }
            });
    };



    render() {
        return (
            <View style={styles.appBody}>
                <Text style={styles.appText}>Projetos</Text>
                <View style={styles.appLine}></View>
                <View style={styles.appCadastro}>
                    <View style={styles.appCadastro1}>
                        <TextInput
                            placeholder="Nome"
                            placeholderTextColor="white"
                            onChangeText={nomeProjeto => this.setState({ nomeProjeto })}
                            style={styles.appInputNome}
                        />
                        <View style={styles.appPicker}>
                            <Picker
                                placeholder="Nome"
                                placeholderTextColor="white"
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
                    <View style={styles.appCadastro2}>
                        <View style={styles.appPicker}>

                            <Picker
                                selectedValue={this.state.fkIdProfessor}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ fkIdProfessor: itemValue })
                                }
                            >
                                {this.state.listaProfessores.map((element) => (
                                    <Picker.Item label={element.nomeProfessor} value={element.idProfessor}
                                    />
                                ))}
                            </Picker>
                        </View>
                        <TouchableOpacity
                            onPress={this.cadastrarProjeto}
                        >
                            <Text style={styles.appCadastrarText}>Cadastrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
        backgroundColor: '#311964',
    },
    appText: {
        color: '#BEB2D7',
        fontFamily: "OpenSans-Light",
        letterSpacing: 2,
        fontSize: 35,
        marginTop: 40,
        marginLeft: 20
    },
    appLine: {
        borderBottomColor: '#BEB2D7',
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
        borderBottomColor: "#BEB2D7"
    },
    flatItemContainer: {
        flex: 7,
        marginTop: 5,
        borderColor: "#BEB2D7",
        borderWidth: 0.9,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,

    },
    flatItemNome: {
        fontSize: 15,
        color: "#BEB2D7",
        fontFamily: "OpenSans-Light",
    },
    flatItemProfessor: {
        fontSize: 15,
        color: "#BEB2D7",
        fontFamily: "OpenSans-Light",
    },
    flatItemTema: {
        fontSize: 15,
        color: "#BEB2D7",
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
        borderColor: "#BEB2D7",
        borderWidth: 0.9,
        width: 140,
        fontSize: 18,
        marginTop: 10

    },
    appPicker: {
        borderColor: "white",
        borderWidth: 0.9,
        width: 140,
        marginTop: 10
    },
    appCadastro: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 40,

    },
    appCadastrarText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: 'bold',
        height: 50,
        width: 140,
        padding: 12,
        backgroundColor: "#1D0E3F",
        marginTop: 10
    },


});
export default Projetos;