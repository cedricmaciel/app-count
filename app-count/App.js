import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView, StyleSheet, Alert, Modal } from 'react-native';

export default function App() {
    const [mostrarFormularioGasto, setMostrarFormularioGasto] = useState(false);
    const [mostrarFormularioRenda, setMostrarFormularioRenda] = useState(false);
    const [gastos, setGastos] = useState([]);
    const [rendas, setRendas] = useState([]);
    const [telaEditor, setTelaEditor] = useState(false);
    const [telaEditorRenda, setTelaEditorRenda] = useState(false);
    const [gastoParaApagar, setGastoParaApagar] = useState(null); 
    const [rendaParaApagar, setRendaParaApagar] = useState(null);
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);
        return () => clearInterval(timerID);
    }, []);

    function tick() {
        setDateTime(new Date());
    }

    const toggleFormularioGasto = () => setMostrarFormularioGasto(!mostrarFormularioGasto);
    const toggleFormularioRenda = () => setMostrarFormularioRenda(!mostrarFormularioRenda);
    const closeFormularioGasto = () => setMostrarFormularioGasto(false);
    const closeFormularioRenda = () => setMostrarFormularioRenda(false);
    const openEditor = () => setTelaEditor(true);
    const closeEditor = () => setTelaEditor(false);
    const openEditorRenda = () => setTelaEditorRenda(true);
    const closeEditorRenda = () => setTelaEditorRenda(false);

    const handleSubmitGasto = (nomeGasto, valorGasto) => {
        const options = {
            hour: 'numeric', minute: 'numeric',
            year: 'numeric', month: 'numeric', day: 'numeric'
        };
        const time = new Date().toLocaleString('pt-BR', options);

        if (nomeGasto && !isNaN(valorGasto) && valorGasto > 0) {
            setGastos([...gastos, { nome: nomeGasto, valor: valorGasto, time: time }]);
            closeFormularioGasto();
        } else {
            Alert.alert('Erro', 'Por favor, preencha todos os campos corretamente.');
        }
    };

    const handleSubmitRenda = (nomeRenda, valorRenda) => {
        const options = {
            hour: 'numeric', minute: 'numeric',
            year: 'numeric', month: 'numeric', day: 'numeric'
        };
        const time = new Date().toLocaleString('pt-BR', options);

        if (nomeRenda && !isNaN(valorRenda) && valorRenda > 0) {
            setRendas([...rendas, { nome: nomeRenda, valor: valorRenda, time: time }]);
            closeFormularioRenda();
        } else {
            Alert.alert('Erro', 'Por favor, preencha todos os campos corretamente.');
        }
    };

    const apagarGasto = () => {
        if (gastoParaApagar !== null) {
            const updatedGastos = [...gastos];
            updatedGastos.splice(gastoParaApagar, 1);
            setGastos(updatedGastos);
            closeEditor();
        }
    };

    const apagarRenda = () => {
        if (rendaParaApagar !== null) {
            const updatedRenda = [...rendas];
            updatedRenda.splice(rendaParaApagar, 1);
            setRendas(updatedRenda);
            closeEditorRenda();
        }
    };

    const totalGastos = gastos.reduce((total, gasto) => total + gasto.valor, 0);
    const totalRendas = rendas.reduce((total, renda) => total + renda.valor, 0);
    const totalPoupado = totalRendas - totalGastos;

    return (
        <ScrollView contentContainerStyle={styles.container}>

                    {/* header e títulos */}
                    
            <View style={styles.header}>
                <Text style={styles.welcomeText}>Bem-vindo à Home</Text>
                <Text style={styles.clockStyle}>{dateTime.toLocaleString()}</Text>
            </View>

            <View style={styles.tagdiv}>
                <Text style={styles.tagTextG}>Gastos</Text>
                <Text style={styles.tagTextR}>Renda</Text>
            </View>

                       
                       {/* área das caixas de calculo  */}

            <View style={styles.caixas}>
                
                <View style={styles.caixaG}>
                    <Text style={styles.textLabel}>Gastos</Text>
                    <Text style={styles.resultadoCaixa}>R${totalGastos}</Text>
                </View>
                <View style={styles.caixaP}>
                    <Text style={styles.textLabel}>Poupado</Text>
                    <Text style={styles.resultadoCaixa}>R${totalPoupado}</Text>
                </View>
                <View style={styles.caixaR}>
                    <Text style={styles.textLabel}>Renda</Text>
                    <Text style={styles.resultadoCaixa}>R${totalRendas}</Text>
                </View>

            </View>



                                       {/* área dos botoes de adicionar*/}


            <View style={styles.divbotao}>
                <View style={styles.divbotao1}>
                    {gastos.map((gasto, index) => (
                        <View key={index} style={styles.divPrint}>
                            <Text style={styles.textPrint}>{gasto.nome}</Text>
                            <Text style={styles.textPrint}>R${gasto.valor}</Text>
                            <Text style={styles.textPrint}>{gasto.time}</Text>
                            <TouchableOpacity onPress={() => { setGastoParaApagar(index); openEditor(); }}>
                                <Text style={styles.editor}>x</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                    {!mostrarFormularioGasto && (
                        <Button title="+" onPress={toggleFormularioGasto} />
                    )}
                </View>
                <View style={styles.divbotao2}>
                    {rendas.map((renda, index) => (
                        <View key={index} style={styles.divPrint}>
                            <Text style={styles.textPrint}>{renda.nome}</Text>
                            <Text style={styles.textPrint}>R${renda.valor}</Text>
                            <Text style={styles.textPrint}>{renda.time}</Text>
                            <TouchableOpacity onPress={() => { setRendaParaApagar(index); openEditorRenda(); }}>
                                <Text style={styles.editor}>x</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                    {!mostrarFormularioRenda && (
                        <Button title="+" onPress={toggleFormularioRenda} />
                    )}
                </View>
            </View>



                   {/* área da tela de editor para apagar ou alterar dados */}

                   

            <Modal visible={telaEditor} transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.telaEditor}>
                        <Text style={styles.tituloApagar}>Tem certeza que quer apagar?</Text>
                        <Button title="Apagar" onPress={apagarGasto} />
                        <Button title="Fechar" onPress={closeEditor} />
                    </View>
                </View>
            </Modal>

            <Modal visible={telaEditorRenda} transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.telaEditor}>
                        <Text style={styles.tituloApagar}>Tem certeza que quer apagar?</Text>
                        <Button title="Apagar" onPress={apagarRenda} />
                        <Button title="Fechar" onPress={closeEditorRenda} />
                    </View>
                </View>
            </Modal>

            <Modal visible={mostrarFormularioGasto} transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.miniTela}>
                        <TouchableOpacity onPress={closeFormularioGasto}>
                            <Text style={styles.closeButton}>×</Text>
                        </TouchableOpacity>
                        <Text style={styles.h2spam}>Adicionar Gasto</Text>
                        <TextInput
                            placeholder="Nome do Gasto"
                            style={styles.inputStyle}
                            onSubmitEditing={(e) => handleSubmitGasto(e.nativeEvent.text, parseFloat(e.nativeEvent.text))}
                        />
                        <TextInput
                            placeholder="Valor do Gasto"
                            keyboardType="numeric"
                            style={styles.inputStyle}
                            onSubmitEditing={(e) => handleSubmitGasto('Gasto', parseFloat(e.nativeEvent.text))}
                        />
                        <Button title="Adicionar" onPress={() => handleSubmitGasto('Gasto', 0)} />
                    </View>
                </View>
            </Modal>

            <Modal visible={mostrarFormularioRenda} transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.miniTela}>
                        <TouchableOpacity onPress={closeFormularioRenda}>
                            <Text style={styles.closeButton}>×</Text>
                        </TouchableOpacity>
                        <Text style={styles.h2spam}>Adicionar Renda</Text>
                        <TextInput
                            placeholder="Nome da Renda"
                            style={styles.inputStyle}
                            onSubmitEditing={(e) => handleSubmitRenda(e.nativeEvent.text, parseFloat(e.nativeEvent.text))}
                        />
                        <TextInput
                            placeholder="Valor da Renda"
                            keyboardType="numeric"
                            style={styles.inputStyle}
                            onSubmitEditing={(e) => handleSubmitRenda('Renda', parseFloat(e.nativeEvent.text))}
                        />
                        <Button title="Adicionar" onPress={() => handleSubmitRenda('Renda', 0)} />
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
    },
    header: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    welcomeText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
    },
    clockStyle: {
        fontSize: 18,
        color: '#666',
    },
    tagdiv: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingVertical: 10,
        borderRadius: 10,
    },
    tagTextG: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#444',
        backgroundColor: 'red',
        width: '50%',
        
        
    },
    tagTextR: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#444',
        backgroundColor: 'green',
        width: '50%',
        
    },

    caixas: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    caixaG: {
        alignItems: 'center',
        padding: 15,
        borderWidth: 2,
        borderColor: '#333',
        borderRadius: 8,
        backgroundColor: '#fff',
        width: '30%',
    },

    caixaP: {
        alignItems: 'center',
        padding: 15,
        borderWidth: 2,
        borderColor: '#333',
        borderRadius: 8,
        backgroundColor: '#fff',
        width: '30%',
    },

    caixaR: {
        alignItems: 'center',
        padding: 15,
        borderWidth: 2,
        borderColor: '#333',
        borderRadius: 8,
        backgroundColor: '#fff',
        width: '30%',
    },

    textLabel: {
        fontSize: 16,
        color: '#555',
    },
    resultadoCaixa: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    divbotao: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%',
        
    },
    divbotao1: {
        flex: 1,
        marginRight: 10,
        
    },
    divbotao2: {
        flex: 1,
        marginLeft: 10,
    },
    divPrint: {
        marginVertical: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 5,
        backgroundColor: '#fafafa',
    },
    textPrint: {
        fontSize: 16,
        color: '#333',
    },
    editor: {
        color: 'red',
        alignSelf: 'flex-end',
        fontSize: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    miniTela: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    telaEditor: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    tituloApagar: {
        fontSize: 18,
        marginBottom: 10,
        color: '#333',
    },
    inputStyle: {
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
        color: '#333',
        backgroundColor: '#f9f9f9',
    },
    closeButton: {
        alignSelf: 'flex-end',
        fontSize: 24,
        color: '#333',
    },
    h2spam: {
        fontSize: 22,
        marginBottom: 10,
        fontWeight: 'bold',
        color: '#555',
    },
});
