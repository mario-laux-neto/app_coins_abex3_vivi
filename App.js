// App.js (Versão Consolidada Final - Correção Loja, Resgate e Pagamento)

import React, { useState, useEffect, createContext, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  FlatList,
  TextInput,
  Alert,
  Platform,
  StatusBar,
  Image
} from 'react-native';

// Navegação
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Ícones
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Cores e Constantes
const PRIMARY_COLOR = '#6A0DAD';
const PRIMARY_COLOR_LIGHT = '#7E3FBF';
const PRIMARY_COLOR_VERY_LIGHT = '#E9D8F8'; // Lilás bem claro para fundos de card de pagamento
const ACCENT_COLOR = '#FFA500';
const WHITE_COLOR = '#FFFFFF';
const BLACK_COLOR = '#000000';
const TEXT_COLOR_DARK = '#333333';
const TEXT_COLOR_DARK_SECONDARY = '#555555';
const TEXT_COLOR_LIGHT = '#FFFFFF';
const TEXT_COLOR_MUTED = '#6c757d';
const LIGHT_BG_COLOR = '#F4F0F8';
const CARD_BG_COLOR = WHITE_COLOR;
const ICON_COLOR_ACTIVE_TAB = PRIMARY_COLOR;
const ICON_COLOR_INACTIVE_TAB = '#A0A0A0';
const ICON_COLOR_DRAWER_ACTIVE = PRIMARY_COLOR;
const ICON_COLOR_DRAWER_INACTIVE = '#666666';
const GREEN_SUCCESS = '#4CAF50';
const RED_ERROR = '#D32F2F';
const WHITE_COLOR_TRANSLUCENT = 'rgba(255,255,255,0.7)';

const { width, height } = Dimensions.get('window');

// --- Dados Mockados ---
const NOME_ALUNO_EXEMPLO = "Mário";
const MATRICULA_EXEMPLO = "123-456-7890";

const DISCIPLINAS_MOCK = [ { id: 'mat', nome: 'Matemática', iconeIon: 'calculator', cor: '#D32F2F', iconLib: Ionicons }, { id: 'hist', nome: 'História', iconeIon: 'library', cor: '#F57C00', iconLib: Ionicons }, { id: 'geo', nome: 'Geografia', iconeIon: 'map', cor: '#0288D1', iconLib: Ionicons }, { id: 'cie', nome: 'Ciências', iconeMCI: 'flask', cor: '#388E3C', iconLib: MaterialCommunityIcons }, { id: 'edf', nome: 'Ed. Física', iconeMCI: 'basketball', cor: '#1976D2', iconLib: MaterialCommunityIcons }, { id: 'port', nome: 'Português', iconeIon: 'book', cor: '#00796B', iconLib: Ionicons }, { id: 'ing', nome: 'Inglês', iconeMCI: 'translate', cor: '#C2185B', iconLib: MaterialCommunityIcons }, { id: 'outros', nome: 'Outros', iconeIon: 'apps', cor: '#757575', iconLib: Ionicons },];
const PROFESSORES_MOCK = [ { id: 'prof1', nome: 'Prof. Ana', imagemUrl: 'https://placehold.co/150x150/E6A4B4/333333?text=Prof.A&font=roboto' }, { id: 'prof2', nome: 'Prof. Bruno', imagemUrl: 'https://placehold.co/150x150/A4B4E6/333333?text=Prof.B&font=roboto' }, { id: 'prof3', nome: 'Prof. Carla', imagemUrl: 'https://placehold.co/150x150/B4E6A4/333333?text=Prof.C&font=roboto' },];
const VIDEOAULAS_MOCK = [ { id: 'vid1', titulo: 'Introdução à Álgebra', professor: 'Prof. Ana', imagemUrl: 'https://placehold.co/400x225/7E3FBF/FFFFFF?text=Video+Algebra&font=roboto', duracao: '15:30' }, { id: 'vid2', titulo: 'Revolução Francesa', professor: 'Prof. Bruno', imagemUrl: 'https://placehold.co/400x225/FFA500/FFFFFF?text=Video+Historia&font=roboto', duracao: '22:10' }, { id: 'vid3', titulo: 'Ciclo da Água', professor: 'Prof. Carla', imagemUrl: 'https://placehold.co/400x225/3498DB/FFFFFF?text=Video+Ciencias&font=roboto', duracao: '10:05' },];
const CONTEUDO_MATERIAS_MOCK = { 'mat': { resumos: [ { id: 'mat_res1', titulo: 'Teorema de Pitágoras', conteudo: 'Em qualquer triângulo retângulo, o quadrado do comprimento da hipotenusa é igual à soma dos quadrados dos comprimentos dos catetos. A fórmula é a² + b² = c², onde c é a hipotenusa.' }, { id: 'mat_res2', titulo: 'Funções de Primeiro Grau', conteudo: 'Uma função de primeiro grau é uma função f: ℝ → ℝ, definida como f(x) = ax + b, com a e b reais e a ≠ 0. Seu gráfico é uma reta.' }, ], atividades: [ { id: 'mat_atv1', tipo: 'multipla_escolha', pergunta: 'Qual o valor de X na equação 2x + 5 = 15?', opcoes: ['3', '4', '5', '10'], respostaCorreta: '5', recompensa: 10 }, { id: 'mat_atv2', tipo: 'multipla_escolha', pergunta: 'Se um triângulo tem catetos 3cm e 4cm, qual a medida da hipotenusa?', opcoes: ['5cm', '6cm', '7cm', '25cm'], respostaCorreta: '5cm', recompensa: 15 }, ] }, 'port': { resumos: [ { id: 'port_res1', titulo: 'Tipos de Sujeito', conteudo: 'Existem diversos tipos de sujeito: simples (um núcleo), composto (dois ou mais núcleos), oculto (não expresso, mas identificável), indeterminado (não se quer ou não se pode identificar) e oração sem sujeito (fenômenos da natureza, verbo haver no sentido de existir, etc.).' } ], atividades: [ { id: 'port_atv1', tipo: 'multipla_escolha', pergunta: 'Qual o sujeito da frase: "Choveu muito ontem."?', opcoes: ['Muito', 'Ontem', 'Chuva', 'Oração sem sujeito'], respostaCorreta: 'Oração sem sujeito', recompensa: 5 } ] }, 'hist': { resumos: [{id: 'hist_res1', titulo: 'Idade Média', conteudo: 'Período da história europeia que durou do século V ao XV...'}], atividades: [] }, 'geo': { resumos: [{id: 'geo_res1', titulo: 'Relevo Brasileiro', conteudo: 'O relevo brasileiro é caracterizado por planaltos, planícies e depressões...'}], atividades: [] }, 'cie': { resumos: [{id: 'cie_res1', titulo: 'Fotossíntese', conteudo: 'Processo pelo qual as plantas produzem seu próprio alimento...'}], atividades: [] }, 'edf': { resumos: [{id: 'edf_res1', titulo: 'Benefícios do Alongamento', conteudo: 'Melhora a flexibilidade, previne lesões...'}], atividades: [] }, 'ing': { resumos: [{id: 'ing_res1', titulo: 'Simple Present', conteudo: 'Usado para ações habituais, fatos e verdades universais...'}], atividades: [] }, 'outros': { resumos: [], atividades: [] }, };
const MOCK_LOJA_PONTOS = [ { id: 'mat_pts', nome: 'Matemática', iconeMCI: 'calculator-variant', corIcone: '#D32F2F', pontos: 0.5, precoMoedas: 750 }, { id: 'port_pts', nome: 'Português', iconeMCI: 'book-open-page-variant-outline', corIcone: '#00796B', pontos: 0.5, precoMoedas: 750 }, { id: 'edf_pts', nome: 'Ed. Física', iconeMCI: 'volleyball', corIcone: '#1976D2', pontos: 0.5, precoMoedas: 300 }, { id: 'cie_pts', nome: 'Ciências', iconeMCI: 'flask-outline', corIcone: '#388E3C', pontos: 0.5, precoMoedas: 500 }, { id: 'hist_pts', nome: 'História', iconeMCI: 'bank', corIcone: '#F57C00', pontos: 0.5, precoMoedas: 470 }, { id: 'ing_pts', nome: 'Inglês', iconeMCI: 'abjad-english', corIcone: '#C2185B', pontos: 0.25, precoMoedas: 220 },];
const MOCK_TAREFAS_RESGATE = { semanais: [ { id: 'tarS1', materia: 'Matemática', descricao: 'Resolva as questões de Geometria', recompensa: 20, iconeMCI: 'calculator-variant', corIcone: RED_ERROR }, { id: 'tarS2', materia: 'Português', descricao: 'Resolva as questões de verbos', recompensa: 30, iconeMCI: 'book-open-page-variant-outline', corIcone: '#00796B' }, { id: 'tarS3', materia: 'Geografia', descricao: 'Resolva as questões de países', recompensa: 15, iconeMCI: 'earth', corIcone: '#0288D1'}, { id: 'tarS4', materia: 'História', descricao: 'Resolva as questões de Oriente Médio', recompensa: 10, iconeMCI: 'bank', corIcone: '#F57C00' }, ], diarias: [ { id: 'tarD1', materia: 'Ed. Física', descricao: 'Faça flexões', recompensa: 2, iconeMCI: 'volleyball', corIcone: '#1976D2' }, { id: 'tarD2', materia: 'Ciências', descricao: 'Faça um foguete', recompensa: 2, iconeMCI: 'flask-outline', corIcone: '#388E3C' }, { id: 'tarD3', materia: 'Inglês', descricao: 'Complete a lição X', recompensa: 2, iconeMCI: 'abjad-english', corIcone: '#C2185B' }, ] };
const MOCK_NOTAS = { nomeAluno: "Mário Neto", anoEscolar: "301", serie: "301", matricula: "14556734", disciplinas: [ { nome: "Matemática", a1: 10, a2: 7, a3: 5 }, { nome: "Português", a1: 8, a2: 9, a3: 4 }, { nome: "Ed. Física", a1: 10, a2: 8, a3: 7 }, { nome: "Geografia", a1: 5, a2: 4, a3: 1 }, { nome: "História", a1: 8, a2: 1, a3: 7 }, { nome: "Inglês", a1: 3, a2: 8, a3: 3 }, { nome: "Ciências", a1: 1, a2: 8, a3: 5 }, ] };
const MOCK_FREQUENCIA = [ { id: 'freq1', nome: 'Matemática', iconeMCI: 'calculator-variant', corIcone: RED_ERROR, turma: 'AX', percentual: 75.90 }, { id: 'freq2', nome: 'Português', iconeMCI: 'book-open-page-variant-outline', corIcone: '#00796B', turma: 'AX', percentual: 75.90 }, { id: 'freq3', nome: 'Ed. Física', iconeMCI: 'volleyball', corIcone: '#1976D2', turma: 'AX', percentual: 75.90 }, { id: 'freq4', nome: 'Ciências', iconeMCI: 'flask-outline', corIcone: '#388E3C', turma: 'AX', percentual: 75.90 }, { id: 'freq5', nome: 'Inglês', iconeMCI: 'abjad-english', corIcone: '#C2185B', turma: 'AX', percentual: 75.90 }, { id: 'freq6', nome: 'História', iconeMCI: 'bank', corIcone: '#F57C00', turma: 'AX', percentual: 75.90 }, { id: 'freq7', nome: 'Geografia', iconeMCI: 'earth', corIcone: '#0288D1', turma: 'AX', percentual: 75.90 },];
const MOCK_NOTIFICACOES = [ { id: 'not1', iconeMCI: 'calculator-variant', corIcone: RED_ERROR, texto: 'Viviane Duarte Bonfim criou um novo trabalho para o componente curricular: "Abex III: Projeto de Software II"', tempo: '55 min. atrás' }, { id: 'not2', iconeMCI: 'book-open-page-variant-outline', corIcone: '#00796B', texto: 'Nova atividade de Português disponível: "Análise Sintática Avançada"', tempo: '1 hora atrás' }, { id: 'not3', iconeMCI: 'flask-outline', corIcone: '#388E3C', texto: 'Lembrete: Feira de Ciências amanhã!', tempo: '3 horas atrás' },];

