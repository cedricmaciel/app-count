import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, ScrollView, Modal, Alert } from 'react-native';

export default function App() {
    const [mostrarFormularioGasto, setMostrarFormularioGasto] = useState(false);
    const [mostrarFormularioRenda, setMostrarFormularioRenda] = useState(false);
    const [gastos, setGastos] = useState([]);
    const [rendas, setRendas] = useState([]);
    
    const [telaEditor, setTelaEditor] = useState(false);
    const [telaEditorRenda, setTelaEditorRenda] = useState(false);

    const [gastoParaApagar, setGastoParaApagar] = useState(null);
    const [rendaParaApagar, setRendaParaApagar] = useState(null);

    const closeeditor = () => setTelaEditor(false);
    const openEditor = () => setTelaEditor(true);

    const closeeditorRenda = () => setTelaEditorRenda(false);
    const openEditorRenda = () => setTelaEditorRenda(true);

    const toggleFormularioGasto = () => setMostrarFormularioGasto(!mostrarFormularioGasto);
    const toggleFormularioRenda = () => setMostrarFormularioRenda(!mostrarFormularioRenda);

    const closeFormularioGasto = () => setMostrarFormularioGasto(false);
    const closeFormularioRenda = () => setMostrarFormularioRenda(false);

    const handleSubmitGasto = (nomeGasto, valorGasto) => {
        const options = {
            hour: 'numeric', minute: 'numeric',
            year: 'numeric', month: 'numeric', day: 'numeric'
        };
        const time = new Date().toLocaleString('pt-BR', options);
        if (nomeGasto && !isNaN(valorGasto) && valorGasto > 0) {
            setGastos([...gastos, { nome: nomeGasto, valor: valorGasto, time: time }]);
            setMostrarFormularioGasto(false);
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
            setMostrarFormularioRenda(false);
        } else {
            Alert.alert('Erro', 'Por favor, preencha todos os campos corretamente.');
        }
    };

    const apagarGasto = () => {
        if (gastoParaApagar !== null) {
            const updatedGastos = [...gastos];
            updatedGastos.splice(gastoParaApagar, 1);
            setGastos(updatedGastos);
            closeeditor();
        }
    };

    const apagarRenda = () => {
        if (rendaParaApagar !== null) {
            const updatedRendas = [...rendas];
            updatedRendas.splice(rendaParaApagar, 1);
            setRendas(updatedRendas);
            closeeditorRenda();
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

    function tick() {
        setDateTime(new Date());
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text>Bem-vindo à Home</Text>
                <Text style={styles.clockStyle}>{dateTime.toLocaleString()}</Text>
            </View>

            <View style={styles.tagDiv}>
                <Text style={styles.title}>Gastos</Text>
                <Text style={styles.title}>Renda</Text>
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

            <View style={styles.divBotao}>
                <View>
                    {gastos.map((gasto, index) => (
                        <View key={index} style={styles.item}>
                            <Text>{gasto.nome}</Text>
                            <Text>R${gasto.valor}</Text>
                            <Text>{gasto.time}</Text>
                            <TouchableOpacity onPress={() => { setGastoParaApagar(index); openEditor(); }}>
                                <Text style={styles.deleteButton}>x</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                    {!mostrarFormularioGasto && (
                        <Button title="Adicionar Gasto" onPress={toggleFormularioGasto} />
                    )}
                </View>

                <View>
                    {rendas.map((renda, index) => (
                        <View key={index} style={styles.item}>
                            <Text>{renda.nome}</Text>
                            <Text>R${renda.valor}</Text>
                            <Text>{renda.time}</Text>
                            <TouchableOpacity onPress={() => { setRendaParaApagar(index); openEditorRenda(); }}>
                                <Text style={styles.deleteButton}>x</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                    {!mostrarFormularioRenda && (
                        <Button title="Adicionar Renda" onPress={toggleFormularioRenda} />
                    )}
                </View>
            </View>

            <Modal visible={telaEditor} animationType="slide">
                <View style={styles.modal}>
                    <Text>Tem certeza que quer apagar?</Text>
                    <Button title="Apagar" onPress={apagarGasto} />
                    <Button title="Fechar" onPress={closeeditor} />
                </View>
            </Modal>

            <Modal visible={telaEditorRenda} animationType="slide">
                <View style={styles.modal}>
                    <Text>Tem certeza que quer apagar?</Text>
                    <Button title="Apagar" onPress={apagarRenda} />
                    <Button title="Fechar" onPress={closeeditorRenda} />
                </View>
            </Modal>

            {mostrarFormularioGasto && (
                <View style={styles.form}>
                    <Text>Adicionar Gasto</Text>
                    <TextInput placeholder="Nome do Gasto" onSubmitEditing={(event) => handleSubmitGasto(event.nativeEvent.text)} />
                    <TextInput placeholder="Valor do Gasto" keyboardType="numeric" onSubmitEditing={(event) => handleSubmitGasto('', parseFloat(event.nativeEvent.text))} />
                    <Button title="Adicionar" onPress={toggleFormularioGasto} />
                </View>
            )}

            {mostrarFormularioRenda && (
                <View style={styles.form}>
                    <Text>Adicionar Renda</Text>
                    <TextInput placeholder="Nome da Renda" onSubmitEditing={(event) => handleSubmitRenda(event.nativeEvent.text)} />
                    <TextInput placeholder="Valor da Renda" keyboardType="numeric" onSubmitEditing={(event) => handleSubmitRenda('', parseFloat(event.nativeEvent.text))} />
                    <Button title="Adicionar" onPress={toggleFormularioRenda} />
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    header: { alignItems: 'center', marginBottom: 20 },
    clockStyle: { fontSize: 16, fontWeight: 'bold' },
    tagDiv: { flexDirection: 'row', justifyContent: 'space-between' },
    title: { fontSize: 20, fontWeight: 'bold' },
    caixas: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 },
    caixa: { alignItems: 'center', padding: 10, backgroundColor: '#f0f0f0', borderRadius: 5, width: '30%' },
    resultado: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
    divBotao: { flexDirection: 'row', justifyContent: 'space-between' },
    item: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between' },
    deleteButton: { color: 'red', fontSize: 18 },
    modal: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    form: { padding: 20, borderRadius: 5, backgroundColor: '#f0f0f0', marginBottom: 20 },
});
