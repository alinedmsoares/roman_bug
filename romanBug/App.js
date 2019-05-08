import React from 'react';
import {Component} from 'react';
import style from 'react';
import { StyleSheet, Text, View, FlatList } from "react-native";
import api from "./src/services/api";

class Projetos extends Component {
    static navigationOptions = {
        // tabBarIcon: ({ tintColor }) => (
        //     <Image
        //         source={require("../assets/img/icon_home.png")}
        //         style={StyleSheet.tabNavigatorIconHome}
        //     />
        // )
    };

    constructor(props) {
        super(props);
        this.state = {
            listaProjetos: []
        };
    }
    componentDidMount() {
        this.carreagarProjetos();
    }

    carreagarProjetos = async () => {
        const resposta = await api.get("/projetos");
        const dadosDaApi = resposta.data;
        this.setState({ listaProjetos: dadosDaApi });
    };

    render() {
        return (
            <View style={styles.appBody}>
                <Text style={styles.appText}>Projetos</Text>
                <View style={styles.appLine}></View>
                <FlatList
                    contentContainerStyle={styles.appTableConteudo}
                    data={this.state.listaProjetos}
                    keyExtractor={item => item.id}
                    renderItem={this.renderizaItem}
                />
                <Text style={styles.appHeaderNome}>Nome</Text>
            </View>
        );
    }
    renderizaItem = ({ item }) => (
        <View style={style.flatItemLinha}>
            <View style={styles.flatItemContainer}>
                <Text style={styles.flatItemNome}>{item.nomeProjeto}</Text>
                <Text style={styles.flatItemProfessor}>{item.nomeProfessor}</Text>
            </View>
        </View>
    )
}

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
    appLine:{
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
        marginTop: 5
      },
      flatItemNome: {
        fontSize: 15,
        color: "white",
        fontFamily: "OpenSans-Bold",
        borderColor: "white",
        borderWidth: 0.9,
        padding: 10
      }
});
export default Projetos;