// --- Contexto Global ---
const GlobalStateContext = createContext(undefined);
const GlobalStateProvider = ({ children }) => { const [saldoMoedas, setSaldoMoedas] = useState(950); const [pontosBonus, setPontosBonus] = useState(0); const [carrinhoLoja, setCarrinhoLoja] = useState([]); const [atividadesCompletas, setAtividadesCompletas] = useState([]); const [resumosLidos, setResumosLidos] = useState([]); const adicionarMoedas = (quantidade) => { setSaldoMoedas(prev => prev + quantidade); Alert.alert("Parabéns!", `Você ganhou ${quantidade} moedas!`); }; const gastarMoedas = (quantidade) => { setSaldoMoedas(prev => prev - quantidade); }; const adicionarPontosBonus = (quantidade) => { setPontosBonus(prev => prev + quantidade); }; const marcarAtividadeCompleta = (atividadeId, recompensa) => { if (!atividadesCompletas.includes(atividadeId)) { setAtividadesCompletas(prev => [...prev, atividadeId]); adicionarMoedas(recompensa); }}; const marcarResumoLido = (resumoId, recompensa = 5) => { if (!resumosLidos.includes(resumoId)) { setResumosLidos([...resumosLidos, resumoId]); adicionarMoedas(recompensa); } else { Alert.alert("Já Lido", "Você já marcou este resumo como lido."); }}; const adicionarAoCarrinhoLoja = (item) => setCarrinhoLoja(prev => prev.find(p => p.id === item.id) ? prev : [...prev, item]); const removerDoCarrinhoLoja = (itemId) => setCarrinhoLoja(prev => prev.filter(p => p.id !== itemId)); const limparCarrinhoLoja = () => setCarrinhoLoja([]); const calcularTotalCarrinhoLoja = () => carrinhoLoja.reduce((total, item) => total + item.precoMoedas, 0); return ( <GlobalStateContext.Provider value={{ saldoMoedas, adicionarMoedas, gastarMoedas, pontosBonus, adicionarPontosBonus, atividadesCompletas, marcarAtividadeCompleta, resumosLidos, marcarResumoLido, carrinhoLoja, adicionarAoCarrinhoLoja, removerDoCarrinhoLoja, limparCarrinhoLoja, calcularTotalCarrinhoLoja }}>{children}</GlobalStateContext.Provider> ); };
const useGlobalState = () => { const context = useContext(GlobalStateContext); if (!context) throw new Error('useGlobalState deve ser usado dentro de um GlobalStateProvider'); return context; };

// --- Componente de Cabeçalho Padrão ---
const AppHeader = ({ navigation, route, options }) => { const title = options.headerTitle !== undefined ? options.headerTitle : options.title !== undefined ? options.title : route.name; const isDrawerAvailable = !!navigation.openDrawer; let showBackButton = false; if (navigation.canGoBack()) { const parentNavigator = navigation.getParent(); if (parentNavigator && parentNavigator.getState().index > 0) { showBackButton = true; } else if (!parentNavigator && navigation.getState().index > 0) { showBackButton = true; } else if (route.name !== "Início" && route.name !== "PrincipalTabs" && route.name !== "LojaRoot" && route.name !== "DisciplinasListDrawer" && route.name !== "ProfessoresListDrawer" && route.name !== "VideosListDrawer" && route.name !== "PesquisarTab" && route.name !== "PerfilTabDrawer" && route.name !== "NotificacoesListDrawer" ) { showBackButton = true; } } const showMenuButton = isDrawerAvailable && !showBackButton; return ( <SafeAreaView style={styles.headerSafeArea}><StatusBar barStyle="light-content" backgroundColor={PRIMARY_COLOR} /><View style={styles.headerContainer}><View style={styles.headerLeft}>{showMenuButton ? ( <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.headerIconButton}><Ionicons name="menu" size={28} color={WHITE_COLOR} /></TouchableOpacity> ) : showBackButton ? ( <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIconButton}><Ionicons name="arrow-back" size={24} color={WHITE_COLOR} /></TouchableOpacity> ) : <View style={styles.headerIconButton} /> }</View><Text style={styles.headerTitle} numberOfLines={1}>{title}</Text><View style={styles.headerRight}><TouchableOpacity onPress={() => navigation.navigate('NotificacoesDrawer')} style={styles.headerIconButton}><Ionicons name="notifications-outline" size={24} color={WHITE_COLOR} /></TouchableOpacity><TouchableOpacity onPress={() => navigation.navigate('PerfilDrawer')} style={styles.headerIconButton}><Icon name="user-circle" size={24} color={WHITE_COLOR} /></TouchableOpacity></View></View></SafeAreaView> );};

// --- Conteúdo Personalizado do Drawer ---
const CustomDrawerContent = (props) => { return ( <DrawerContentScrollView {...props} contentContainerStyle={{paddingTop: 0}}><View style={styles.drawerHeader}><Icon name="user-circle" size={60} color={WHITE_COLOR} style={{marginBottom: 10}}/><Text style={styles.drawerHeaderText}>{NOME_ALUNO_EXEMPLO}</Text><Text style={styles.drawerSubHeaderText}>Matrícula: {MATRICULA_EXEMPLO}</Text></View><DrawerItemList {...props} /><DrawerItem label="Sair" icon={({ color, size }) => <Ionicons name="log-out-outline" color={color} size={size} />} onPress={() => Alert.alert("Sair", "Funcionalidade de Sair ainda não implementada.")} labelStyle={styles.drawerItemLabel} style={styles.drawerItem}/></DrawerContentScrollView> );};

