import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function App() {
  // Estado para armazenar o tempo formatado
  const [numero, setNumero] = useState('00:00:00.000');
  // Estado para armazenar o texto do botão
  const [botao, setBotao] = useState('VAI');
  // Estado para armazenar o último tempo registrado
  const [ultimo, setUltimo] = useState(null);
  // Estado para armazenar o tempo decorrido em milissegundos
  const [milisegundos, setMilisegundos] = useState(0);
  // Estado para controlar se o cronômetro está ativo
  const [ativa, setAtiva] = useState(false);
  
  useEffect(() => {
    let intervalo = null;
    if (ativa) {
      // Captura o momento do início e atualiza o tempo a cada 10ms
      const inicio = Date.now() - milisegundos;
      intervalo = setInterval(() => {
        setMilisegundos(Date.now() - inicio);
      }, 10);
    } else if (intervalo) {
      clearInterval(intervalo);
    }
    return () => clearInterval(intervalo);
  }, [ativa]);

  useEffect(() => {
    // Formata o tempo para exibição no formato HH:MM:SS.mmm
    const hh = String(Math.floor(milisegundos / 3600000)).padStart(2, '0');
    const mm = String(Math.floor((milisegundos % 3600000) / 60000)).padStart(2, '0');
    const ss = String(Math.floor((milisegundos % 60000) / 1000)).padStart(2, '0');
    const ms = String(milisegundos % 1000).padStart(3, '0');
    setNumero(`${hh}:${mm}:${ss}.${ms}`);
  }, [milisegundos]);

  function vai() {
    // Alterna o estado do cronômetro
    setAtiva(!ativa);
    setBotao(ativa ? 'VAI' : 'PARAR');
  }

  function limpar() {
    // Para o cronômetro e reseta o tempo
    setAtiva(false);
    setUltimo(numero);
    setMilisegundos(0);
    setBotao('VAI');
  }

  return (
    <View style={styles.container}>
      <Image style={styles.crono} source={require('./src/crono.png')} />
      <Text style={styles.timer}>{numero}</Text>
      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btn} onPress={vai}>
          <Text style={styles.btnTexto}>{botao}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={limpar}>
          <Text style={styles.btnTexto}>LIMPAR</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.areaUltima}>
        <Text style={styles.textoCorrida}>{ultimo ? `Último tempo: ${ultimo}` : ''}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00aeef',
  },
  timer: {
    marginTop: -160,
    fontSize: 45,
    fontWeight: 'bold',
    color: '#FFF',
  },
  btnArea: {
    flexDirection: 'row',
    height: 40,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    width: 100,
    height: 40,
    margin: 10,
    borderRadius: 9,
  },
  btnTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00aeef',
  },
  areaUltima: {
    marginTop: 40,
  },
  textoCorrida: {
    fontSize: 23,
    color: '#FFF',
    fontStyle: 'italic',
  },
  crono: {
    width: 200,
    height: 200,
    marginBottom: 200,
  },
});
