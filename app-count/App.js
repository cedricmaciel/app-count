import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, ScrollView, TouchableOpacity, Modal } from 'react-native';

export default function App() {
    const [mostrarFormularioGasto, setMostrarFormularioGasto] = useState(false);
    const [mostrarFormularioRenda, setMostrarFormularioRenda] = useState(false);
    const [gastos, setGastos] = useState([]);
    const [rendas, setRendas] = useState([]);
    
    const [telaEditor, setTelaEditor] = useState(false);
    const [telaEditorRenda, setTelaEditorRenda] = useState(false);
    const [gastoParaApagar, setGastoParaApagar] = useState(null); 
    const [rendaParaApagar, setRendaParaApagar] = useState(null);

    const toggleFormularioGasto = () => setMostrarFormularioGasto(!mostrarFormularioGasto);
    const toggleFormularioRenda = () => setMostrarFormularioRenda(!mostrarFormularioRenda);

    const closeFormularioGasto = () => setMostrarFormularioGasto(false);
    const closeFormularioRenda = () => setMostrarFormularioRenda(false);

    const openEditor = () => setTelaEditor(true);
    const closeEditor = () => setTelaEditor(false);

    const openEditorRenda = () => setTelaEditorRenda(true);
    const closeEditorRenda = () => setTelaEditorRenda(false);

    const handleSubmitGasto = (event) => {
        const nomeGasto = event.trim();
        const valorGasto = parseFloat(event);
        const time = new Date().toLocaleString('pt-BR');
    
        if (nomeGasto && !isNaN(valorGasto) && valorGasto > 0) {
            setGastos([...gastos, { nome: nomeGasto, valor: valorGasto, time }]);
            setMostrarFormularioGasto(false);
        } else {
            alert('Por favor, preencha todos os campos corretamente.');
        }
    };

    const handleSubmitRenda = (event) => {
        const nomeRenda = event.trim();
        const valorRenda = parseFloat(event);
        const time = new Date().toLocaleString('pt-BR');
    
        if (nomeRenda && !isNaN(valorRenda) && valorRenda > 0) {
            setRendas([...rendas, { nome: nomeRenda, valor: valorRenda, time }]);
            setMostrarFormularioRenda(false);
        } else {
            alert('Por favor, preencha todos os campos corretamente.');
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
            const updatedRendas = [...rendas];
            updatedRendas.splice(rendaParaApagar, 1);
            setRendas(updatedRendas);
            closeEditorRenda();
        }
    };

    const totalGastos = gastos.reduce((total, gasto) => total + gasto.valor, 0);
    const totalRendas = rendas.reduce((total, renda) => total + renda.valor, 0);
    const totalPoupado = totalRendas - totalGastos;

    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);
        return () => clearInterval(timerID);
    }, []);

    const tick = () => setDateTime(new Date());

    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>Bem-vindo à Home</Text>
            <Text style={styles.clock}>{dateTime.toLocaleString()}</Text>

            <View style={styles.tagdiv}>
                <Text style={styles.tag}>Gastos</Text>
                <Text style={styles.tag}>Renda</Text>
            </View>

            <View style={styles.caixas}>
                <View style={styles.caixa}>
                    <Text>Renda</Text>
                    <Text style={styles.resultado}>R${totalRendas}</Text>
                </View>
                <View style={styles.caixa}>
                    <Text>Gastos</Text>
                    <Text style={styles.resultado}>R${totalGastos}</Text>
                </View>
                <View style={styles.caixa}>
                    <Text>Poupado</Text>
                    <Text style={styles.resultado}>R${totalPoupado}</Text>
                </View>
            </View>

            <ScrollView>
                <View style={styles.divbotao}>
                    <View style={styles.divbotao1}>
                        {gastos.map((gasto, index) => (
                            <View key={index} style={styles.gasto}>
                                <Text>{gasto.nome}</Text>
                                <Text>R${gasto.valor}</Text>
                                <Text>{gasto.time}</Text>
                                <TouchableOpacity onPress={() => { setGastoParaApagar(index); openEditor(); }}>
                                    <Text style={styles.deleteButton}>x</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                        {!mostrarFormularioGasto && (
                            <Button title="+" onPress={toggleFormularioGasto} color="#4CAF50" />
                        )}
                    </View>

                    <View style={styles.divbotao2}>
                        {rendas.map((renda, index) => (
                            <View key={index} style={styles.renda}>
                                <Text>{renda.nome}</Text>
                                <Text>R${renda.valor}</Text>
                                <Text>{renda.time}</Text>
                                <TouchableOpacity onPress={() => { setRendaParaApagar(index); openEditorRenda(); }}>
                                    <Text style={styles.deleteButton}>x</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                        {!mostrarFormularioRenda && (
                            <Button title="+" onPress={toggleFormularioRenda} color="#2196F3" />
                        )}
                    </View>

                    {telaEditor && (
                        <Modal visible={telaEditor} animationType="slide">
                            <View style={styles.modal}>
                                <Text>Tem certeza que quer apagar?</Text>
                                <Button title="Apagar" onPress={apagarGasto} color="#f44336" />
                                <Button title="Fechar" onPress={closeEditor} color="#9E9E9E" />
                            </View>
                        </Modal>
                    )}

                    {telaEditorRenda && (
                        <Modal visible={telaEditorRenda} animationType="slide">
                            <View style={styles.modal}>
                                <Text>Tem certeza que quer apagar?</Text>
                                <Button title="Apagar" onPress={apagarRenda} color="#f44336" />
                                <Button title="Fechar" onPress={closeEditorRenda} color="#9E9E9E" />
                            </View>
                        </Modal>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#F5F5F5' },
    welcome: { fontSize: 24, marginBottom: 10, color: '#333' },
    clock: { fontSize: 18, marginBottom: 20, color: '#333' },
    tagdiv: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    tag: { fontSize: 20, color: '#555' },
    caixas: { flexDirection: 'row', justifyContent: 'space-between' },
    caixa: { width: '30%', backgroundColor: '#E8EAF6', padding: 10, borderRadius: 5 },
    resultado: { fontSize: 18, fontWeight: 'bold', color: '#3F51B5' },
    divbotao: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
    divbotao1: { flex: 1, marginRight: 10 },
    divbotao2: { flex: 1, marginLeft: 10 },
    gasto: { backgroundColor: '#FFEBEE', padding: 10, marginBottom: 5, borderRadius: 5 },
    renda: { backgroundColor: '#E8F5E9', padding: 10, marginBottom: 5, borderRadius: 5 },
    deleteButton: { color: 'red', fontSize: 18 },
    modal: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 20 },
});