// --- Telas ---
const HomeScreen = ({ navigation }) => { const renderDisciplinaItem = ({ item }) => ( <TouchableOpacity style={styles.disciplinaCard} onPress={() => navigation.navigate('DisciplinasDrawer', { screen: 'DetalhesMateria', params: { materiaId: item.id, materiaNome: item.nome, corIcone: item.cor } })}> <View style={[styles.disciplinaIconContainer, { backgroundColor: item.cor }]}> <item.iconLib name={item.iconeIon || item.iconeMCI} size={width * 0.11} color={WHITE_COLOR} /> </View> <Text style={styles.disciplinaNome}>{item.nome}</Text> </TouchableOpacity> ); const renderProfessorItem = ({ item }) => ( <TouchableOpacity style={styles.professorCard} onPress={() => navigation.navigate('ProfessoresDrawer')}><Image source={{ uri: item.imagemUrl }} style={styles.professorImagem} /><Text style={styles.professorNome}>{item.nome}</Text></TouchableOpacity> ); const renderVideoaulaItem = ({ item }) => ( <TouchableOpacity style={styles.videoaulaCard} onPress={() => navigation.navigate('VideosDrawer')}><Image source={{ uri: item.imagemUrl}} style={styles.videoaulaThumbnail} /><View style={styles.videoaulaPlayIconContainer}><Ionicons name="play-circle" size={40} color={WHITE_COLOR_TRANSLUCENT} /></View><Text style={styles.videoaulaTitulo} numberOfLines={1}>{item.titulo}</Text><Text style={styles.videoaulaProfessor}>{item.professor}</Text></TouchableOpacity> ); return ( <ScrollView style={styles.homeScreenContainer} contentContainerStyle={{paddingBottom: 20}}><View style={styles.homeHeader}><View><Text style={styles.homeSaudacao}>Seja bem-vindo</Text><Text style={styles.homeNomeAluno}>{NOME_ALUNO_EXEMPLO}!</Text></View></View><Text style={styles.sectionTitle}>Disciplinas</Text><FlatList data={DISCIPLINAS_MOCK} renderItem={renderDisciplinaItem} keyExtractor={item => item.id} numColumns={4} columnWrapperStyle={{ justifyContent: 'space-around', marginBottom: 15 }} style={{paddingHorizontal: 5}}/><Text style={styles.sectionTitle}>Professores</Text><FlatList data={PROFESSORES_MOCK} renderItem={renderProfessorItem} keyExtractor={item => item.id} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 10 }}/><Text style={styles.sectionTitle}>Videoaula</Text><FlatList data={VIDEOAULAS_MOCK} renderItem={renderVideoaulaItem} keyExtractor={item => item.id} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 10 }}/></ScrollView> );};
const DisciplinasScreen = ({ navigation }) => { const renderMateria = ({ item }) => ( <TouchableOpacity style={styles.materiaItemButton} onPress={() => navigation.navigate('DetalhesMateria', { materiaId: item.id, materiaNome: item.nome, corIcone: item.cor })}><View style={[styles.materiaItemIconContainer, {backgroundColor: item.cor || ACCENT_COLOR}]}><item.iconLib name={item.iconeIon || item.iconeMCI} size={22} color={WHITE_COLOR} /></View><Text style={styles.materiaItemText}>{item.nome}</Text><Ionicons name="chevron-forward-outline" size={22} color="#CCC" /></TouchableOpacity> ); return ( <View style={styles.screenContainerPadded}><FlatList data={DISCIPLINAS_MOCK} renderItem={renderMateria} keyExtractor={item => item.id}/></View> );};
const ResumosScreen = ({ route }) => { const { materiaId } = route.params; const { resumosLidos, marcarResumoLido } = useGlobalState(); const materia = CONTEUDO_MATERIAS_MOCK[materiaId] || { resumos: [] }; return ( <ScrollView style={styles.conteudoDetalheContainer}>{materia.resumos.length === 0 && <Text style={styles.emptyStateText}>Nenhum resumo disponível.</Text>}{materia.resumos.map(resumo => ( <View key={resumo.id} style={styles.resumoCard}><Text style={styles.resumoTitulo}>{resumo.titulo}</Text><Text style={styles.resumoConteudo}>{resumo.conteudo}</Text><TouchableOpacity style={[styles.marcarLidoButton, resumosLidos.includes(resumo.id) && styles.marcarLidoButtonDisabled]} onPress={() => marcarResumoLido(resumo.id, 5)} disabled={resumosLidos.includes(resumo.id)}><Text style={styles.marcarLidoButtonText}>{resumosLidos.includes(resumo.id) ? "Lido ✓" : "Marcar como Lido (+5 Moedas)"}</Text></TouchableOpacity></View> ))}</ScrollView> );};
const AtividadesScreen = ({ route }) => { const { materiaId } = route.params; const { atividadesCompletas, marcarAtividadeCompleta } = useGlobalState(); const [respostas, setRespostas] = useState({}); const materia = CONTEUDO_MATERIAS_MOCK[materiaId] || { atividades: [] }; const handleSelecionarOpcao = (atividadeId, opcao) => setRespostas(prev => ({ ...prev, [atividadeId]: opcao })); const handleVerificarResposta = (atividade) => { if (atividadesCompletas.includes(atividade.id)) { Alert.alert("Já Respondida"); return; } const respostaSelecionada = respostas[atividade.id]; if (!respostaSelecionada) { Alert.alert("Atenção", "Selecione uma opção."); return; } if (respostaSelecionada === atividade.respostaCorreta) { marcarAtividadeCompleta(atividade.id, atividade.recompensa); } else { Alert.alert("Incorreta", "Tente novamente!"); }}; return ( <ScrollView style={styles.conteudoDetalheContainer}>{materia.atividades.length === 0 && <Text style={styles.emptyStateText}>Nenhuma atividade disponível.</Text>}{materia.atividades.map(atividade => ( <View key={atividade.id} style={styles.atividadeCard}><Text style={styles.atividadePergunta}>{atividade.pergunta}</Text>{atividade.opcoes.map((opcao, index) => ( <TouchableOpacity key={index} style={[styles.opcaoButton, respostas[atividade.id] === opcao && styles.opcaoButtonSelected]} onPress={() => !atividadesCompletas.includes(atividade.id) && handleSelecionarOpcao(atividade.id, opcao)} disabled={atividadesCompletas.includes(atividade.id)}><Text style={[styles.opcaoText, respostas[atividade.id] === opcao && styles.opcaoTextSelected]}>{opcao}</Text></TouchableOpacity> ))}<TouchableOpacity style={[styles.verificarButton, atividadesCompletas.includes(atividade.id) && styles.verificarButtonDisabled]} onPress={() => handleVerificarResposta(atividade)} disabled={atividadesCompletas.includes(atividade.id)}><Text style={styles.verificarButtonText}>{atividadesCompletas.includes(atividade.id) ? `Correta! +${atividade.recompensa} Moedas` : "Verificar Resposta"}</Text></TouchableOpacity></View> ))}</ScrollView> );};
const TopTab = createMaterialTopTabNavigator();
const DetalhesMateriaScreen = ({ route }) => { const { materiaId, materiaNome, corIcone } = route.params; return ( <TopTab.Navigator screenOptions={{ tabBarActiveTintColor: corIcone || PRIMARY_COLOR, tabBarInactiveTintColor: TEXT_COLOR_MUTED, tabBarIndicatorStyle: { backgroundColor: corIcone || PRIMARY_COLOR, height: 3 }, tabBarLabelStyle: { fontSize: 13, fontWeight: 'bold' }, tabBarStyle: { backgroundColor: WHITE_COLOR, elevation: 1, shadowOpacity: 0.1 }, }}><TopTab.Screen name="Resumos" component={ResumosScreen} initialParams={{ materiaId }} /><TopTab.Screen name="Atividades" component={AtividadesScreen} initialParams={{ materiaId }} /></TopTab.Navigator> );};

