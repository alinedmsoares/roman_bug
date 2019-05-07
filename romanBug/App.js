import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from "react-native"
import api from "./src/services/api"

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
                {/* <Text style={styles.flatItemProfessor}>{item.nomeProfessor}</Text> */}
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
        fontSize: 30
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
        fontSize: 14,
        color: "#333",
        fontFamily: "OpenSans-Light"
      }
});
export default Projetos;