const LojaPontosScreen = ({ navigation }) => { const { carrinhoLoja, adicionarAoCarrinhoLoja, removerDoCarrinhoLoja, calcularTotalCarrinhoLoja } = useGlobalState(); const toggleItemCarrinho = (item) => { if (carrinhoLoja.find(p => p.id === item.id)) removerDoCarrinhoLoja(item.id); else adicionarAoCarrinhoLoja(item); }; const totalCarrinho = calcularTotalCarrinhoLoja(); const handleCheckout = () => { if (carrinhoLoja.length === 0) { Alert.alert("Carrinho vazio!"); return; } navigation.navigate('LojaPagamento'); }; const renderLojaItem = ({ item }) => ( <View style={styles.lojaPontoItemCard}><View style={[styles.lojaPontoIconContainer, { backgroundColor: item.corIcone }]}><MaterialCommunityIcons name={item.iconeMCI} size={28} color={WHITE_COLOR} /></View><View style={styles.lojaPontoInfo}><Text style={styles.lojaPontoNome}>{item.nome}</Text><Text style={styles.lojaPontoDetalhe}>Quantidade de pontos: {item.pontos}</Text></View><View style={styles.lojaPontoAcao}><Text style={styles.lojaPontoPreco}>${item.precoMoedas}</Text><TouchableOpacity onPress={() => toggleItemCarrinho(item)} style={styles.lojaPontoAddButton}><Ionicons name={carrinhoLoja.find(i => i.id === item.id) ? "checkmark-circle" : "add-circle"} size={30} color={carrinhoLoja.find(i => i.id === item.id) ? GREEN_SUCCESS : PRIMARY_COLOR} /></TouchableOpacity></View></View> ); return ( <View style={{flex: 1, backgroundColor: LIGHT_BG_COLOR}}><FlatList data={MOCK_LOJA_PONTOS} renderItem={renderLojaItem} keyExtractor={item => item.id} contentContainerStyle={{padding: 10, paddingBottom: carrinhoLoja.length > 0 ? (Platform.OS === 'ios' ? 140 : 120) : 10 }}/><ConditionalDisplay condition={carrinhoLoja.length > 0}><View style={styles.lojaCarrinhoResumoContainer}><Text style={styles.lojaCarrinhoResumoTitulo}>Carrinho</Text>{carrinhoLoja.map(item => (<View key={item.id} style={styles.lojaCarrinhoItem}><Text style={styles.lojaCarrinhoItemTexto}>{item.nome}</Text><Text style={styles.lojaCarrinhoItemTexto}>${item.precoMoedas}</Text></View>))}<View style={styles.lojaCarrinhoTotalLinha}><Text style={styles.lojaCarrinhoResumoTextoBold}>Total:</Text><Text style={styles.lojaCarrinhoResumoTextoBold}>${totalCarrinho} Moedas</Text></View><TouchableOpacity style={styles.lojaCarrinhoResumoBotao} onPress={handleCheckout}><Text style={styles.lojaCarrinhoResumoBotaoTexto}>Realizar Transferência</Text><Ionicons name="arrow-forward-outline" size={18} color={WHITE_COLOR} style={{marginLeft: 8}}/></TouchableOpacity></View></ConditionalDisplay></View> );};
const LojaPagamentoScreen = ({ navigation }) => { const { carrinhoLoja, saldoMoedas, gastarMoedas, adicionarPontosBonus, limparCarrinhoLoja, calcularTotalCarrinhoLoja } = useGlobalState(); const totalCompraMoedas = calcularTotalCarrinhoLoja(); const totalPontosAdquiridos = carrinhoLoja.reduce((total, item) => total + item.pontos, 0); const handleComprar = () => { if (saldoMoedas < totalCompraMoedas) { Alert.alert("Moedas Insuficientes", `Você precisa de ${totalCompraMoedas} moedas.`); return; } gastarMoedas(totalCompraMoedas); adicionarPontosBonus(totalPontosAdquiridos); navigation.replace('LojaRecibo', { itensComprados: carrinhoLoja, totalPago: totalCompraMoedas, pontosGanhos: totalPontosAdquiridos }); limparCarrinhoLoja(); }; return ( <ScrollView style={styles.lojaPagamentoScroll} contentContainerStyle={{ paddingBottom: 20 }}><View style={styles.lojaPagamentoCard}><Text style={styles.lojaPagamentoCardTitle}>Itens da compra</Text>{carrinhoLoja.map(item => ( <View key={item.id} style={styles.lojaPagamentoItemLinha}><Text style={styles.lojaPagamentoItemTexto}>{item.nome} (+{item.pontos} pts)</Text><Text style={styles.lojaPagamentoItemPreco}>${item.precoMoedas}</Text></View> ))}<View style={styles.lojaPagamentoSeparador} /><View style={styles.lojaPagamentoItemLinha}><Text style={styles.lojaPagamentoTotalTexto}>Total de Matérias:</Text><Text style={styles.lojaPagamentoTotalValor}>{carrinhoLoja.length}</Text></View><View style={styles.lojaPagamentoItemLinha}><Text style={styles.lojaPagamentoTotalTextoBold}>Total:</Text><Text style={styles.lojaPagamentoTotalValorBold}>${totalCompraMoedas} Moedas</Text></View></View><Ionicons name="cash-outline" size={60} color={PRIMARY_COLOR} style={styles.lojaPagamentoIconeCentral} /><View style={styles.lojaPagamentoInfoCartao}><Text style={styles.lojaPagamentoInfoCartaoTitulo}>Informações do cartão</Text><View style={styles.lojaPagamentoInfoCartaoRow}><View><Text style={styles.lojaPagamentoInfoCartaoSaldo}>${saldoMoedas}</Text><Text style={styles.lojaPagamentoInfoCartaoLabel}>Moedas</Text></View><MaterialCommunityIcons name="school-outline" size={40} color={WHITE_COLOR} /></View><View style={styles.lojaPagamentoInfoCartaoRow}><View><Text style={styles.lojaPagamentoInfoCartaoLabelPequeno}>Matrícula</Text><Text style={styles.lojaPagamentoInfoCartaoValorPequeno}>{MATRICULA_EXEMPLO}</Text></View><View style={{alignItems: 'flex-end'}}><Text style={styles.lojaPagamentoInfoCartaoLabelPequeno}>Aluno (a)</Text><Text style={styles.lojaPagamentoInfoCartaoValorPequeno}>{NOME_ALUNO_EXEMPLO}</Text></View></View></View><TouchableOpacity style={[styles.lojaPagamentoBotaoComprar, saldoMoedas < totalCompraMoedas && styles.lojaPagamentoBotaoComprarDisabled]} onPress={handleComprar} disabled={saldoMoedas < totalCompraMoedas}><Text style={styles.lojaPagamentoBotaoComprarTexto}>{saldoMoedas < totalCompraMoedas ? "Moedas Insuficientes" : "Comprar"}</Text></TouchableOpacity></ScrollView> );};
const LojaReciboScreen = ({ route, navigation }) => { const { saldoMoedas } = useGlobalState(); const { itensComprados, totalPago, pontosGanhos } = route.params; const handleFinalizar = () => { navigation.popToTop(); navigation.navigate('LojaRoot');}; return ( <ScrollView style={styles.lojaPagamentoScroll} contentContainerStyle={{ alignItems: 'center', paddingBottom: 20 }} onStartShouldSetResponder={() => true} onResponderRelease={handleFinalizar}><View style={styles.lojaReciboHeader}><Text style={styles.lojaReciboHeaderText}>Compra realizada!</Text><Text style={styles.lojaReciboSubHeaderText}>Esse é o seu recibo!</Text></View><View style={[styles.lojaPagamentoCard, {marginTop: 20}]}><Text style={styles.lojaPagamentoCardTitle}>Itens da compra</Text>{itensComprados.map(item => ( <View key={item.id} style={styles.lojaPagamentoItemLinha}><Text style={styles.lojaPagamentoItemTexto}>{item.nome} (+{item.pontos} pts)</Text><Text style={styles.lojaPagamentoItemPreco}>${item.precoMoedas}</Text></View> ))}<View style={styles.lojaPagamentoSeparador} /><View style={styles.lojaPagamentoItemLinha}><Text style={styles.lojaPagamentoTotalTexto}>Total de Matérias:</Text><Text style={styles.lojaPagamentoTotalValor}>{itensComprados.length}</Text></View><View style={styles.lojaPagamentoItemLinha}><Text style={styles.lojaPagamentoTotalTextoBold}>Total Pago:</Text><Text style={styles.lojaPagamentoTotalValorBold}>${totalPago} Moedas</Text></View></View><Ionicons name="cash-outline" size={60} color={PRIMARY_COLOR} style={styles.lojaPagamentoIconeCentral} /><View style={[styles.lojaPagamentoInfoCartao, {marginBottom: 20}]}><Text style={styles.lojaPagamentoInfoCartaoTitulo}>Informações do cartão</Text><View style={styles.lojaPagamentoInfoCartaoRow}><View><Text style={styles.lojaPagamentoInfoCartaoSaldo}>${saldoMoedas}</Text><Text style={styles.lojaPagamentoInfoCartaoLabel}>Moedas (Saldo Restante)</Text></View><MaterialCommunityIcons name="school-outline" size={40} color={WHITE_COLOR} /></View><View style={styles.lojaPagamentoInfoCartaoRow}><View><Text style={styles.lojaPagamentoInfoCartaoLabelPequeno}>Matrícula</Text><Text style={styles.lojaPagamentoInfoCartaoValorPequeno}>{MATRICULA_EXEMPLO}</Text></View><View style={{alignItems: 'flex-end'}}><Text style={styles.lojaPagamentoInfoCartaoLabelPequeno}>Aluno (a)</Text><Text style={styles.lojaPagamentoInfoCartaoValorPequeno}>{NOME_ALUNO_EXEMPLO}</Text></View></View></View><Text style={{color: TEXT_COLOR_MUTED, marginVertical: 20, fontWeight: 'bold'}}>Toque na tela para continuar.</Text></ScrollView> );};

const ResgatarTarefasScreen = () => { const { saldoMoedas, atividadesCompletas, marcarAtividadeCompleta } = useGlobalState(); const renderTarefaItem = (tarefa, tipo) => ( <View key={tarefa.id} style={styles.resgatarTarefaCard}><View style={styles.resgatarTarefaIconContainer}><View style={[styles.resgatarTarefaIconBg, { backgroundColor: tarefa.corIcone }]}><MaterialCommunityIcons name={tarefa.iconeMCI} size={24} color={WHITE_COLOR} /></View></View><View style={styles.resgatarTarefaInfo}><Text style={styles.resgatarTarefaMateria}>{tarefa.materia}</Text><Text style={styles.resgatarTarefaDescricao}>{tarefa.descricao}</Text></View><View style={styles.resgatarTarefaRecompensaContainer}><Text style={styles.resgatarTarefaRecompensa}>{tarefa.recompensa} moedas</Text></View><TouchableOpacity style={[styles.resgatarTarefaBotao, atividadesCompletas.includes(tarefa.id) && styles.resgatarTarefaBotaoResgatado]} onPress={() => marcarAtividadeCompleta(tarefa.id, tarefa.recompensa)} disabled={atividadesCompletas.includes(tarefa.id)}><Text style={styles.resgatarTarefaBotaoTexto}>{atividadesCompletas.includes(tarefa.id) ? "Resgatado!" : "Resgatar"}</Text></TouchableOpacity></View> ); return ( <ScrollView style={styles.screenContainerPaddedPurpleBG} contentContainerStyle={{ paddingBottom: 20 }}><Text style={styles.resgatarSaldo}>Saldo Atual: ${saldoMoedas} moedas</Text><Text style={styles.sectionTitleAlt}>Semanais</Text>{MOCK_TAREFAS_RESGATE.semanais.map(tarefa => renderTarefaItem(tarefa, 'semanal'))}<Text style={styles.sectionTitleAlt}>Diárias</Text>{MOCK_TAREFAS_RESGATE.diarias.map(tarefa => renderTarefaItem(tarefa, 'diaria'))}</ScrollView> );};
const NotasScreen = () => { const { nomeAluno, anoEscolar, serie, matricula, disciplinas } = MOCK_NOTAS; return ( <ScrollView style={styles.screenContainerPaddedPurpleBG} contentContainerStyle={{ paddingBottom: 20 }}><View style={styles.notasInfoContainer}><View><Text style={styles.notasInfoLabel}>Nome: <Text style={styles.notasInfoValor}>{nomeAluno}</Text></Text><Text style={styles.notasInfoLabel}>Série: <Text style={styles.notasInfoValor}>{serie}</Text></Text></View><View style={{alignItems: 'flex-end'}}><Text style={styles.notasInfoLabel}>Ano escolar: <Text style={styles.notasInfoValor}>{anoEscolar}</Text></Text><Text style={styles.notasInfoLabel}>Matrícula: <Text style={styles.notasInfoValor}>{matricula}</Text></Text></View></View><View style={styles.notasTabelaContainer}><View style={styles.notasTabelaHeaderRow}><Text style={[styles.notasTabelaHeaderCell, {flex: 2}]}>Disciplina</Text><Text style={styles.notasTabelaHeaderCell}>A1</Text><Text style={styles.notasTabelaHeaderCell}>A2</Text><Text style={styles.notasTabelaHeaderCell}>A3</Text></View>{disciplinas.map((d, index) => ( <View key={index} style={styles.notasTabelaRow}><Text style={[styles.notasTabelaCell, {flex: 2, fontWeight: 'bold'}]}>{d.nome}</Text><Text style={styles.notasTabelaCell}>{d.a1}</Text><Text style={styles.notasTabelaCell}>{d.a2}</Text><Text style={styles.notasTabelaCell}>{d.a3}</Text></View> ))}</View><View style={[styles.notasBottomContainer]}><View style={[styles.notasBottomCard, styles.notasBottomCardInfo]}><Text style={styles.notasBottomCardTitle}>Informações</Text><TouchableOpacity style={styles.notasInfoButton}><Text style={styles.notasInfoButtonText}>Ausências</Text></TouchableOpacity><TouchableOpacity style={styles.notasInfoButton}><Text style={styles.notasInfoButtonText}>Faltas</Text></TouchableOpacity><TouchableOpacity style={styles.notasInfoButton}><Text style={styles.notasInfoButtonText}>Ausências Justificadas</Text></TouchableOpacity></View><View style={styles.notasBottomCard}><Text style={styles.notasBottomCardTitle}>Comentários</Text><TextInput style={styles.notasComentariosInput} placeholder="Escreva seus comentários aqui..." multiline numberOfLines={Platform.OS === 'ios' ? 5 : 4} placeholderTextColor="#999" /></View></View></ScrollView> );};
const FrequenciaScreen = () => { return ( <ScrollView style={styles.screenContainerPaddedPurpleBG} contentContainerStyle={{ paddingBottom: 20 }}>{MOCK_FREQUENCIA.map(item => ( <View key={item.id} style={styles.frequenciaCard}><View style={[styles.lojaItemIconContainer, { backgroundColor: item.corIcone, marginRight: 15 }]}><MaterialCommunityIcons name={item.iconeMCI} size={24} color={WHITE_COLOR} /></View><View style={{flex: 1}}><Text style={styles.frequenciaNome}>{item.nome}</Text><Text style={styles.frequenciaTurma}>Turma: {item.turma}</Text></View><View style={[styles.frequenciaCirculo, {borderColor: item.corIcone}]}><Text style={[styles.frequenciaPercentual, {color: item.corIcone}]}>{item.percentual.toFixed(1)}%</Text></View></View> ))}</ScrollView> );};
const NotificacoesScreen = () => { return ( <ScrollView style={styles.screenContainerPaddedPurpleBG} contentContainerStyle={{ paddingBottom: 20 }}>{MOCK_NOTIFICACOES.map(notif => ( <View key={notif.id} style={styles.notificacaoCard}><View style={[styles.lojaItemIconContainer, { backgroundColor: notif.corIcone, marginRight: 15 }]}><MaterialCommunityIcons name={notif.iconeMCI} size={24} color={WHITE_COLOR} /></View><View style={{flex: 1}}><Text style={styles.notificacaoTexto}>{notif.texto}</Text><Text style={styles.notificacaoTempo}>{notif.tempo}</Text></View></View> ))}</ScrollView> );};
const ProfessoresScreen = () => (<View style={styles.placeholderContainer}><Ionicons name="people-circle-outline" size={80} color={TEXT_COLOR_MUTED} /><Text style={styles.placeholderText}>Professores</Text><Text style={styles.placeholderSubText}>(Em Desenvolvimento)</Text></View>);
const VideosScreen = () => (<View style={styles.placeholderContainer}><Ionicons name="videocam-outline" size={80} color={TEXT_COLOR_MUTED} /><Text style={styles.placeholderText}>Videoaulas</Text><Text style={styles.placeholderSubText}>(Em Desenvolvimento)</Text></View>);
const PesquisarScreen = () => ( <View style={styles.screenContainerPadded}><View style={styles.searchContainer}><Ionicons name="search" size={20} color={TEXT_COLOR_MUTED} style={styles.searchIcon}/><TextInput placeholder="Pesquisar no app..." style={styles.searchInput} placeholderTextColor={TEXT_COLOR_MUTED}/></View><View style={styles.placeholderContainer}><Ionicons name="search-circle-outline" size={80} color={TEXT_COLOR_MUTED} /><Text style={styles.placeholderText}>Pesquisa</Text><Text style={styles.placeholderSubText}>(Funcionalidade em breve)</Text></View></View> );
const PerfilScreen = () => { const { saldoMoedas } = useGlobalState(); return ( <ScrollView contentContainerStyle={styles.screenContainerPadded}><View style={{alignItems: 'center', marginBottom: 25}}><Icon name="user-circle" size={90} color={PRIMARY_COLOR} /><Text style={[styles.mainTitle, {textAlign: 'center', marginTop: 10, marginBottom: 5}]}>{NOME_ALUNO_EXEMPLO}</Text><Text style={styles.subtitle}>Matrícula: {MATRICULA_EXEMPLO}</Text></View><View style={styles.perfilInfoCard}><View style={styles.perfilInfoItem}><Ionicons name="wallet-outline" size={24} color={PRIMARY_COLOR} style={styles.perfilInfoIcon} /><Text style={styles.perfilInfoLabel}>Saldo de Moedas:</Text><Text style={[styles.perfilInfoValor, {color: '#DAA520'}]}>${saldoMoedas}</Text></View><View style={[styles.perfilInfoItem, styles.perfilInfoItemLast]}><Ionicons name="mail-outline" size={24} color={PRIMARY_COLOR} style={styles.perfilInfoIcon} /><Text style={styles.perfilInfoLabel}>Email:</Text><Text style={styles.perfilInfoValor}>aluno@exemplo.com</Text></View></View><TouchableOpacity style={[styles.perfilActionButton]}><Ionicons name="pencil-outline" size={20} color={WHITE_COLOR} style={styles.perfilActionButtonIcon} /><Text style={styles.perfilActionButtonText}>Editar Perfil</Text></TouchableOpacity><TouchableOpacity style={[styles.perfilActionButton, {backgroundColor: RED_ERROR, marginTop: 12}]}><Ionicons name="log-out-outline" size={20} color={WHITE_COLOR} style={styles.perfilActionButtonIcon} /><Text style={styles.perfilActionButtonText}>Sair</Text></TouchableOpacity></ScrollView> );};

// --- Navegadores ---
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DisciplinasStackNavigatorDrawer = () => ( <Stack.Navigator screenOptions={{ header: AppHeader }}><Stack.Screen name="DisciplinasListDrawer" component={DisciplinasScreen} options={{ title: 'Disciplinas' }}/><Stack.Screen name="DetalhesMateria" component={DetalhesMateriaScreen} options={({ route }) => ({ title: route.params.materiaNome || 'Detalhes' })}/></Stack.Navigator> );
const LojaStackNavigator = () => ( <Stack.Navigator screenOptions={{ header: AppHeader }}><Stack.Screen name="LojaRoot" component={LojaPontosScreen} options={{ title: 'Loja de Pontos' }}/><Stack.Screen name="LojaPagamento" component={LojaPagamentoScreen} options={{ title: 'Pagamento' }}/><Stack.Screen name="LojaRecibo" component={LojaReciboScreen} options={{ title: 'Recibo' }}/></Stack.Navigator> );

const MainBottomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        const iconColor = focused ? ICON_COLOR_ACTIVE_TAB : ICON_COLOR_INACTIVE_TAB;
        size = Platform.OS === 'ios' ? 28 : 24;
        if (route.name === 'Início') iconName = focused ? 'home-sharp' : 'home-outline';
        else if (route.name === 'LojaTab') iconName = focused ? 'card-sharp' : 'card-outline';
        else if (route.name === 'PesquisarTab') iconName = focused ? 'search-sharp' : 'search-outline';
        else if (route.name === 'PerfilTab') iconName = focused ? 'person-circle-sharp' : 'person-circle-outline';
        else iconName = 'ellipse-outline';
        return <Ionicons name={iconName} size={size} color={iconColor} />;
      },
      tabBarActiveTintColor: ICON_COLOR_ACTIVE_TAB,
      tabBarInactiveTintColor: ICON_COLOR_INACTIVE_TAB,
      tabBarStyle: styles.tabBarStyle,
      tabBarLabelStyle: styles.tabBarLabelStyle,
      header: AppHeader,
    })}
  >
    <Tab.Screen name="Início" component={HomeScreen} />
    <Tab.Screen name="LojaTab" component={LojaStackNavigator} options={{ title: 'Loja', headerShown: false }} />
    <Tab.Screen name="PesquisarTab" component={PesquisarScreen} options={{ title: 'Pesquisar' }} />
    <Tab.Screen name="PerfilTab" component={PerfilScreen} options={{ title: 'Perfil' }} />
  </Tab.Navigator>
);

const AppDrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={({ navigation, route }) => ({
        header: (props) => <AppHeader {...props} navigation={navigation} route={route} />,
        drawerActiveTintColor: ICON_COLOR_DRAWER_ACTIVE,
        drawerInactiveTintColor: ICON_COLOR_DRAWER_INACTIVE,
        drawerActiveBackgroundColor: LIGHT_BG_COLOR,
        drawerLabelStyle: styles.drawerItemLabel,
        drawerItemStyle: styles.drawerItem,
        drawerStyle: { backgroundColor: WHITE_COLOR, width: width * 0.82 },
    })}
  >
    <Drawer.Screen name="PrincipalTabs" component={MainBottomTabNavigator} options={{ title: 'Início', drawerIcon: ({ color, size }) => <Ionicons name="home-sharp" color={color} size={size-2} />, headerShown: false, }} />
    <Drawer.Screen name="DisciplinasDrawer" component={DisciplinasStackNavigatorDrawer} options={{ title: 'Disciplinas (Conteúdo)', drawerIcon: ({color,size}) => <Ionicons name="library-sharp" color={color} size={size-2}/>, headerShown: false, }} />
    <Drawer.Screen name="LojaDrawer" component={LojaStackNavigator} options={{ title: "Loja de Pontos", drawerIcon: ({color,size}) => <Ionicons name="card-sharp" color={color} size={size-2}/>, headerShown: false}}/>
    <Drawer.Screen name="ResgatarDrawer" component={ResgatarTarefasScreen} options={{ title: "Resgatar Tarefas", drawerIcon: ({color,size}) => <Ionicons name="trophy-sharp" color={color} size={size-2}/>}}/>
    <Drawer.Screen name="NotasDrawer" component={NotasScreen} options={{ title: "Minhas Notas", drawerIcon: ({color,size}) => <Ionicons name="analytics-sharp" color={color} size={size-2}/>}}/>
    <Drawer.Screen name="FrequenciaDrawer" component={FrequenciaScreen} options={{ title: "Frequência", drawerIcon: ({color,size}) => <Ionicons name="pie-chart-sharp" color={color} size={size-2}/>}}/>
    <Drawer.Screen name="ProfessoresDrawer" component={ProfessoresScreen} options={{ title: "Professores", drawerIcon: ({color,size}) => <Ionicons name="people-sharp" color={color} size={size-2}/>}}/>
    <Drawer.Screen name="VideosDrawer" component={VideosScreen} options={{ title: "Videoaulas", drawerIcon: ({color,size}) => <Ionicons name="play-circle-sharp" color={color} size={size-2}/>}}/>
    <Drawer.Screen name="NotificacoesDrawer" component={NotificacoesScreen} options={{ title: "Notificações", drawerIcon: ({color,size}) => <Ionicons name="notifications-sharp" color={color} size={size-2}/>}}/>
    <Drawer.Screen name="PerfilDrawer" component={PerfilScreen} options={{ title: "Meu Perfil", drawerIcon: ({color,size}) => <Ionicons name="person-circle-sharp" color={color} size={size-2}/>}}/>
  </Drawer.Navigator>
);

const ConditionalDisplay = ({ condition, children }) => condition ? children : null;

export default function App() { return ( <GlobalStateProvider><NavigationContainer><AppDrawerNavigator /></NavigationContainer></GlobalStateProvider> ); }

// --- Estilos ---
const styles = StyleSheet.create({
  headerSafeArea: { backgroundColor: PRIMARY_COLOR, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, },
  headerContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: PRIMARY_COLOR, paddingHorizontal: 0, height: 55, },
  headerLeft: { flex: 0.15, alignItems: 'flex-start', justifyContent: 'center', paddingLeft:5 },
  headerIconButton: { paddingHorizontal: 10, paddingVertical: 8, minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: WHITE_COLOR, fontSize: 17, fontWeight: '600', textAlign: 'center', flex: 0.7, },
  headerRight: { flex: 0.15, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingRight:0},
  avatarPlaceholder: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)' },
  drawerHeader: { backgroundColor: PRIMARY_COLOR, paddingHorizontal: 20, paddingVertical: 30, alignItems: 'flex-start', marginBottom: 8, },
  drawerHeaderText: { color: WHITE_COLOR, fontSize: 18, fontWeight: 'bold', marginTop: 10, },
  drawerSubHeaderText: { color: '#E0E0E0', fontSize: 14, },
  drawerItem: { marginVertical: 0, marginHorizontal: 5, paddingVertical: 1 },
  drawerItemLabel: { marginLeft: -18, fontSize: 15, fontWeight: '500', paddingVertical: 3 },
  tabBarStyle: { backgroundColor: WHITE_COLOR, borderTopColor: '#E0E0E0', borderTopWidth: Platform.OS === 'ios' ? 0.5 : 1, height: Platform.OS === 'ios' ? 85 : 60, paddingBottom: Platform.OS === 'ios' ? 25 : 5, paddingTop: 5, },
  tabBarLabelStyle: { fontSize: 10, fontWeight: '500', marginTop: -5, marginBottom: Platform.OS === 'ios' ? 0 : 5 },
  homeScreenContainer: { flex: 1, backgroundColor: LIGHT_BG_COLOR, },
  homeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: PRIMARY_COLOR, paddingHorizontal: 20, paddingTop: Platform.OS === 'ios' ? 20 : 15, paddingBottom: 25, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, marginBottom: 10, },
  homeSaudacao: { fontSize: 18, color: WHITE_COLOR_TRANSLUCENT, },
  homeNomeAluno: { fontSize: 26, fontWeight: 'bold', color: WHITE_COLOR, },
  sectionTitle: { fontSize: 19, fontWeight: 'bold', color: TEXT_COLOR_DARK, marginHorizontal: 20, marginTop: 20, marginBottom: 15, },
  disciplinaCard: { alignItems: 'center', width: width / 4 - 15, marginHorizontal: 5, },
  disciplinaIconContainer: { width: width * 0.19, height: width * 0.19, borderRadius: (width * 0.19) / 2, justifyContent: 'center', alignItems: 'center', marginBottom: 8, elevation: 5, shadowColor: BLACK_COLOR, shadowOpacity: 0.3, shadowRadius: 5, shadowOffset: {width: 0, height: 4} },
  disciplinaNome: { fontSize: 11, color: TEXT_COLOR_DARK, textAlign: 'center', fontWeight: '500' },
  professorCard: { marginRight: 15, alignItems: 'center', width: width * 0.28, backgroundColor: WHITE_COLOR, paddingVertical:10, paddingHorizontal:5, borderRadius:12, elevation:3, shadowOpacity:0.15, shadowRadius:3 },
  professorImagem: { width: width * 0.22, height: width * 0.22, borderRadius: 12, marginBottom: 8, },
  professorNome: { fontSize: 13, color: TEXT_COLOR_DARK, textAlign: 'center', fontWeight:'500' },
  videoaulaCard: { marginRight: 15, width: width * 0.7, backgroundColor: WHITE_COLOR, borderRadius: 12, elevation: 3, shadowOpacity: 0.15, shadowRadius: 4, overflow: 'hidden' },
  videoaulaThumbnail: { width: '100%', height: height * 0.16, backgroundColor: PRIMARY_COLOR_LIGHT },
  videoaulaPlayIconContainer: { position: 'absolute', top: 0, left: 0, right: 0, bottom: '25%', justifyContent: 'center', alignItems: 'center' },
  videoaulaTitulo: { fontSize: 14, fontWeight: 'bold', color: TEXT_COLOR_DARK, paddingHorizontal: 10, marginTop: 8 },
  videoaulaProfessor: { fontSize: 12, color: TEXT_COLOR_MUTED, paddingHorizontal: 10, marginBottom: 10 },
  screenContainerPadded: { flexGrow: 1, padding: 15, backgroundColor: LIGHT_BG_COLOR, },
  mainTitle: { fontSize: 22, fontWeight: 'bold', color: PRIMARY_COLOR, marginBottom: 15, },
  subtitle: { fontSize: 15, color: TEXT_COLOR_MUTED, marginBottom: 20, },
  materiaItemButton: { backgroundColor: WHITE_COLOR, paddingVertical: 12, paddingHorizontal: 15, borderRadius: 10, flexDirection: 'row', alignItems: 'center', marginBottom: 10, elevation: 1, shadowOpacity: 0.05, shadowRadius: 2, },
  materiaItemIconContainer: { width: 38, height: 38, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 15, },
  materiaItemText: { fontSize: 16, color: TEXT_COLOR_DARK, flex: 1, fontWeight: '500' },
  conteudoDetalheContainer: { flex: 1, backgroundColor: LIGHT_BG_COLOR, padding:15, },
  resumoCard: { backgroundColor: WHITE_COLOR, padding: 15, borderRadius: 8, marginBottom: 15, elevation: 1, shadowOpacity: 0.05 },
  resumoTitulo: { fontSize: 17, fontWeight: 'bold', color: PRIMARY_COLOR, marginBottom: 8, },
  resumoConteudo: { fontSize: 14, color: TEXT_COLOR_DARK, lineHeight: 21, },
  marcarLidoButton: { backgroundColor: ACCENT_COLOR, paddingVertical: 10, borderRadius: 6, marginTop: 15, alignItems: 'center' },
  marcarLidoButtonDisabled: { backgroundColor: GREEN_SUCCESS },
  marcarLidoButtonText: { color: WHITE_COLOR, fontWeight: 'bold', fontSize: 13 },
  atividadeCard: { backgroundColor: WHITE_COLOR, padding: 15, borderRadius: 8, marginBottom: 15, elevation: 1, shadowOpacity: 0.05 },
  atividadePergunta: { fontSize: 15, fontWeight: 'bold', color: TEXT_COLOR_DARK, marginBottom: 12, lineHeight: 20 },
  opcaoButton: { backgroundColor: LIGHT_BG_COLOR, paddingVertical: 12, paddingHorizontal:15, borderRadius: 6, marginBottom: 8, borderWidth: 1, borderColor: '#DDD' },
  opcaoButtonSelected: { backgroundColor: PRIMARY_COLOR_LIGHT, borderColor: PRIMARY_COLOR },
  opcaoText: { fontSize: 14, color: TEXT_COLOR_DARK },
  opcaoTextSelected: { color: WHITE_COLOR, fontWeight: '500' },
  verificarButton: { backgroundColor: ACCENT_COLOR, paddingVertical: 12, borderRadius: 6, marginTop: 10, alignItems: 'center' },
  verificarButtonDisabled: { backgroundColor: GREEN_SUCCESS },
  verificarButtonText: { color: WHITE_COLOR, fontWeight: 'bold', fontSize: 14 },
  emptyStateText: { textAlign: 'center', color: TEXT_COLOR_MUTED, fontSize: 15, marginTop: 30 },
  placeholderContainer: {flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: LIGHT_BG_COLOR, padding: 20},
  placeholderText: {fontSize: 20, fontWeight:'bold', color: TEXT_COLOR_MUTED, textAlign:'center', marginBottom:5},
  placeholderSubText: {fontSize: 14, color: TEXT_COLOR_MUTED, textAlign:'center'},
  searchContainer: {flexDirection: 'row', alignItems: 'center', backgroundColor: WHITE_COLOR, borderRadius: 10, paddingHorizontal: 15, marginBottom: 20, elevation:2, shadowOpacity:0.1},
  searchIcon: {marginRight: 10},
  searchInput: {flex:1, height: 50, fontSize: 16, color: TEXT_COLOR_DARK},
  perfilInfoCard: { backgroundColor: WHITE_COLOR, borderRadius: 10, paddingVertical: 5, paddingHorizontal:15, marginBottom: 25, shadowColor: "#000", shadowOffset: { width: 0, height: 1, }, shadowOpacity: 0.1, shadowRadius: 2.0, elevation: 2, },
  perfilInfoItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F0F0F0', },
  perfilInfoItemLast: { borderBottomWidth: 0, },
  perfilInfoIcon: { marginRight: 18, width: 24, textAlign: 'center' },
  perfilInfoLabel: { fontSize: 16, color: TEXT_COLOR_DARK, flex: 1 },
  perfilInfoValor: { fontSize: 16, fontWeight: '600', color: TEXT_COLOR_DARK },
  perfilActionButton: { flexDirection: 'row', backgroundColor: ACCENT_COLOR, paddingVertical: 14, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginTop: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.15, shadowRadius: 3.0, elevation: 3, },
  perfilActionButtonIcon: { marginRight: 10, },
  perfilActionButtonText: { color: WHITE_COLOR, fontSize: 16, fontWeight: 'bold', },
  notasInfoContainer: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: WHITE_COLOR, padding: 15, borderRadius: 10, marginBottom: 15, },
  notasInfoLabel: { fontSize: 13, color: '#555', },
  notasInfoValor: { fontWeight: 'bold', color: TEXT_COLOR_DARK, },
  notasTabelaContainer: { backgroundColor: WHITE_COLOR, borderRadius: 10, marginBottom: 15, overflow: 'hidden', },
  notasTabelaHeaderRow: { flexDirection: 'row', backgroundColor: PRIMARY_COLOR, paddingVertical: 12, paddingHorizontal: 10, },
  notasTabelaHeaderCell: { flex: 1, color: WHITE_COLOR, fontWeight: 'bold', fontSize: 13, textAlign: 'center', },
  notasTabelaRow: { flexDirection: 'row', paddingVertical: 12, paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: '#F0F0F0', },
  notasTabelaCell: { flex: 1, fontSize: 14, color: TEXT_COLOR_DARK, textAlign: 'center', },
  notasBottomContainer: { flexDirection: Platform.OS === 'web' ? 'column' : 'row', justifyContent: 'space-between', gap: 10, },
  notasBottomCard: { flex: 1, backgroundColor: WHITE_COLOR, borderRadius: 10, padding: 15, marginBottom: Platform.OS === 'web' ? 10 : 0, },
  notasBottomCardTitle: { fontSize: 15, fontWeight: 'bold', color: PRIMARY_COLOR, marginBottom: 10, },
  notasInfoButton: { backgroundColor: PRIMARY_COLOR, paddingVertical: 12, paddingHorizontal: 15, borderRadius: 8, marginBottom: 10, alignItems: 'center', },
  notasInfoButtonText: { color: WHITE_COLOR, fontSize: 14, fontWeight: '500', },
  notasComentariosInput: { backgroundColor: '#F7F7F7', borderRadius: 6, padding: 10, fontSize: 13, textAlignVertical: 'top', minHeight: 80, color: TEXT_COLOR_DARK, },
  frequenciaCard: { backgroundColor: WHITE_COLOR, borderRadius: 10, padding: 15, marginBottom: 10, flexDirection: 'row', alignItems: 'center', },
  frequenciaNome: { fontSize: 16, fontWeight: 'bold', color: TEXT_COLOR_DARK, },
  frequenciaTurma: { fontSize: 12, color: '#666', },
  frequenciaCirculo: { width: 60, height: 60, borderRadius: 30, borderWidth: 4, justifyContent: 'center', alignItems: 'center', },
  frequenciaPercentual: { fontSize: 13, fontWeight: 'bold', },
  notificacaoCard: { backgroundColor: WHITE_COLOR, borderRadius: 10, padding: 15, marginBottom: 10, flexDirection: 'row', alignItems: 'center', },
  notificacaoTexto: { fontSize: 13, color: TEXT_COLOR_DARK, lineHeight: 18, flexShrink: 1, },
  notificacaoTempo: { fontSize: 11, color: '#777', marginTop: 4, },
  // Estilos para Loja de Pontos (baseado em 121.jpg)
  lojaPontoItemCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: CARD_BG_COLOR, borderRadius: 10, paddingHorizontal: 10, paddingVertical:12, marginBottom: 10, elevation: 2, shadowOpacity:0.1, shadowRadius:2 },
  lojaPontoIconContainer: { width: 44, height: 44, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 12, },
  lojaPontoInfo: { flex: 1, justifyContent: 'center', },
  lojaPontoNome: { fontSize: 15, fontWeight: 'bold', color: TEXT_COLOR_DARK, },
  lojaPontoDetalhe: { fontSize: 12, color: TEXT_COLOR_MUTED, },
  lojaPontoAcao: { alignItems: 'flex-end', marginLeft:10 }, // Alinhado à direita
  lojaPontoPreco: { fontSize: 14, fontWeight: 'bold', color: PRIMARY_COLOR, marginBottom:5 },
  lojaPontoAddButton: { /* Estilo para o botão de adicionar, pode ser um ícone */ },
  lojaCarrinhoResumoContainer: { backgroundColor: PRIMARY_COLOR_VERY_LIGHT, padding: 15, borderTopLeftRadius: 20, borderTopRightRadius: 20, shadowColor: "#000", shadowOffset: { width: 0, height: -2, }, shadowOpacity: 0.1, shadowRadius: 3.84, elevation: 8, position: 'absolute', bottom: 0, left: 0, right: 0, },
  lojaCarrinhoResumoTitulo: { fontSize: 16, fontWeight: 'bold', color: TEXT_COLOR_DARK, marginBottom: 10,},
  lojaCarrinhoItem: {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4},
  lojaCarrinhoItemTexto: { fontSize: 14, color: TEXT_COLOR_DARK_SECONDARY},
  lojaCarrinhoTotalLinha: {flexDirection: 'row', justifyContent:'space-between', marginTop:10, paddingTop:10, borderTopWidth:1, borderTopColor:'#DDD'},
  lojaCarrinhoResumoTextoBold: { fontSize: 16, fontWeight: 'bold', color: TEXT_COLOR_DARK},
  lojaCarrinhoResumoBotao: { backgroundColor: PRIMARY_COLOR, borderRadius: 8, paddingVertical: 14, marginTop: 15, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', },
  lojaCarrinhoResumoBotaoTexto: { color: WHITE_COLOR, fontSize: 16, fontWeight: 'bold', },
  // Estilos para Pagamento e Recibo da Loja (baseados em 123-124.jpg)
  lojaPagamentoScroll: { backgroundColor: PRIMARY_COLOR_VERY_LIGHT, flexGrow:1, padding:15 },
  lojaPagamentoCard: { backgroundColor: WHITE_COLOR, borderRadius: 12, padding: 20, marginBottom: 20, elevation: 2, shadowOpacity:0.1, shadowRadius:2 },
  lojaPagamentoCardTitle: { fontSize: 18, fontWeight: 'bold', color: TEXT_COLOR_DARK, marginBottom: 15, },
  lojaPagamentoItemLinha: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8, },
  lojaPagamentoItemTexto: { fontSize: 15, color: '#444', },
  lojaPagamentoItemPreco: { fontSize: 15, color: PRIMARY_COLOR, fontWeight: '500' },
  lojaPagamentoSeparador: { height: 1, backgroundColor: '#eee', marginVertical: 10, },
  lojaPagamentoTotalTexto: { fontSize: 15, fontWeight: 'bold', color: TEXT_COLOR_DARK, },
  lojaPagamentoTotalValor: { fontSize: 15, fontWeight: 'bold', color: TEXT_COLOR_DARK, },
  lojaPagamentoTotalTextoBold: { fontSize: 18, fontWeight: 'bold', color: TEXT_COLOR_DARK, },
  lojaPagamentoTotalValorBold: { fontSize: 18, fontWeight: 'bold', color: PRIMARY_COLOR, },
  lojaPagamentoIconeCentral: { alignSelf: 'center', marginVertical: 20, },
  lojaPagamentoInfoCartao: { backgroundColor: PRIMARY_COLOR, borderRadius: 12, padding: 20, marginBottom: 25, elevation:3, shadowOpacity:0.15, shadowRadius:3 },
  lojaPagamentoInfoCartaoTitulo: { fontSize: 18, fontWeight: 'bold', color: WHITE_COLOR, marginBottom: 10, },
  lojaPagamentoInfoCartaoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, },
  lojaPagamentoInfoCartaoSaldo: { fontSize: 28, fontWeight: 'bold', color: WHITE_COLOR, },
  lojaPagamentoInfoCartaoLabel: { fontSize: 14, color: '#E0E0E0', },
  lojaPagamentoInfoCartaoLabelPequeno: { fontSize: 12, color: '#E0E0E0', },
  lojaPagamentoInfoCartaoValorPequeno: { fontSize: 14, color: WHITE_COLOR, fontWeight: '500', },
  lojaPagamentoBotaoComprar: { backgroundColor: PRIMARY_COLOR, borderRadius: 25, paddingVertical: 16, alignItems: 'center', elevation:2, shadowOpacity:0.1, shadowRadius:2 },
  lojaPagamentoBotaoComprarDisabled: { backgroundColor: '#9E9E9E' },
  lojaPagamentoBotaoComprarTexto: { color: WHITE_COLOR, fontSize: 18, fontWeight: 'bold', },
  lojaReciboHeader: { backgroundColor: PRIMARY_COLOR, paddingVertical: 15, paddingHorizontal: 20, borderRadius: 25, alignItems: 'center', width: width * 0.85, marginTop: 20, elevation:3, shadowOpacity:0.15, shadowRadius:3 },
  lojaReciboHeaderText: { fontSize: 22, fontWeight: 'bold', color: WHITE_COLOR, },
  lojaReciboSubHeaderText: { fontSize: 14, color: '#E0E0E0', marginTop: 4, },
  // Estilos para Resgatar Tarefas (baseado em 125.jpg)
  resgatarTarefaCard: { backgroundColor: CARD_BG_COLOR, borderRadius: 10, padding:15, marginBottom: 12, elevation: 2, shadowOpacity:0.1, shadowRadius:2 },
  resgatarTarefaIconContainer: { width: 50, alignItems:'center', justifyContent:'center', marginRight:10 },
  resgatarTarefaIconBg: { width: 40, height: 40, borderRadius: 8, justifyContent: 'center', alignItems: 'center',},
  resgatarTarefaInfo: { flex: 1, marginLeft:5 },
  resgatarTarefaHeader: {flexDirection: 'row', alignItems: 'center', marginBottom: 8}, // Não usado diretamente no layout atual
  resgatarTarefaMateria: { fontSize: 15, fontWeight: 'bold', color: TEXT_COLOR_DARK, flex:1 },
  resgatarTarefaRecompensaContainer: { alignItems: 'flex-end', justifyContent:'center', paddingLeft:10},
  resgatarTarefaRecompensa: { fontSize: 13, fontWeight: '500', color: PRIMARY_COLOR, },
  resgatarTarefaDescricao: { fontSize: 13, color: TEXT_COLOR_MUTED, marginBottom:12, marginTop: 4 },
  resgatarTarefaBotao: { backgroundColor: PRIMARY_COLOR, borderRadius: 20, paddingVertical: 10, alignItems: 'center', },
  resgatarTarefaBotaoResgatado: { backgroundColor: GREEN_SUCCESS, },
  resgatarTarefaBotaoTexto: { color: WHITE_COLOR, fontSize: 15, fontWeight: 'bold', },
  resgatarSaldo: { fontSize: 16, fontWeight: 'bold', color: TEXT_COLOR_DARK, textAlign: 'center', marginVertical: 15, backgroundColor: WHITE_COLOR, padding: 10, borderRadius: 8, elevation:1 },
  sectionTitleAlt: { fontSize: 17, fontWeight: 'bold', color: TEXT_COLOR_DARK_SECONDARY, marginHorizontal: 5, marginTop: 20, marginBottom: 10, }, // Para Resgatar Tarefas
});
