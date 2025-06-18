// App.js (Versão Consolidada Final - Correção Loja, Resgate e Pagamento)

import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
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
  Image,
} from "react-native";

// Navegação
import {
  NavigationContainer,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// Ícones
import {
  FontAwesome5 as Icon,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";

// Cores e Constantes
const PRIMARY_COLOR = "#6A0DAD";
const PRIMARY_COLOR_LIGHT = "#7E3FBF";
const PRIMARY_COLOR_VERY_LIGHT = "#E9D8F8"; // Lilás bem claro para fundos de card de pagamento
const ACCENT_COLOR = "#FFA500";
const WHITE_COLOR = "#FFFFFF";
const BLACK_COLOR = "#000000";
const TEXT_COLOR_DARK = "#333333";
const TEXT_COLOR_DARK_SECONDARY = "#555555";
const TEXT_COLOR_LIGHT = "#FFFFFF";
const TEXT_COLOR_MUTED = "#6c757d";
const LIGHT_BG_COLOR = "#F4F0F8";
const CARD_BG_COLOR = WHITE_COLOR;
const ICON_COLOR_ACTIVE_TAB = PRIMARY_COLOR;
const ICON_COLOR_INACTIVE_TAB = "#A0A0A0";
const ICON_COLOR_DRAWER_ACTIVE = PRIMARY_COLOR;
const ICON_COLOR_DRAWER_INACTIVE = "#666666";
const GREEN_SUCCESS = "#4CAF50";
const RED_ERROR = "#D32F2F";
const WHITE_COLOR_TRANSLUCENT = "rgba(255,255,255,0.7)";

const { width, height } = Dimensions.get("window");

// --- Dados Mockados ---
const NOME_ALUNO_EXEMPLO = "Lucas";
const MATRICULA_EXEMPLO = "123-456-7890";
const FOTO_ALUNO_EXEMPLO = "https://randomuser.me/api/portraits/men/22.jpg";

// Dados completos do perfil do usuário
const MOCK_PERFIL_USUARIO = {
  nome: "Lucas Neto",
  matricula: "123-456-7890",
  email: "lucas@escola.edu.br",
  telefone: "(11) 99999-8888",
  dataNascimento: "15/03/2007",
  endereco: "Rua das Flores, 123 - Centro",
  cidade: "São Paulo",
  estado: "SP",
  cep: "01234-567",
  responsavel: "Maria",
  telefoneResponsavel: "(11) 98765-4321",
  turma: "3º Ano ",
  periodo: "Integral",
  anoIngresso: "2018",
  // Campos editáveis
  bio: "Estudante dedicado, apaixonado por matemática e ciências. Gosto de resolver problemas e aprender coisas novas.",
  hobbies: "Leitura, jogos de estratégia, programação",
  materiaFavorita: "Matemática",
  metaAcademica: "Ser aprovado com média acima de 9.0 em todas as disciplinas",
};

const DISCIPLINAS_MOCK = [
  {
    id: "mat",
    nome: "Matemática",
    iconeIon: "calculator",
    cor: "#D32F2F",
    iconLib: Ionicons,
  },
  {
    id: "hist",
    nome: "História",
    iconeIon: "library",
    cor: "#F57C00",
    iconLib: Ionicons,
  },
  {
    id: "geo",
    nome: "Geografia",
    iconeIon: "map",
    cor: "#0288D1",
    iconLib: Ionicons,
  },
  {
    id: "cie",
    nome: "Ciências",
    iconeMCI: "flask",
    cor: "#388E3C",
    iconLib: MaterialCommunityIcons,
  },
  {
    id: "edf",
    nome: "Ed. Física",
    iconeMCI: "basketball",
    cor: "#1976D2",
    iconLib: MaterialCommunityIcons,
  },
  {
    id: "port",
    nome: "Português",
    iconeIon: "book",
    cor: "#00796B",
    iconLib: Ionicons,
  },
  {
    id: "ing",
    nome: "Inglês",
    iconeMCI: "translate",
    cor: "#C2185B",
    iconLib: MaterialCommunityIcons,
  },
  {
    id: "outros",
    nome: "Outros",
    iconeIon: "apps",
    cor: "#757575",
    iconLib: Ionicons,
  },
];

// Lista completa de todas as disciplinas disponíveis
const TODAS_DISCIPLINAS_MOCK = [
  {
    id: "mat",
    nome: "Matemática",
    iconeIon: "calculator",
    cor: "#D32F2F",
    iconLib: Ionicons,
  },
  {
    id: "port",
    nome: "Português",
    iconeIon: "book",
    cor: "#00796B",
    iconLib: Ionicons,
  },
  {
    id: "hist",
    nome: "História",
    iconeIon: "library",
    cor: "#F57C00",
    iconLib: Ionicons,
  },
  {
    id: "geo",
    nome: "Geografia",
    iconeIon: "map",
    cor: "#0288D1",
    iconLib: Ionicons,
  },
  {
    id: "cie",
    nome: "Ciências",
    iconeMCI: "flask",
    cor: "#388E3C",
    iconLib: MaterialCommunityIcons,
  },
  {
    id: "ing",
    nome: "Inglês",
    iconeMCI: "translate",
    cor: "#C2185B",
    iconLib: MaterialCommunityIcons,
  },
  {
    id: "edf",
    nome: "Ed. Física",
    iconeMCI: "basketball",
    cor: "#1976D2",
    iconLib: MaterialCommunityIcons,
  },
  {
    id: "art",
    nome: "Artes",
    iconeMCI: "palette",
    cor: "#E91E63",
    iconLib: MaterialCommunityIcons,
  },
  {
    id: "fis",
    nome: "Física",
    iconeMCI: "atom",
    cor: "#FF5722",
    iconLib: MaterialCommunityIcons,
  },
  {
    id: "qui",
    nome: "Química",
    iconeMCI: "test-tube",
    cor: "#9C27B0",
    iconLib: MaterialCommunityIcons,
  },
  {
    id: "bio",
    nome: "Biologia",
    iconeMCI: "leaf",
    cor: "#4CAF50",
    iconLib: MaterialCommunityIcons,
  },
  {
    id: "fil",
    nome: "Filosofia",
    iconeMCI: "head-lightbulb",
    cor: "#795548",
    iconLib: MaterialCommunityIcons,
  },
  {
    id: "soc",
    nome: "Sociologia",
    iconeMCI: "account-group",
    cor: "#607D8B",
    iconLib: MaterialCommunityIcons,
  },
  {
    id: "esp",
    nome: "Espanhol",
    iconeMCI: "castle",
    cor: "#FF9800",
    iconLib: MaterialCommunityIcons,
  },
  {
    id: "lit",
    nome: "Literatura",
    iconeIon: "library-outline",
    cor: "#673AB7",
    iconLib: Ionicons,
  },
  {
    id: "red",
    nome: "Redação",
    iconeMCI: "pencil",
    cor: "#3F51B5",
    iconLib: MaterialCommunityIcons,
  },
  {
    id: "inf",
    nome: "Informática",
    iconeMCI: "laptop",
    cor: "#2196F3",
    iconLib: MaterialCommunityIcons,
  },
  {
    id: "mus",
    nome: "Música",
    iconeMCI: "music",
    cor: "#FF4081",
    iconLib: MaterialCommunityIcons,
  },
  {
    id: "geo_fis",
    nome: "Geografia Física",
    iconeMCI: "earth",
    cor: "#00BCD4",
    iconLib: MaterialCommunityIcons,
  },
  {
    id: "geo_hum",
    nome: "Geografia Humana",
    iconeMCI: "city-variant",
    cor: "#009688",
    iconLib: MaterialCommunityIcons,
  },
];
const PROFESSORES_MOCK = [
  {
    id: "prof1",
    nome: "Prof. Ana Maria Silva",
    disciplina: "Matemática",
    imagemUrl: "https://randomuser.me/api/portraits/women/89.jpg",
    email: "ana.silva@escola.com",
    telefone: "(11) 98888-8888",
    formacao: "Licenciatura em Matemática - USP",
    especializacao: "Mestrado em Educação Matemática",
    experiencia: "15 anos de experiência em ensino",
    bio: "Professora dedicada com paixão por ensinar matemática de forma dinâmica e interativa. Especialista em metodologias ativas de aprendizagem.",
    horarios: [
      "Segunda: 7h-11h",
      "Terça: 13h-17h",
      "Quarta: 7h-11h",
      "Quinta: 13h-17h",
    ],
    turmas: ["3º A", "3º B", "2º C"],
    projetos: ["Olimpíada de Matemática", "Feira de Ciências"],
    rating: 4.8,
    avaliacoes: 127,
  },
  {
    id: "prof2",
    nome: "Prof. Bruno Costa",
    disciplina: "História",
    imagemUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    email: "bruno.costa@escola.com",
    telefone: "(11) 97777-7777",
    formacao: "Licenciatura em História - UNESP",
    especializacao: "Especialização em História do Brasil",
    experiencia: "12 anos de experiência em ensino",
    bio: "Professor apaixonado por história, sempre buscando conectar o passado com o presente para despertar o interesse dos alunos.",
    horarios: [
      "Segunda: 13h-17h",
      "Terça: 7h-11h",
      "Quarta: 13h-17h",
      "Sexta: 7h-11h",
    ],
    turmas: ["1º A", "2º A", "3º C"],
    projetos: ["Semana da Consciência Negra", "Teatro Histórico"],
    rating: 4.6,
    avaliacoes: 98,
  },
  {
    id: "prof3",
    nome: "Prof. Carla Santos",
    disciplina: "Ciências",
    imagemUrl:
      "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&h=150&fit=crop&crop=face",
    email: "carla.santos@escola.com",
    telefone: "(11) 96666-6666",
    formacao: "Licenciatura em Ciências Biológicas - UNICAMP",
    especializacao: "Mestrado em Biologia Molecular",
    experiencia: "10 anos de experiência em ensino",
    bio: "Professora entusiasta das ciências, sempre promovendo experimentos práticos e despertando a curiosidade científica nos alunos.",
    horarios: [
      "Segunda: 7h-11h",
      "Terça: 7h-11h",
      "Quinta: 13h-17h",
      "Sexta: 13h-17h",
    ],
    turmas: ["1º B", "2º B", "3º A"],
    projetos: ["Laboratório de Ciências", "Horta Escolar"],
    rating: 4.9,
    avaliacoes: 156,
  },
  {
    id: "prof4",
    nome: "Prof. Daniel Oliveira",
    disciplina: "Português e Literatura",
    imagemUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    email: "daniel.oliveira@escola.com",
    telefone: "(11) 95555-5555",
    formacao: "Licenciatura em Letras - PUC-SP",
    especializacao: "Mestrado em Literatura Brasileira",
    experiencia: "18 anos de experiência em ensino",
    bio: "Professor versátil que leciona tanto Português quanto Literatura, conectando gramática com a beleza dos textos clássicos e contemporâneos.",
    horarios: [
      "Segunda: 7h-11h e 13h-15h",
      "Terça: 13h-17h",
      "Quarta: 7h-11h",
      "Quinta: 7h-11h e 15h-17h",
      "Sexta: 13h-17h",
    ],
    turmas: ["1º A", "1º B", "2º A", "2º B", "3º A"],
    projetos: ["Sarau Literário", "Jornal Escolar", "Redação ENEM"],
    rating: 4.7,
    avaliacoes: 203,
  },
  {
    id: "prof5",
    nome: "Prof. Elena Rodriguez",
    disciplina: "Inglês e Espanhol",
    imagemUrl:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150&h=150&fit=crop&crop=face",
    email: "elena.rodriguez@escola.com",
    telefone: "(11) 94444-4444",
    formacao: "Licenciatura em Letras - UFMG",
    especializacao: "Especialização em Ensino de Línguas Estrangeiras",
    experiencia: "14 anos de experiência em ensino",
    bio: "Professora poliglota que domina múltiplos idiomas. Torna o aprendizado de línguas estrangeiras divertido através de metodologias inovadoras e imersão cultural.",
    horarios: [
      "Segunda: 13h-17h",
      "Terça: 7h-11h e 13h-15h",
      "Quarta: 13h-17h",
      "Quinta: 7h-11h",
      "Sexta: 7h-11h e 13h-15h",
    ],
    turmas: ["1º C", "2º A", "2º C", "3º B", "3º C"],
    projetos: [
      "Festival Internacional",
      "Intercâmbio Cultural",
      "English Club",
    ],
    rating: 4.9,
    avaliacoes: 189,
  },
  {
    id: "prof6",
    nome: "Prof. Fernando Almeida",
    disciplina: "Geografia",
    imagemUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    email: "fernando.almeida@escola.com",
    telefone: "(11) 93333-3333",
    formacao: "Licenciatura em Geografia - USP",
    especializacao: "Mestrado em Geografia Urbana",
    experiencia: "11 anos de experiência em ensino",
    bio: "Professor dinâmico que usa tecnologia e mapas interativos para tornar a geografia viva e interessante. Especialista em sustentabilidade e questões ambientais.",
    horarios: [
      "Segunda: 7h-11h",
      "Terça: 13h-17h",
      "Quarta: 7h-11h e 15h-17h",
      "Quinta: 13h-17h",
    ],
    turmas: ["1º A", "1º B", "2º C", "3º A"],
    projetos: [
      "Mapeamento Escolar",
      "Sustentabilidade Urbana",
      "Feira de Geografia",
    ],
    rating: 4.5,
    avaliacoes: 134,
  },
  {
    id: "prof7",
    nome: "Prof. Gabriela Medeiros",
    disciplina: "Física e Química",
    imagemUrl:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&h=150&fit=crop&crop=face",
    email: "gabriela.medeiros@escola.com",
    telefone: "(11) 92222-2222",
    formacao: "Licenciatura em Física - UNICAMP, Especialização em Química",
    especializacao: "Mestrado em Ensino de Ciências Exatas",
    experiencia: "16 anos de experiência em ensino",
    bio: "Professora das ciências exatas que demonstra como física e química estão conectadas no dia a dia. Conhecida por seus experimentos incríveis que 'fazem mágica' em sala de aula.",
    horarios: [
      "Segunda: 13h-17h",
      "Terça: 7h-11h",
      "Quarta: 13h-17h",
      "Quinta: 7h-11h e 15h-17h",
      "Sexta: 13h-17h",
    ],
    turmas: ["2º A", "2º B", "2º C", "3º A", "3º B", "3º C"],
    projetos: [
      "Laboratório de Física",
      "Experimentos Químicos",
      "Feira de Ciências",
    ],
    rating: 4.8,
    avaliacoes: 167,
  },
  {
    id: "prof8",
    nome: "Prof. Hugo Barbosa",
    disciplina: "Ed. Física",
    imagemUrl:
      "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=150&h=150&fit=crop&crop=face",
    email: "hugo.barbosa@escola.com",
    telefone: "(11) 91111-1111",
    formacao: "Licenciatura em Educação Física - UNESP",
    especializacao: "Especialização em Psicomotricidade",
    experiencia: "9 anos de experiência em ensino",
    bio: "Professor energético que promove não apenas o condicionamento físico, mas também valores como trabalho em equipe, disciplina e superação pessoal.",
    horarios: [
      "Segunda: 7h-11h e 13h-17h",
      "Terça: 7h-11h e 13h-17h",
      "Quarta: 7h-11h e 13h-17h",
      "Quinta: 7h-11h e 13h-17h",
      "Sexta: 7h-11h",
    ],
    turmas: [
      "1º A",
      "1º B",
      "1º C",
      "2º A",
      "2º B",
      "2º C",
      "3º A",
      "3º B",
      "3º C",
    ],
    projetos: ["Jogos Internos", "Olimpíadas Escolares", "Vida Saudável"],
    rating: 4.6,
    avaliacoes: 142,
  },
  {
    id: "prof9",
    nome: "Prof. Isabel Ferreira",
    disciplina: "Biologia",
    imagemUrl: "https://randomuser.me/api/portraits/women/52.jpg",
    email: "isabel.ferreira@escola.com",
    telefone: "(11) 90000-0000",
    formacao: "Licenciatura em Ciências Biológicas - UFRJ",
    especializacao: "Doutorado em Biotecnologia",
    experiencia: "13 anos de experiência em ensino",
    bio: "Professora apaixonada pela vida em todas as suas formas. Especialista em biotecnologia, sempre traz as últimas descobertas científicas para a sala de aula.",
    horarios: [
      "Segunda: 13h-17h",
      "Terça: 7h-11h",
      "Quarta: 13h-17h",
      "Quinta: 7h-11h",
      "Sexta: 13h-17h",
    ],
    turmas: ["2º A", "2º B", "3º A", "3º B", "3º C"],
    projetos: [
      "Laboratório de Biologia",
      "Pesquisa Genética",
      "Biotecnologia Escolar",
    ],
    rating: 4.9,
    avaliacoes: 178,
  },
  {
    id: "prof10",
    nome: "Prof. João Ribeiro",
    disciplina: "Filosofia e Sociologia",
    imagemUrl: "https://randomuser.me/api/portraits/men/63.jpg",
    email: "joao.ribeiro@escola.com",
    telefone: "(11) 98765-4321",
    formacao:
      "Licenciatura em Filosofia - PUC-RJ, Especialização em Sociologia",
    especializacao: "Mestrado em Filosofia Contemporânea",
    experiencia: "20 anos de experiência em ensino",
    bio: "Professor reflexivo que conecta filosofia e sociologia para formar cidadãos críticos. Promove debates estimulantes sobre questões contemporâneas e éticas.",
    horarios: [
      "Segunda: 15h-17h",
      "Terça: 7h-11h",
      "Quarta: 15h-17h",
      "Quinta: 13h-17h",
      "Sexta: 7h-11h",
    ],
    turmas: ["2º A", "2º B", "2º C", "3º A", "3º B", "3º C"],
    projetos: [
      "Café Filosófico",
      "Debates Contemporâneos",
      "Ética e Cidadania",
    ],
    rating: 4.7,
    avaliacoes: 156,
  },
  {
    id: "prof11",
    nome: "Prof. Karina Lopes",
    disciplina: "Artes e Música",
    imagemUrl: "https://randomuser.me/api/portraits/women/71.jpg",
    email: "karina.lopes@escola.com",
    telefone: "(11) 98765-1234",
    formacao: "Licenciatura em Artes Visuais - UNESP, Bacharelado em Música",
    especializacao: "Mestrado em Arte-Educação",
    experiencia: "8 anos de experiência em ensino",
    bio: "Professora criativa que combina artes visuais e música para despertar a sensibilidade artística dos alunos. Organiza apresentações e exposições memoráveis.",
    horarios: [
      "Segunda: 13h-17h",
      "Terça: 13h-17h",
      "Quarta: 7h-11h",
      "Quinta: 13h-17h",
      "Sexta: 7h-11h e 13h-15h",
    ],
    turmas: ["1º A", "1º B", "1º C", "2º A", "2º B", "2º C"],
    projetos: ["Festival de Artes", "Coral Escolar", "Exposição de Talentos"],
    rating: 4.8,
    avaliacoes: 123,
  },
  {
    id: "prof12",
    nome: "Prof. Lucas Martins",
    disciplina: "Informática e Redação",
    imagemUrl: "https://randomuser.me/api/portraits/men/47.jpg",
    email: "lucas.martins@escola.com",
    telefone: "(11) 98765-5678",
    formacao:
      "Licenciatura em Computação - UFRGS, Especialização em Produção Textual",
    especializacao: "Mestrado em Tecnologia Educacional",
    experiencia: "7 anos de experiência em ensino",
    bio: "Professor inovador que une tecnologia e linguagem. Ensina desde programação básica até técnicas avançadas de redação usando ferramentas digitais modernas.",
    horarios: [
      "Segunda: 7h-11h e 15h-17h",
      "Terça: 13h-17h",
      "Quarta: 7h-11h e 15h-17h",
      "Quinta: 13h-17h",
      "Sexta: 7h-11h",
    ],
    turmas: ["1º A", "1º B", "1º C", "2º A", "2º B", "2º C", "3º A", "3º B"],
    projetos: [
      "Laboratório de Informática",
      "Blog Escolar",
      "Competição de Programação",
    ],
    rating: 4.6,
    avaliacoes: 145,
  },
];
const VIDEOAULAS_MOCK = [
  {
    id: "vid1",
    titulo: "Introdução à Álgebra",
    professor: "Prof. Ana",
    imagemUrl:
      "https://placehold.co/400x225/7E3FBF/FFFFFF?text=Video+Algebra&font=roboto",
    duracao: "15:30",
  },
  {
    id: "vid2",
    titulo: "Revolução Francesa",
    professor: "Prof. Bruno",
    imagemUrl:
      "https://placehold.co/400x225/FFA500/FFFFFF?text=Video+Historia&font=roboto",
    duracao: "22:10",
  },
  {
    id: "vid3",
    titulo: "Ciclo da Água",
    professor: "Prof. Carla",
    imagemUrl:
      "https://placehold.co/400x225/3498DB/FFFFFF?text=Video+Ciencias&font=roboto",
    duracao: "10:05",
  },
  {
    id: "vid4",
    titulo: "Análise Literária - Machado de Assis",
    professor: "Prof. Daniel",
    imagemUrl:
      "https://placehold.co/400x225/D4A574/FFFFFF?text=Video+Literatura&font=roboto",
    duracao: "28:45",
  },
  {
    id: "vid5",
    titulo: "English Grammar - Present Perfect",
    professor: "Prof. Elena",
    imagemUrl:
      "https://placehold.co/400x225/A4E6D4/FFFFFF?text=Video+English&font=roboto",
    duracao: "18:20",
  },
  {
    id: "vid6",
    titulo: "Climas do Brasil",
    professor: "Prof. Fernando",
    imagemUrl:
      "https://placehold.co/400x225/74A4D4/FFFFFF?text=Video+Geografia&font=roboto",
    duracao: "24:15",
  },
  {
    id: "vid7",
    titulo: "Leis de Newton",
    professor: "Prof. Gabriela",
    imagemUrl:
      "https://placehold.co/400x225/E6A4D4/FFFFFF?text=Video+Fisica&font=roboto",
    duracao: "32:10",
  },
  {
    id: "vid8",
    titulo: "Exercícios de Aquecimento",
    professor: "Prof. Hugo",
    imagemUrl:
      "https://placehold.co/400x225/D4E6A4/FFFFFF?text=Video+EdFisica&font=roboto",
    duracao: "12:30",
  },
  {
    id: "vid9",
    titulo: "Genética - Leis de Mendel",
    professor: "Prof. Isabel",
    imagemUrl:
      "https://placehold.co/400x225/A4D4E6/FFFFFF?text=Video+Biologia&font=roboto",
    duracao: "26:50",
  },
  {
    id: "vid10",
    titulo: "Filosofia Antiga - Sócrates",
    professor: "Prof. João",
    imagemUrl:
      "https://placehold.co/400x225/E6D4A4/FFFFFF?text=Video+Filosofia&font=roboto",
    duracao: "35:40",
  },
  {
    id: "vid11",
    titulo: "Técnicas de Pintura",
    professor: "Prof. Karina",
    imagemUrl:
      "https://placehold.co/400x225/D4A4E6/FFFFFF?text=Video+Artes&font=roboto",
    duracao: "20:15",
  },
  {
    id: "vid12",
    titulo: "Introdução à Programação",
    professor: "Prof. Lucas",
    imagemUrl:
      "https://placehold.co/400x225/A4E6B4/FFFFFF?text=Video+Informatica&font=roboto",
    duracao: "30:25",
  },
];
const CONTEUDO_MATERIAS_MOCK = {
  mat: {
    resumos: [
      {
        id: "mat_res1",
        titulo: "Teorema de Pitágoras",
        conteudo:
          "Em qualquer triângulo retângulo, o quadrado do comprimento da hipotenusa é igual à soma dos quadrados dos comprimentos dos catetos. A fórmula é a² + b² = c², onde c é a hipotenusa. Este teorema é fundamental para resolver problemas de geometria e tem aplicações práticas na construção civil, navegação e muito mais.",
      },
      {
        id: "mat_res2",
        titulo: "Funções de Primeiro Grau",
        conteudo:
          'Uma função de primeiro grau é uma função f: ℝ → ℝ, definida como f(x) = ax + b, com a e b reais e a ≠ 0. Seu gráfico é uma reta. O coeficiente "a" representa a inclinação da reta, enquanto "b" é o ponto onde a reta corta o eixo y (coeficiente linear).',
      },
      {
        id: "mat_res3",
        titulo: "Operações com Frações",
        conteudo:
          "Para somar frações com denominadores diferentes, primeiro devemos encontrar um denominador comum. Para multiplicar frações, multiplicamos numerador com numerador e denominador com denominador. A divisão de frações é feita multiplicando a primeira fração pelo inverso da segunda.",
      },
    ],
    atividades: [
      {
        id: "mat_atv1",
        tipo: "multipla_escolha",
        pergunta: "Qual o valor de X na equação 2x + 5 = 15?",
        opcoes: ["3", "4", "5", "10"],
        respostaCorreta: "5",
        recompensa: 10,
      },
      {
        id: "mat_atv2",
        tipo: "multipla_escolha",
        pergunta:
          "Se um triângulo tem catetos 3cm e 4cm, qual a medida da hipotenusa?",
        opcoes: ["5cm", "6cm", "7cm", "25cm"],
        respostaCorreta: "5cm",
        recompensa: 15,
      },
      {
        id: "mat_atv3",
        tipo: "multipla_escolha",
        pergunta: "Quanto é 2/3 + 1/6?",
        opcoes: ["3/9", "5/6", "3/6", "1/2"],
        respostaCorreta: "5/6",
        recompensa: 12,
      },
    ],
  },
  port: {
    resumos: [
      {
        id: "port_res1",
        titulo: "Tipos de Sujeito",
        conteudo:
          "Existem diversos tipos de sujeito: simples (um núcleo), composto (dois ou mais núcleos), oculto (não expresso, mas identificável), indeterminado (não se quer ou não se pode identificar) e oração sem sujeito (fenômenos da natureza, verbo haver no sentido de existir, etc.).",
      },
      {
        id: "port_res2",
        titulo: "Classes de Palavras",
        conteudo:
          "As classes de palavras em português são: substantivo (nomeia seres), adjetivo (qualifica), verbo (ação/estado), advérbio (modifica verbo/adjetivo), pronome (substitui/acompanha substantivo), preposição (liga palavras), conjunção (conecta orações), numeral (quantidade) e interjeição (expressa emoção).",
      },
      {
        id: "port_res3",
        titulo: "Figuras de Linguagem",
        conteudo:
          'As figuras de linguagem são recursos expressivos que dão mais beleza e força à comunicação. Exemplos: metáfora (comparação implícita), símile (comparação explícita com "como"), hipérbole (exagero), personificação (características humanas a seres inanimados) e ironia (dizer o contrário do que se pensa).',
      },
    ],
    atividades: [
      {
        id: "port_atv1",
        tipo: "multipla_escolha",
        pergunta: 'Qual o sujeito da frase: "Choveu muito ontem."?',
        opcoes: ["Muito", "Ontem", "Chuva", "Oração sem sujeito"],
        respostaCorreta: "Oração sem sujeito",
        recompensa: 8,
      },
      {
        id: "port_atv2",
        tipo: "multipla_escolha",
        pergunta:
          'Na frase "O gato subiu no telhado", qual é a classe da palavra "gato"?',
        opcoes: ["Adjetivo", "Substantivo", "Verbo", "Advérbio"],
        respostaCorreta: "Substantivo",
        recompensa: 6,
      },
      {
        id: "port_atv3",
        tipo: "multipla_escolha",
        pergunta: 'Qual figura de linguagem está em "Seus olhos são estrelas"?',
        opcoes: ["Hipérbole", "Ironia", "Metáfora", "Personificação"],
        respostaCorreta: "Metáfora",
        recompensa: 10,
      },
    ],
  },
  hist: {
    resumos: [
      {
        id: "hist_res1",
        titulo: "Idade Média",
        conteudo:
          "Período da história europeia que durou do século V ao XV. Caracterizou-se pelo feudalismo, onde a sociedade era dividida em três grupos: oratores (clero), bellatores (nobres guerreiros) e laboratores (camponeses). O poder estava descentralizado entre senhores feudais, e a Igreja Católica exercia grande influência.",
      },
      {
        id: "hist_res2",
        titulo: "Descobrimentos Marítimos",
        conteudo:
          "Nos séculos XV e XVI, europeus iniciaram as Grandes Navegações em busca de novas rotas comerciais para o Oriente. Portugal e Espanha foram pioneiros, descobrindo novas terras nas Américas, África e Ásia. Isso levou à colonização e ao intercâmbio cultural entre continentes.",
      },
      {
        id: "hist_res3",
        titulo: "Revolução Industrial",
        conteudo:
          "Iniciada na Inglaterra no século XVIII, foi um período de grandes transformações tecnológicas e sociais. A invenção da máquina a vapor, teares mecânicos e ferrovias revolucionaram a produção e o transporte, levando ao crescimento urbano e mudanças nas relações de trabalho.",
      },
    ],
    atividades: [
      {
        id: "hist_atv1",
        tipo: "multipla_escolha",
        pergunta: "Em que século começou a Idade Média?",
        opcoes: ["Século III", "Século V", "Século VII", "Século X"],
        respostaCorreta: "Século V",
        recompensa: 8,
      },
      {
        id: "hist_atv2",
        tipo: "multipla_escolha",
        pergunta: "Qual país foi pioneiro nas Grandes Navegações?",
        opcoes: ["Espanha", "França", "Portugal", "Inglaterra"],
        respostaCorreta: "Portugal",
        recompensa: 7,
      },
      {
        id: "hist_atv3",
        tipo: "multipla_escolha",
        pergunta: "Onde iniciou a Revolução Industrial?",
        opcoes: ["França", "Alemanha", "Inglaterra", "Estados Unidos"],
        respostaCorreta: "Inglaterra",
        recompensa: 9,
      },
    ],
  },
  geo: {
    resumos: [
      {
        id: "geo_res1",
        titulo: "Relevo Brasileiro",
        conteudo:
          "O relevo brasileiro é caracterizado por planaltos (28%), planícies (25%) e depressões (47%). Os principais planaltos são: Brasileiro, da Borborema e das Guianas. As planícies principais são a Amazônica, do Pantanal e Costeira. Este relevo influencia o clima, a hidrografia e a ocupação humana.",
      },
      {
        id: "geo_res2",
        titulo: "Clima e Vegetação",
        conteudo:
          "O Brasil possui diversos tipos climáticos devido à sua extensão territorial. O clima equatorial (Amazônia) é quente e úmido; o tropical (Centro-Oeste e Sudeste) tem duas estações bem definidas; o semiárido (Nordeste) é seco; e o subtropical (Sul) tem as quatro estações bem marcadas.",
      },
      {
        id: "geo_res3",
        titulo: "Hidrografia Brasileira",
        conteudo:
          "O Brasil possui a maior rede hidrográfica do mundo, com destaque para a Bacia Amazônica (maior do mundo), Bacia do Paraná (importante para energia), Bacia do São Francisco (rio da integração nacional) e bacias menores como Tocantins-Araguaia e do Nordeste.",
      },
    ],
    atividades: [
      {
        id: "geo_atv1",
        tipo: "multipla_escolha",
        pergunta: "Qual tipo de relevo predomina no Brasil?",
        opcoes: ["Planaltos", "Planícies", "Depressões", "Montanhas"],
        respostaCorreta: "Depressões",
        recompensa: 10,
      },
      {
        id: "geo_atv2",
        tipo: "multipla_escolha",
        pergunta: "Qual é o clima da região Amazônica?",
        opcoes: ["Tropical", "Subtropical", "Equatorial", "Semiárido"],
        respostaCorreta: "Equatorial",
        recompensa: 8,
      },
      {
        id: "geo_atv3",
        tipo: "multipla_escolha",
        pergunta: "Qual é a maior bacia hidrográfica do mundo?",
        opcoes: [
          "Bacia do Paraná",
          "Bacia do São Francisco",
          "Bacia Amazônica",
          "Bacia do Tocantins",
        ],
        respostaCorreta: "Bacia Amazônica",
        recompensa: 9,
      },
    ],
  },
  cie: {
    resumos: [
      {
        id: "cie_res1",
        titulo: "Fotossíntese",
        conteudo:
          "Processo pelo qual as plantas produzem seu próprio alimento usando luz solar, água e gás carbônico. A equação é: 6CO₂ + 6H₂O + luz solar → C₆H₁₂O₆ + 6O₂. Este processo ocorre nos cloroplastos e é fundamental para a vida na Terra, pois produz oxigênio e remove CO₂ da atmosfera.",
      },
      {
        id: "cie_res2",
        titulo: "Sistema Solar",
        conteudo:
          "Nosso sistema solar é composto pelo Sol (estrela central) e oito planetas: Mercúrio, Vênus, Terra, Marte (planetas rochosos), Júpiter, Saturno, Urano e Netuno (gigantes gasosos). Também inclui luas, asteroides, cometas e outros corpos celestes em órbita ao redor do Sol.",
      },
      {
        id: "cie_res3",
        titulo: "Estados da Matéria",
        conteudo:
          "A matéria pode existir em diferentes estados: sólido (moléculas organizadas e próximas), líquido (moléculas próximas mas móveis), gasoso (moléculas distantes e em movimento rápido) e plasma (gases ionizados em altas temperaturas). As mudanças de estado ocorrem com variação de temperatura e pressão.",
      },
    ],
    atividades: [
      {
        id: "cie_atv1",
        tipo: "multipla_escolha",
        pergunta: "Qual gás as plantas produzem na fotossíntese?",
        opcoes: ["Gás carbônico", "Nitrogênio", "Oxigênio", "Hidrogênio"],
        respostaCorreta: "Oxigênio",
        recompensa: 8,
      },
      {
        id: "cie_atv2",
        tipo: "multipla_escolha",
        pergunta: "Quantos planetas tem nosso sistema solar?",
        opcoes: ["7", "8", "9", "10"],
        respostaCorreta: "8",
        recompensa: 6,
      },
      {
        id: "cie_atv3",
        tipo: "multipla_escolha",
        pergunta:
          "Em qual estado da matéria as moléculas estão mais organizadas?",
        opcoes: ["Líquido", "Gasoso", "Sólido", "Plasma"],
        respostaCorreta: "Sólido",
        recompensa: 7,
      },
    ],
  },
  edf: {
    resumos: [
      {
        id: "edf_res1",
        titulo: "Benefícios do Alongamento",
        conteudo:
          "O alongamento melhora a flexibilidade, previne lesões, reduz tensões musculares, melhora a postura e aumenta a amplitude de movimento das articulações. Deve ser feito antes e depois dos exercícios, mantendo cada posição por 15-30 segundos sem forçar excessivamente.",
      },
      {
        id: "edf_res2",
        titulo: "Importância da Atividade Física",
        conteudo:
          "A prática regular de exercícios físicos fortalece músculos e ossos, melhora o sistema cardiovascular, controla o peso, reduz o estresse, melhora o humor e aumenta a autoestima. A OMS recomenda pelo menos 150 minutos de atividade moderada por semana.",
      },
      {
        id: "edf_res3",
        titulo: "Esportes Coletivos",
        conteudo:
          "Esportes como futebol, basquete, vôlei e handebol desenvolvem não apenas habilidades físicas, mas também trabalho em equipe, comunicação, liderança e fair play. Cada modalidade tem regras específicas e contribui para o desenvolvimento social dos praticantes.",
      },
    ],
    atividades: [
      {
        id: "edf_atv1",
        tipo: "multipla_escolha",
        pergunta:
          "Por quanto tempo devemos manter cada posição de alongamento?",
        opcoes: [
          "5-10 segundos",
          "15-30 segundos",
          "45-60 segundos",
          "2-3 minutos",
        ],
        respostaCorreta: "15-30 segundos",
        recompensa: 6,
      },
      {
        id: "edf_atv2",
        tipo: "multipla_escolha",
        pergunta:
          "Quantos minutos de atividade física a OMS recomenda por semana?",
        opcoes: ["100 minutos", "150 minutos", "200 minutos", "250 minutos"],
        respostaCorreta: "150 minutos",
        recompensa: 8,
      },
      {
        id: "edf_atv3",
        tipo: "multipla_escolha",
        pergunta:
          "Qual habilidade social NÃO é desenvolvida nos esportes coletivos?",
        opcoes: [
          "Trabalho em equipe",
          "Individualismo",
          "Comunicação",
          "Liderança",
        ],
        respostaCorreta: "Individualismo",
        recompensa: 7,
      },
    ],
  },
  ing: {
    resumos: [
      {
        id: "ing_res1",
        titulo: "Simple Present",
        conteudo:
          'Usado para ações habituais, fatos e verdades universais. Estrutura: Sujeito + verbo base (+ s/es para 3ª pessoa do singular). Exemplos: "I play soccer" (Eu jogo futebol), "She speaks English" (Ela fala inglês), "The sun rises in the east" (O sol nasce no leste).',
      },
      {
        id: "ing_res2",
        titulo: "Verb To Be",
        conteudo:
          'O verbo "to be" significa "ser" ou "estar". Formas: I am, You are, He/She/It is, We are, They are. Usado para identificar, descrever e localizar. Exemplos: "I am a student" (Eu sou estudante), "She is happy" (Ela está feliz), "They are at school" (Eles estão na escola).',
      },
      {
        id: "ing_res3",
        titulo: "Colors and Numbers",
        conteudo:
          "Cores básicas: red (vermelho), blue (azul), green (verde), yellow (amarelo), black (preto), white (branco). Números: one (1), two (2), three (3), four (4), five (5), six (6), seven (7), eight (8), nine (9), ten (10). Essenciais para comunicação básica.",
      },
    ],
    atividades: [
      {
        id: "ing_atv1",
        tipo: "multipla_escolha",
        pergunta: 'Qual a forma correta: "She ___ English every day"?',
        opcoes: ["speak", "speaks", "speaking", "to speak"],
        respostaCorreta: "speaks",
        recompensa: 8,
      },
      {
        id: "ing_atv2",
        tipo: "multipla_escolha",
        pergunta: 'Como se diz "Eu sou professor" em inglês?',
        opcoes: [
          "I are teacher",
          "I am a teacher",
          "I is teacher",
          "I be teacher",
        ],
        respostaCorreta: "I am a teacher",
        recompensa: 6,
      },
      {
        id: "ing_atv3",
        tipo: "multipla_escolha",
        pergunta: 'Qual é a cor "verde" em inglês?',
        opcoes: ["Blue", "Green", "Yellow", "Red"],
        respostaCorreta: "Green",
        recompensa: 5,
      },
    ],
  },
  outros: {
    resumos: [
      {
        id: "outros_res1",
        titulo: "Educação Financeira",
        conteudo:
          "Educação financeira ensina a gerenciar dinheiro de forma inteligente. Conceitos importantes: poupança (guardar dinheiro), investimento (fazer o dinheiro crescer), orçamento (controlar gastos) e consumo consciente (comprar apenas o necessário). Importante começar desde jovem.",
      },
      {
        id: "outros_res2",
        titulo: "Meio Ambiente",
        conteudo:
          "Preservar o meio ambiente é responsabilidade de todos. Práticas sustentáveis: economizar água e energia, separar lixo para reciclagem, usar transporte público, plantar árvores e consumir produtos ecológicos. Pequenas ações fazem grande diferença para o planeta.",
      },
      {
        id: "outros_res3",
        titulo: "Cidadania Digital",
        conteudo:
          "Uso responsável da tecnologia e internet. Inclui: proteção de dados pessoais, combate ao cyberbullying, verificação de informações antes de compartilhar, respeito aos direitos autorais e tempo equilibrado de uso de dispositivos eletrônicos.",
      },
    ],
    atividades: [
      {
        id: "outros_atv1",
        tipo: "multipla_escolha",
        pergunta: 'O que significa "poupança"?',
        opcoes: [
          "Gastar todo dinheiro",
          "Guardar dinheiro",
          "Emprestar dinheiro",
          "Perder dinheiro",
        ],
        respostaCorreta: "Guardar dinheiro",
        recompensa: 6,
      },
      {
        id: "outros_atv2",
        tipo: "multipla_escolha",
        pergunta: "Qual NÃO é uma prática sustentável?",
        opcoes: [
          "Economizar água",
          "Separar lixo",
          "Desperdiçar energia",
          "Plantar árvores",
        ],
        respostaCorreta: "Desperdiçar energia",
        recompensa: 7,
      },
      {
        id: "outros_atv3",
        tipo: "multipla_escolha",
        pergunta: "O que é cidadania digital?",
        opcoes: [
          "Usar internet sem limites",
          "Uso responsável da tecnologia",
          "Compartilhar tudo online",
          "Não usar tecnologia",
        ],
        respostaCorreta: "Uso responsável da tecnologia",
        recompensa: 8,
      },
    ],
  },
  art: {
    resumos: [
      {
        id: "art_res1",
        titulo: "História da Arte",
        conteudo:
          "A arte é uma forma de expressão humana que evoluiu através dos séculos. Principais períodos: Arte Rupestre (pinturas em cavernas), Arte Clássica (Grécia e Roma), Renascimento (Leonardo da Vinci, Michelangelo), Barroco (dramático e ornamental), Impressionismo (Monet, Renoir) e Arte Moderna (Picasso, Van Gogh).",
      },
      {
        id: "art_res2",
        titulo: "Elementos Visuais",
        conteudo:
          "Os elementos básicos das artes visuais são: ponto (menor elemento visual), linha (conecta pontos), forma (contorno fechado), cor (sensação visual da luz), textura (qualidade da superfície), espaço (dimensões) e volume (tridimensionalidade). Estes elementos se combinam para criar composições artísticas.",
      },
      {
        id: "art_res3",
        titulo: "Técnicas Artísticas",
        conteudo:
          "Principais técnicas: desenho (lápis, carvão, nanquim), pintura (aquarela, óleo, acrílica), escultura (argila, mármore, bronze), gravura (xilogravura, litografia), colagem e arte digital. Cada técnica tem características únicas e permite diferentes expressões criativas.",
      },
    ],
    atividades: [
      {
        id: "art_atv1",
        tipo: "multipla_escolha",
        pergunta: "Qual artista pintou a Mona Lisa?",
        opcoes: [
          "Michelangelo",
          "Leonardo da Vinci",
          "Pablo Picasso",
          "Van Gogh",
        ],
        respostaCorreta: "Leonardo da Vinci",
        recompensa: 8,
      },
      {
        id: "art_atv2",
        tipo: "multipla_escolha",
        pergunta: "Qual é o menor elemento visual nas artes?",
        opcoes: ["Linha", "Ponto", "Forma", "Cor"],
        respostaCorreta: "Ponto",
        recompensa: 6,
      },
      {
        id: "art_atv3",
        tipo: "multipla_escolha",
        pergunta:
          "O Impressionismo foi um movimento artístico caracterizado por:",
        opcoes: [
          "Pinturas muito escuras",
          "Formas geométricas",
          "Captação da luz e movimento",
          "Temas religiosos",
        ],
        respostaCorreta: "Captação da luz e movimento",
        recompensa: 9,
      },
    ],
  },
  fis: {
    resumos: [
      {
        id: "fis_res1",
        titulo: "Leis de Newton",
        conteudo:
          "As três leis de Newton explicam o movimento: 1ª Lei (Inércia) - um corpo em repouso tende a permanecer em repouso, e um corpo em movimento tende a continuar em movimento; 2ª Lei (F=ma) - a força é igual à massa vezes a aceleração; 3ª Lei (Ação e Reação) - para toda ação há uma reação de igual intensidade e direção oposta.",
      },
      {
        id: "fis_res2",
        titulo: "Energia",
        conteudo:
          "Energia é a capacidade de realizar trabalho. Tipos principais: energia cinética (movimento), energia potencial (posição), energia térmica (calor), energia elétrica (corrente), energia química (reações) e energia nuclear (átomos). A lei da conservação diz que energia não se cria nem se destrói, apenas se transforma.",
      },
      {
        id: "fis_res3",
        titulo: "Ondas e Som",
        conteudo:
          "Ondas são perturbações que se propagam transportando energia. Características: amplitude (intensidade), frequência (número de oscilações), comprimento de onda (distância entre cristas). O som é uma onda mecânica que precisa de meio material para se propagar. A velocidade do som no ar é aproximadamente 340 m/s.",
      },
    ],
    atividades: [
      {
        id: "fis_atv1",
        tipo: "multipla_escolha",
        pergunta: "Qual é a 1ª Lei de Newton?",
        opcoes: ["F=ma", "Lei da Inércia", "Ação e Reação", "Lei da Gravidade"],
        respostaCorreta: "Lei da Inércia",
        recompensa: 10,
      },
      {
        id: "fis_atv2",
        tipo: "multipla_escolha",
        pergunta: "A energia não pode ser:",
        opcoes: ["Transformada", "Criada nem destruída", "Medida", "Utilizada"],
        respostaCorreta: "Criada nem destruída",
        recompensa: 8,
      },
      {
        id: "fis_atv3",
        tipo: "multipla_escolha",
        pergunta: "A velocidade do som no ar é aproximadamente:",
        opcoes: ["300 m/s", "340 m/s", "400 m/s", "500 m/s"],
        respostaCorreta: "340 m/s",
        recompensa: 7,
      },
    ],
  },
  qui: {
    resumos: [
      {
        id: "qui_res1",
        titulo: "Estrutura Atômica",
        conteudo:
          "O átomo é formado por núcleo (prótons e nêutrons) e eletrosfera (elétrons). Prótons têm carga positiva, elétrons carga negativa e nêutrons são neutros. O número de prótons determina o elemento químico. A eletrosfera possui camadas energéticas onde os elétrons se distribuem.",
      },
      {
        id: "qui_res2",
        titulo: "Tabela Periódica",
        conteudo:
          "A tabela periódica organiza os elementos químicos por número atômico crescente. Possui 18 colunas (famílias) e 7 linhas (períodos). Elementos da mesma família têm propriedades semelhantes. Principais famílias: metais alcalinos, halogênios, gases nobres, metais de transição.",
      },
      {
        id: "qui_res3",
        titulo: "Ligações Químicas",
        conteudo:
          "Ligações químicas unem átomos formando compostos. Tipos: iônica (transferência de elétrons entre metal e ametal), covalente (compartilhamento de elétrons entre ametais) e metálica (elétrons livres entre metais). Cada tipo confere propriedades específicas aos compostos.",
      },
    ],
    atividades: [
      {
        id: "qui_atv1",
        tipo: "multipla_escolha",
        pergunta: "Qual partícula tem carga negativa?",
        opcoes: ["Próton", "Nêutron", "Elétron", "Núcleo"],
        respostaCorreta: "Elétron",
        recompensa: 6,
      },
      {
        id: "qui_atv2",
        tipo: "multipla_escolha",
        pergunta: "Quantas colunas tem a tabela periódica?",
        opcoes: ["16", "17", "18", "20"],
        respostaCorreta: "18",
        recompensa: 7,
      },
      {
        id: "qui_atv3",
        tipo: "multipla_escolha",
        pergunta: "A ligação entre metal e ametal é:",
        opcoes: ["Covalente", "Iônica", "Metálica", "Dipolar"],
        respostaCorreta: "Iônica",
        recompensa: 8,
      },
    ],
  },
  bio: {
    resumos: [
      {
        id: "bio_res1",
        titulo: "Célula",
        conteudo:
          "A célula é a unidade básica da vida. Tipos: procarióticas (sem núcleo definido, como bactérias) e eucarióticas (com núcleo, como plantas e animais). Organelas importantes: núcleo (DNA), mitocôndria (energia), ribossomos (proteínas), retículo endoplasmático (transporte), complexo de Golgi (secreção).",
      },
      {
        id: "bio_res2",
        titulo: "Ecossistemas",
        conteudo:
          "Ecossistema é o conjunto de seres vivos e ambiente físico em interação. Componentes: fatores bióticos (seres vivos) e abióticos (luz, água, solo, temperatura). Cadeia alimentar: produtores (plantas) → consumidores primários (herbívoros) → consumidores secundários (carnívoros) → decompositores.",
      },
      {
        id: "bio_res3",
        titulo: "Genética",
        conteudo:
          "Genética estuda a hereditariedade. DNA contém informações genéticas em genes. Cromossomos carregam genes. Características podem ser dominantes (se expressam sempre) ou recessivas (só se expressam em dose dupla). Leis de Mendel explicam como características passam de pais para filhos.",
      },
    ],
    atividades: [
      {
        id: "bio_atv1",
        tipo: "multipla_escolha",
        pergunta: "Qual organela produz energia na célula?",
        opcoes: ["Núcleo", "Mitocôndria", "Ribossomo", "Complexo de Golgi"],
        respostaCorreta: "Mitocôndria",
        recompensa: 8,
      },
      {
        id: "bio_atv2",
        tipo: "multipla_escolha",
        pergunta: "Na cadeia alimentar, os produtores são:",
        opcoes: ["Carnívoros", "Herbívoros", "Plantas", "Fungos"],
        respostaCorreta: "Plantas",
        recompensa: 6,
      },
      {
        id: "bio_atv3",
        tipo: "multipla_escolha",
        pergunta: "O DNA está localizado principalmente no:",
        opcoes: ["Citoplasma", "Núcleo", "Ribossomo", "Mitocôndria"],
        respostaCorreta: "Núcleo",
        recompensa: 7,
      },
    ],
  },
  fil: {
    resumos: [
      {
        id: "fil_res1",
        titulo: "O que é Filosofia",
        conteudo:
          "Filosofia significa 'amor à sabedoria'. É a busca por respostas fundamentais sobre existência, conhecimento, valores, razão e realidade. Difere da ciência por usar principalmente o raciocínio e a reflexão. Grandes filósofos: Sócrates (conhece-te a ti mesmo), Platão (mundo das ideias), Aristóteles (lógica).",
      },
      {
        id: "fil_res2",
        titulo: "Ética e Moral",
        conteudo:
          "Ética estuda o que é certo ou errado, bom ou mau. Moral são regras de comportamento de uma sociedade. Principais questões éticas: O que é justiça? Como devemos agir? O que é uma vida boa? Correntes éticas: utilitarismo (maior bem para maior número), deontologia (dever), virtudes.",
      },
      {
        id: "fil_res3",
        titulo: "Teoria do Conhecimento",
        conteudo:
          "Como conhecemos a realidade? Fontes do conhecimento: sentidos (empirismo), razão (racionalismo), experiência, intuição. Problemas: Como saber se algo é verdadeiro? O que podemos realmente conhecer? Descartes: 'Penso, logo existo'. Ceticismo questiona possibilidade de conhecimento absoluto.",
      },
    ],
    atividades: [
      {
        id: "fil_atv1",
        tipo: "multipla_escolha",
        pergunta: "O que significa 'filosofia'?",
        opcoes: [
          "Amor ao dinheiro",
          "Amor à sabedoria",
          "Amor à arte",
          "Amor à ciência",
        ],
        respostaCorreta: "Amor à sabedoria",
        recompensa: 6,
      },
      {
        id: "fil_atv2",
        tipo: "multipla_escolha",
        pergunta: "Quem disse 'Penso, logo existo'?",
        opcoes: ["Sócrates", "Platão", "Aristóteles", "Descartes"],
        respostaCorreta: "Descartes",
        recompensa: 8,
      },
      {
        id: "fil_atv3",
        tipo: "multipla_escolha",
        pergunta: "A ética estuda:",
        opcoes: [
          "As leis da física",
          "O certo e o errado",
          "Os números",
          "As plantas",
        ],
        respostaCorreta: "O certo e o errado",
        recompensa: 7,
      },
    ],
  },
  soc: {
    resumos: [
      {
        id: "soc_res1",
        titulo: "O que é Sociedade",
        conteudo:
          "Sociedade é um grupo de pessoas que convivem e se relacionam em um território, compartilhando cultura, normas e instituições. Elementos: população, território, governo, soberania. Instituições sociais: família, escola, religião, estado, mídia. Cada sociedade tem sua cultura única.",
      },
      {
        id: "soc_res2",
        titulo: "Estratificação Social",
        conteudo:
          "Estratificação é a divisão da sociedade em camadas ou classes sociais. Critérios: renda, educação, prestígio, poder. Mobilidade social: mudança de posição na hierarquia. Tipos: ascendente (subir) ou descendente (descer). Fatores: educação, trabalho, herança, sorte.",
      },
      {
        id: "soc_res3",
        titulo: "Cultura e Socialização",
        conteudo:
          "Cultura inclui conhecimentos, crenças, arte, moral, leis, costumes e capacidades adquiridos pela vida em sociedade. Socialização é o processo de aprender a viver em sociedade. Agentes: família (primária), escola, amigos, mídia (secundária). Cada grupo social tem subculturas próprias.",
      },
    ],
    atividades: [
      {
        id: "soc_atv1",
        tipo: "multipla_escolha",
        pergunta: "O que é estratificação social?",
        opcoes: [
          "Divisão em camadas sociais",
          "Estudo dos planetas",
          "Tipo de rocha",
          "Método de ensino",
        ],
        respostaCorreta: "Divisão em camadas sociais",
        recompensa: 8,
      },
      {
        id: "soc_atv2",
        tipo: "multipla_escolha",
        pergunta: "A socialização primária ocorre principalmente na:",
        opcoes: ["Escola", "Família", "Trabalho", "Igreja"],
        respostaCorreta: "Família",
        recompensa: 6,
      },
      {
        id: "soc_atv3",
        tipo: "multipla_escolha",
        pergunta: "Qual NÃO é uma instituição social?",
        opcoes: ["Família", "Escola", "Estado", "Pedra"],
        respostaCorreta: "Pedra",
        recompensa: 5,
      },
    ],
  },
  esp: {
    resumos: [
      {
        id: "esp_res1",
        titulo: "Alfabeto e Pronunciação",
        conteudo:
          "O espanhol tem 27 letras (incluindo ñ). Pronunciação é mais regular que português. Vogais: a, e, i, o, u (som puro). Consoantes especiais: ñ (como nh), ll (como lh), rr (r forte), j (som mais forte que português). Acentuação: agudas, graves, esdrújulas.",
      },
      {
        id: "esp_res2",
        titulo: "Verbos Básicos",
        conteudo:
          "Verbos terminam em -ar, -er, -ir. Presente do indicativo: canto, cantas, canta, cantamos, cantáis, cantan. Verbos importantes: ser (permanent), estar (temporary), haber (auxiliary), tener (ter), hacer (fazer), ir (ir), venir (vir), dar (dar), decir (dizer).",
      },
      {
        id: "esp_res3",
        titulo: "Vocabulário Cotidiano",
        conteudo:
          "Saudações: hola (oi), buenos días (bom dia), buenas tardes (boa tarde), buenas noches (boa noite). Família: padre (pai), madre (mãe), hermano (irmão), hermana (irmã), hijo (filho), hija (filha). Números: uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez.",
      },
    ],
    atividades: [
      {
        id: "esp_atv1",
        tipo: "multipla_escolha",
        pergunta: "Como se diz 'bom dia' em espanhol?",
        opcoes: ["Buenas noches", "Buenos días", "Buenas tardes", "Hola"],
        respostaCorreta: "Buenos días",
        recompensa: 5,
      },
      {
        id: "esp_atv2",
        tipo: "multipla_escolha",
        pergunta: "Quantas letras tem o alfabeto espanhol?",
        opcoes: ["26", "27", "28", "29"],
        respostaCorreta: "27",
        recompensa: 6,
      },
      {
        id: "esp_atv3",
        tipo: "multipla_escolha",
        pergunta: "Qual é a forma 'yo' do verbo 'cantar'?",
        opcoes: ["canta", "canto", "cantas", "cantamos"],
        respostaCorreta: "canto",
        recompensa: 7,
      },
    ],
  },
  lit: {
    resumos: [
      {
        id: "lit_res1",
        titulo: "Gêneros Literários",
        conteudo:
          "Literatura divide-se em três gêneros principais: Épico/Narrativo (conta uma história: romance, novela, conto, crônica, fábula), Lírico (expressa sentimentos: soneto, elegia, ode), Dramático (texto teatral: auto, comédia, tragédia, drama). Cada gênero tem características e estruturas específicas.",
      },
      {
        id: "lit_res2",
        titulo: "Figuras de Linguagem",
        conteudo:
          "Recursos que dão expressividade ao texto: Metáfora (comparação implícita), Símile (comparação explícita com 'como'), Personificação (características humanas a objetos), Hipérbole (exagero), Antítese (ideias opostas), Ironia (dizer o contrário), Aliteração (repetição de sons), Onomatopeia (imitação de sons).",
      },
      {
        id: "lit_res3",
        titulo: "Escolas Literárias Brasileiras",
        conteudo:
          "Barroco (séc. XVII): religiosidade, conflito, Gregório de Matos. Arcadismo (séc. XVIII): simplicidade, natureza, Tomás Antônio Gonzaga. Romantismo (séc. XIX): sentimento, nacionalismo, José de Alencar. Realismo: crítica social, Machado de Assis. Modernismo (séc. XX): ruptura, experimentação, Mario de Andrade.",
      },
    ],
    atividades: [
      {
        id: "lit_atv1",
        tipo: "multipla_escolha",
        pergunta: "O gênero lírico expressa principalmente:",
        opcoes: ["Uma história", "Sentimentos", "Peças teatrais", "Descrições"],
        respostaCorreta: "Sentimentos",
        recompensa: 7,
      },
      {
        id: "lit_atv2",
        tipo: "multipla_escolha",
        pergunta: "Qual figura de linguagem está em 'Minha mãe é uma flor'?",
        opcoes: ["Hipérbole", "Ironia", "Metáfora", "Onomatopeia"],
        respostaCorreta: "Metáfora",
        recompensa: 8,
      },
      {
        id: "lit_atv3",
        tipo: "multipla_escolha",
        pergunta: "Machado de Assis pertence ao:",
        opcoes: ["Barroco", "Romantismo", "Realismo", "Modernismo"],
        respostaCorreta: "Realismo",
        recompensa: 9,
      },
    ],
  },
  red: {
    resumos: [
      {
        id: "red_res1",
        titulo: "Estrutura da Redação",
        conteudo:
          "Redação bem estruturada tem: Introdução (apresenta o tema, contextualiza, tese), Desenvolvimento (2-3 parágrafos com argumentos, exemplos, dados), Conclusão (retoma tese, propõe soluções). Cada parágrafo deve ter unidade temática. Use conectivos para ligar ideias: portanto, entretanto, além disso, por exemplo.",
      },
      {
        id: "red_res2",
        titulo: "Tipos de Texto",
        conteudo:
          "Narrativo: conta fatos (enredo, personagens, tempo, espaço, narrador). Descritivo: caracteriza (pessoa, objeto, lugar, sensações). Dissertativo: defende ponto de vista (argumentação, persuasão). Injuntivo: instrui (receitas, manuais). Expositivo: informa (conceitos, explicações).",
      },
      {
        id: "red_res3",
        titulo: "Técnicas de Argumentação",
        conteudo:
          "Argumentos eficazes: exemplificação (casos concretos), comparação (semelhanças/diferenças), causa e consequência, dados estatísticos, citação de autoridade, argumento de senso comum. Evite: generalização excessiva, contradições, falta de clareza, argumentos fracos. Use linguagem formal e impessoal.",
      },
    ],
    atividades: [
      {
        id: "red_atv1",
        tipo: "multipla_escolha",
        pergunta: "Quantas partes tem uma redação bem estruturada?",
        opcoes: ["2", "3", "4", "5"],
        respostaCorreta: "3",
        recompensa: 6,
      },
      {
        id: "red_atv2",
        tipo: "multipla_escolha",
        pergunta: "O texto dissertativo tem como objetivo:",
        opcoes: [
          "Contar uma história",
          "Descrever algo",
          "Defender um ponto de vista",
          "Dar instruções",
        ],
        respostaCorreta: "Defender um ponto de vista",
        recompensa: 8,
      },
      {
        id: "red_atv3",
        tipo: "multipla_escolha",
        pergunta: "Qual conectivo indica conclusão?",
        opcoes: ["Entretanto", "Portanto", "Além disso", "Por exemplo"],
        respostaCorreta: "Portanto",
        recompensa: 7,
      },
    ],
  },
  inf: {
    resumos: [
      {
        id: "inf_res1",
        titulo: "Componentes do Computador",
        conteudo:
          "Hardware: componentes físicos (placa-mãe, processador, memória RAM, HD/SSD, placa de vídeo, fonte). Software: programas (sistema operacional, aplicativos, drivers). Periféricos: entrada (teclado, mouse, microfone), saída (monitor, impressora, caixas de som), entrada/saída (touchscreen, modem).",
      },
      {
        id: "inf_res2",
        titulo: "Internet e Redes",
        conteudo:
          "Internet: rede mundial de computadores conectados. Protocolos: HTTP (web), FTP (arquivos), SMTP (email). URL: endereço web (protocolo://domínio/caminho). Tipos de rede: LAN (local), WAN (ampla), Wi-Fi (sem fio). Navegadores: Chrome, Firefox, Safari, Edge. Segurança: antivírus, firewall, senhas seguras.",
      },
      {
        id: "inf_res3",
        titulo: "Sistemas Operacionais",
        conteudo:
          "SO gerencia recursos do computador. Principais: Windows (Microsoft), macOS (Apple), Linux (código aberto), Android (mobile), iOS (mobile). Funções: gerenciar memória, processos, arquivos, dispositivos. Interface: linha de comando ou gráfica. Aplicativos: processadores de texto, planilhas, navegadores, jogos.",
      },
    ],
    atividades: [
      {
        id: "inf_atv1",
        tipo: "multipla_escolha",
        pergunta: "O que significa RAM?",
        opcoes: [
          "Memória de armazenamento",
          "Memória de acesso aleatório",
          "Placa de vídeo",
          "Processador",
        ],
        respostaCorreta: "Memória de acesso aleatório",
        recompensa: 8,
      },
      {
        id: "inf_atv2",
        tipo: "multipla_escolha",
        pergunta: "Qual protocolo é usado para navegar na web?",
        opcoes: ["FTP", "SMTP", "HTTP", "TCP"],
        respostaCorreta: "HTTP",
        recompensa: 7,
      },
      {
        id: "inf_atv3",
        tipo: "multipla_escolha",
        pergunta: "Qual é um sistema operacional de código aberto?",
        opcoes: ["Windows", "macOS", "Linux", "Android"],
        respostaCorreta: "Linux",
        recompensa: 6,
      },
    ],
  },
  mus: {
    resumos: [
      {
        id: "mus_res1",
        titulo: "Elementos da Música",
        conteudo:
          "Música tem três elementos fundamentais: Melodia (sucessão de sons de alturas diferentes), Harmonia (sons simultâneos, acordes), Ritmo (duração e acentuação dos sons). Propriedades do som: altura (grave/agudo), intensidade (forte/fraco), timbre (qualidade), duração (longo/curto). Pausa é ausência de som.",
      },
      {
        id: "mus_res2",
        titulo: "Notação Musical",
        conteudo:
          "Partitura representa música por escrito. Pentagrama: 5 linhas horizontais. Claves: Sol (aguda), Fá (grave), Dó (média). Notas: Dó, Ré, Mi, Fá, Sol, Lá, Si. Figuras rítmicas: semibreve (4 tempos), mínima (2), semínima (1), colcheia (1/2), semicolcheia (1/4). Compassos organizam o tempo.",
      },
      {
        id: "mus_res3",
        titulo: "Gêneros Musicais",
        conteudo:
          "Clássica: sinfonia, concerto, sonata (Bach, Mozart, Beethoven). Popular brasileira: samba, bossa nova, forró, MPB, funk. Internacional: rock, pop, jazz, blues, reggae, rap, eletrônica. Folclórica: manifestações culturais regionais. Cada gênero tem características rítmicas, harmônicas e instrumentais próprias.",
      },
    ],
    atividades: [
      {
        id: "mus_atv1",
        tipo: "multipla_escolha",
        pergunta: "Quantas linhas tem um pentagrama?",
        opcoes: ["4", "5", "6", "7"],
        respostaCorreta: "5",
        recompensa: 5,
      },
      {
        id: "mus_atv2",
        tipo: "multipla_escolha",
        pergunta: "Qual elemento musical se refere à duração dos sons?",
        opcoes: ["Melodia", "Harmonia", "Ritmo", "Timbre"],
        respostaCorreta: "Ritmo",
        recompensa: 7,
      },
      {
        id: "mus_atv3",
        tipo: "multipla_escolha",
        pergunta: "Quantos tempos tem uma semibreve?",
        opcoes: ["1", "2", "3", "4"],
        respostaCorreta: "4",
        recompensa: 6,
      },
    ],
  },
  geo_fis: {
    resumos: [
      {
        id: "geo_fis_res1",
        titulo: "Estrutura da Terra",
        conteudo:
          "Terra tem estrutura em camadas: crosta (superfície sólida), manto (rocha derretida quente), núcleo externo (ferro líquido), núcleo interno (ferro sólido). Placas tectônicas: pedaços da crosta que se movem, causando terremotos, vulcões e formação de montanhas. Teoria da deriva continental explica estes movimentos.",
      },
      {
        id: "geo_fis_res2",
        titulo: "Ciclo da Água",
        conteudo:
          "Água circula constantemente: evaporação (oceanos, rios, lagos) → condensação (nuvens) → precipitação (chuva, neve) → infiltração/escoamento → retorno aos oceanos. Estados: sólido (gelo), líquido (água), gasoso (vapor). 71% da Terra é coberta por água, mas apenas 3% é doce.",
      },
      {
        id: "geo_fis_res3",
        titulo: "Tipos de Rochas",
        conteudo:
          "Três tipos principais: Ígneas (magma resfriado: granito, basalto), Sedimentares (acúmulo de sedimentos: arenito, calcário), Metamórficas (transformação por pressão/calor: mármore, quartzito). Ciclo das rochas: cada tipo pode se transformar em outro através de processos geológicos.",
      },
    ],
    atividades: [
      {
        id: "geo_fis_atv1",
        tipo: "multipla_escolha",
        pergunta: "Qual é a camada mais externa da Terra?",
        opcoes: ["Manto", "Núcleo", "Crosta", "Atmosfera"],
        respostaCorreta: "Crosta",
        recompensa: 6,
      },
      {
        id: "geo_fis_atv2",
        tipo: "multipla_escolha",
        pergunta: "Que porcentagem da Terra é coberta por água?",
        opcoes: ["61%", "71%", "81%", "91%"],
        respostaCorreta: "71%",
        recompensa: 7,
      },
      {
        id: "geo_fis_atv3",
        tipo: "multipla_escolha",
        pergunta: "O granito é uma rocha:",
        opcoes: ["Sedimentar", "Metamórfica", "Ígnea", "Artificial"],
        respostaCorreta: "Ígnea",
        recompensa: 8,
      },
    ],
  },
  geo_hum: {
    resumos: [
      {
        id: "geo_hum_res1",
        titulo: "População Mundial",
        conteudo:
          "Mundo tem cerca de 8 bilhões de habitantes. Distribuição desigual: maiores concentrações no leste asiático, sul asiático, Europa ocidental. Fatores de concentração: clima favorável, recursos naturais, desenvolvimento econômico. Demografia estuda nascimentos, mortes, migrações. Transição demográfica: países desenvolvidos têm baixo crescimento.",
      },
      {
        id: "geo_hum_res2",
        titulo: "Urbanização",
        conteudo:
          "Processo de crescimento das cidades. Causas: industrialização, migração rural-urbana, melhores oportunidades. Consequências positivas: serviços, educação, saúde. Problemas: poluição, trânsito, violência, desigualdade. Megalópoles: grandes aglomerações urbanas com milhões de habitantes.",
      },
      {
        id: "geo_hum_res3",
        titulo: "Globalização",
        conteudo:
          "Processo de integração mundial: econômica (comércio, investimentos), cultural (mídia, internet), tecnológica (comunicações, transportes). Características: multinacionais, blocos econômicos, fluxos migratórios. Aspectos positivos: desenvolvimento, intercâmbio. Negativos: desigualdades, perda de identidades locais.",
      },
    ],
    atividades: [
      {
        id: "geo_hum_atv1",
        tipo: "multipla_escolha",
        pergunta: "A população mundial é de aproximadamente:",
        opcoes: ["6 bilhões", "7 bilhões", "8 bilhões", "9 bilhões"],
        respostaCorreta: "8 bilhões",
        recompensa: 6,
      },
      {
        id: "geo_hum_atv2",
        tipo: "multipla_escolha",
        pergunta: "O que é urbanização?",
        opcoes: [
          "Crescimento das cidades",
          "Preservação da natureza",
          "Diminuição da população",
          "Desenvolvimento rural",
        ],
        respostaCorreta: "Crescimento das cidades",
        recompensa: 7,
      },
      {
        id: "geo_hum_atv3",
        tipo: "multipla_escolha",
        pergunta: "A globalização NÃO envolve:",
        opcoes: [
          "Integração econômica",
          "Intercâmbio cultural",
          "Isolamento dos países",
          "Avanços tecnológicos",
        ],
        respostaCorreta: "Isolamento dos países",
        recompensa: 8,
      },
    ],
  },
};
const MOCK_LOJA_PONTOS = [
  {
    id: "mat_pts",
    nome: "Matemática",
    iconeMCI: null,
    iconeIon: "calculator",
    corIcone: "#D32F2F",
    pontos: 0.5,
    precoMoedas: 750,
  },
  {
    id: "port_pts",
    nome: "Português",
    iconeMCI: null,
    iconeIon: "book",
    corIcone: "#00796B",
    pontos: 0.5,
    precoMoedas: 750,
  },
  {
    id: "hist_pts",
    nome: "História",
    iconeMCI: null,
    iconeIon: "library",
    corIcone: "#F57C00",
    pontos: 0.5,
    precoMoedas: 470,
  },
  {
    id: "geo_pts",
    nome: "Geografia",
    iconeMCI: null,
    iconeIon: "map",
    corIcone: "#0288D1",
    pontos: 0.5,
    precoMoedas: 520,
  },
  {
    id: "cie_pts",
    nome: "Ciências",
    iconeMCI: "flask",
    iconeIon: null,
    corIcone: "#388E3C",
    pontos: 0.5,
    precoMoedas: 500,
  },
  {
    id: "ing_pts",
    nome: "Inglês",
    iconeMCI: "translate",
    iconeIon: null,
    corIcone: "#C2185B",
    pontos: 0.25,
    precoMoedas: 220,
  },
  {
    id: "edf_pts",
    nome: "Ed. Física",
    iconeMCI: "basketball",
    iconeIon: null,
    corIcone: "#1976D2",
    pontos: 0.5,
    precoMoedas: 300,
  },
  {
    id: "art_pts",
    nome: "Artes",
    iconeMCI: "palette",
    iconeIon: null,
    corIcone: "#E91E63",
    pontos: 0.5,
    precoMoedas: 350,
  },
  {
    id: "fis_pts",
    nome: "Física",
    iconeMCI: "atom",
    iconeIon: null,
    corIcone: "#FF5722",
    pontos: 0.5,
    precoMoedas: 680,
  },
  {
    id: "qui_pts",
    nome: "Química",
    iconeMCI: "test-tube",
    iconeIon: null,
    corIcone: "#9C27B0",
    pontos: 0.5,
    precoMoedas: 650,
  },
  {
    id: "bio_pts",
    nome: "Biologia",
    iconeMCI: "leaf",
    iconeIon: null,
    corIcone: "#4CAF50",
    pontos: 0.5,
    precoMoedas: 580,
  },
  {
    id: "fil_pts",
    nome: "Filosofia",
    iconeMCI: "head-lightbulb",
    iconeIon: null,
    corIcone: "#795548",
    pontos: 0.25,
    precoMoedas: 380,
  },
  {
    id: "soc_pts",
    nome: "Sociologia",
    iconeMCI: "account-group",
    iconeIon: null,
    corIcone: "#607D8B",
    pontos: 0.25,
    precoMoedas: 400,
  },
  {
    id: "esp_pts",
    nome: "Espanhol",
    iconeMCI: "castle",
    iconeIon: null,
    corIcone: "#FF9800",
    pontos: 0.25,
    precoMoedas: 280,
  },
  {
    id: "lit_pts",
    nome: "Literatura",
    iconeMCI: null,
    iconeIon: "library-outline",
    corIcone: "#673AB7",
    pontos: 0.5,
    precoMoedas: 550,
  },
  {
    id: "red_pts",
    nome: "Redação",
    iconeMCI: "pencil",
    iconeIon: null,
    corIcone: "#3F51B5",
    pontos: 0.5,
    precoMoedas: 450,
  },
  {
    id: "inf_pts",
    nome: "Informática",
    iconeMCI: "laptop",
    iconeIon: null,
    corIcone: "#2196F3",
    pontos: 0.5,
    precoMoedas: 600,
  },
  {
    id: "mus_pts",
    nome: "Música",
    iconeMCI: "music",
    iconeIon: null,
    corIcone: "#FF4081",
    pontos: 0.5,
    precoMoedas: 320,
  },
  {
    id: "geo_fis_pts",
    nome: "Geografia Física",
    iconeMCI: "earth",
    iconeIon: null,
    corIcone: "#00BCD4",
    pontos: 0.25,
    precoMoedas: 420,
  },
  {
    id: "geo_hum_pts",
    nome: "Geografia Humana",
    iconeMCI: "city-variant",
    iconeIon: null,
    corIcone: "#009688",
    pontos: 0.25,
    precoMoedas: 390,
  },
];
const MOCK_TAREFAS_RESGATE = {
  semanais: [
    {
      id: "tarS1",
      materia: "Matemática",
      descricao: "Resolva as questões de Geometria",
      recompensa: 20,
      iconeMCI: null,
      iconeIon: "calculator",
      corIcone: "#D32F2F",
    },
    {
      id: "tarS2",
      materia: "Português",
      descricao: "Resolva as questões de verbos",
      recompensa: 30,
      iconeMCI: null,
      iconeIon: "book",
      corIcone: "#00796B",
    },
    {
      id: "tarS3",
      materia: "Geografia",
      descricao: "Resolva as questões de países",
      recompensa: 15,
      iconeMCI: null,
      iconeIon: "map",
      corIcone: "#0288D1",
    },
    {
      id: "tarS4",
      materia: "História",
      descricao: "Resolva as questões de Oriente Médio",
      recompensa: 10,
      iconeMCI: null,
      iconeIon: "library",
      corIcone: "#F57C00",
    },
  ],
  diarias: [
    {
      id: "tarD1",
      materia: "Ed. Física",
      descricao: "Faça flexões",
      recompensa: 2,
      iconeMCI: "basketball",
      iconeIon: null,
      corIcone: "#1976D2",
    },
    {
      id: "tarD2",
      materia: "Ciências",
      descricao: "Faça um foguete",
      recompensa: 2,
      iconeMCI: "flask",
      iconeIon: null,
      corIcone: "#388E3C",
    },
    {
      id: "tarD3",
      materia: "Inglês",
      descricao: "Complete a lição X",
      recompensa: 2,
      iconeMCI: "translate",
      iconeIon: null,
      corIcone: "#C2185B",
    },
  ],
};
const MOCK_NOTAS = {
  nomeAluno: "Lucas Neto",
  anoEscolar: "301",
  serie: "301",
  matricula: "14556734",
  disciplinas: [
    { nome: "Matemática", a1: 10, a2: 7, a3: 9 },
    { nome: "Português", a1: 8, a2: 9, a3: 7 },
    { nome: "Ed. Física", a1: 10, a2: 8, a3: 7 },
    { nome: "Geografia", a1: 5, a2: 8, a3: 9 },
    { nome: "História", a1: 8, a2: 10, a3: 7 },
    { nome: "Inglês", a1: 9, a2: 8, a3: 6 },
    { nome: "Ciências", a1: 8, a2: 8, a3: 7 },
  ],
  ausencias: [
    {
      id: "aus1",
      data: "15/05/2025",
      disciplina: "Matemática",
      motivo: "Ausência sem justificativa",
      periodo: "Manhã (1º e 2º horário)",
      professor: "Prof. Ana Maria Silva",
    },
    {
      id: "aus2",
      data: "22/05/2025",
      disciplina: "História",
      motivo: "Ausência sem justificativa",
      periodo: "Tarde (3º horário)",
      professor: "Prof. Bruno Costa",
    },
    {
      id: "aus3",
      data: "28/05/2025",
      disciplina: "Ciências",
      motivo: "Ausência sem justificativa",
      periodo: "Manhã (4º horário)",
      professor: "Prof. Carla Santos",
    },
  ],
  faltas: [
    {
      id: "fal1",
      data: "10/06/2025",
      disciplina: "Ed. Física",
      motivo: "Não participou das atividades práticas",
      periodo: "Tarde (5º e 6º horário)",
      professor: "Prof. Hugo Barbosa",
      observacao: "Presente em sala, mas não participou das atividades físicas",
    },
    {
      id: "fal2",
      data: "12/06/2025",
      disciplina: "Inglês",
      motivo: "Chegou atrasado (mais de 15 min)",
      periodo: "Manhã (2º horário)",
      professor: "Prof. Elena Rodriguez",
      observacao: "Chegou 20 minutos após o início da aula",
    },
  ],
  ausenciasJustificadas: [
    {
      id: "ausJust1",
      data: "05/06/2025",
      disciplina: "Português",
      motivo: "Consulta médica",
      periodo: "Manhã (1º e 2º horário)",
      professor: "Prof. Daniel Oliveira",
      justificativa: "Atestado médico apresentado",
      documentoAnexado: "Atestado_medico_05062025.pdf",
    },
    {
      id: "ausJust2",
      data: "08/06/2025",
      disciplina: "Geografia",
      motivo: "Compromisso familiar",
      periodo: "Tarde (4º horário)",
      professor: "Prof. Fernando Almeida",
      justificativa: "Comunicação prévia dos responsáveis",
      documentoAnexado: "Declaracao_responsaveis_08062025.pdf",
    },
    {
      id: "ausJust3",
      data: "14/06/2025",
      disciplina: "Química",
      motivo: "Participação em competição escolar",
      periodo: "Manhã (3º e 4º horário)",
      professor: "Prof. Gabriela Medeiros",
      justificativa: "Olimpíada Brasileira de Química - representando a escola",
    },
  ],
};

// Dados mockados para desempenho por disciplina
const MOCK_DESEMPENHO = {
  mat: {
    disciplina: "Matemática",
    cor: "#D32F2F",
    iconeIon: "calculator",
    iconLib: Ionicons,
    atividadesPendentes: 3,
    totalMoedas: 850,
    desempenhoTotal: 85,
    graficoMensal: [
      { mes: "02/24", valor: 3 },
      { mes: "03/24", valor: 5 },
      { mes: "04/24", valor: 4 },
      { mes: "05/24", valor: 7 },
      { mes: "06/24", valor: 8 },
    ],
    estatisticas: {
      resumosLidos: 12,
      atividadesCompletas: 28,
      tempoEstudo: "45h 30min",
      melhorNota: 9.5,
      mediaGeral: 8.5,
      proximaProva: "20/06/2025",
    },
  },
  port: {
    disciplina: "Português",
    cor: "#00796B",
    iconeIon: "book",
    iconLib: Ionicons,
    atividadesPendentes: 2,
    totalMoedas: 720,
    desempenhoTotal: 78,
    graficoMensal: [
      { mes: "02/24", valor: 4 },
      { mes: "03/24", valor: 6 },
      { mes: "04/24", valor: 5 },
      { mes: "05/24", valor: 7 },
      { mes: "06/24", valor: 7 },
    ],
    estatisticas: {
      resumosLidos: 8,
      atividadesCompletas: 22,
      tempoEstudo: "32h 15min",
      melhorNota: 9.0,
      mediaGeral: 7.8,
      proximaProva: "18/06/2025",
    },
  },
  hist: {
    disciplina: "História",
    cor: "#F57C00",
    iconeIon: "library",
    iconLib: Ionicons,
    atividadesPendentes: 1,
    totalMoedas: 650,
    desempenhoTotal: 82,
    graficoMensal: [
      { mes: "02/24", valor: 2 },
      { mes: "03/24", valor: 4 },
      { mes: "04/24", valor: 6 },
      { mes: "05/24", valor: 8 },
      { mes: "06/24", valor: 8 },
    ],
    estatisticas: {
      resumosLidos: 15,
      atividadesCompletas: 19,
      tempoEstudo: "28h 45min",
      melhorNota: 8.5,
      mediaGeral: 8.2,
      proximaProva: "22/06/2025",
    },
  },
  geo: {
    disciplina: "Geografia",
    cor: "#0288D1",
    iconeIon: "map",
    iconLib: Ionicons,
    atividadesPendentes: 4,
    totalMoedas: 580,
    desempenhoTotal: 76,
    graficoMensal: [
      { mes: "02/24", valor: 3 },
      { mes: "03/24", valor: 3 },
      { mes: "04/24", valor: 5 },
      { mes: "05/24", valor: 6 },
      { mes: "06/24", valor: 7 },
    ],
    estatisticas: {
      resumosLidos: 10,
      atividadesCompletas: 16,
      tempoEstudo: "24h 20min",
      melhorNota: 8.8,
      mediaGeral: 7.6,
      proximaProva: "25/06/2025",
    },
  },
  cie: {
    disciplina: "Ciências",
    cor: "#388E3C",
    iconeMCI: "flask",
    iconLib: MaterialCommunityIcons,
    atividadesPendentes: 2,
    totalMoedas: 780,
    desempenhoTotal: 88,
    graficoMensal: [
      { mes: "02/24", valor: 4 },
      { mes: "03/24", valor: 5 },
      { mes: "04/24", valor: 7 },
      { mes: "05/24", valor: 8 },
      { mes: "06/24", valor: 9 },
    ],
    estatisticas: {
      resumosLidos: 14,
      atividadesCompletas: 25,
      tempoEstudo: "38h 10min",
      melhorNota: 9.8,
      mediaGeral: 8.8,
      proximaProva: "19/06/2025",
    },
  },
  ing: {
    disciplina: "Inglês",
    cor: "#C2185B",
    iconeMCI: "translate",
    iconLib: MaterialCommunityIcons,
    atividadesPendentes: 1,
    totalMoedas: 690,
    desempenhoTotal: 80,
    graficoMensal: [
      { mes: "02/24", valor: 3 },
      { mes: "03/24", valor: 4 },
      { mes: "04/24", valor: 6 },
      { mes: "05/24", valor: 7 },
      { mes: "06/24", valor: 8 },
    ],
    estatisticas: {
      resumosLidos: 11,
      atividadesCompletas: 20,
      tempoEstudo: "30h 40min",
      melhorNota: 9.2,
      mediaGeral: 8.0,
      proximaProva: "17/06/2025",
    },
  },
  edf: {
    disciplina: "Ed. Física",
    cor: "#1976D2",
    iconeMCI: "basketball",
    iconLib: MaterialCommunityIcons,
    atividadesPendentes: 0,
    totalMoedas: 520,
    desempenhoTotal: 92,
    graficoMensal: [
      { mes: "02/24", valor: 8 },
      { mes: "03/24", valor: 9 },
      { mes: "04/24", valor: 8 },
      { mes: "05/24", valor: 9 },
      { mes: "06/24", valor: 10 },
    ],
    estatisticas: {
      resumosLidos: 6,
      atividadesCompletas: 18,
      tempoEstudo: "20h 15min",
      melhorNota: 10.0,
      mediaGeral: 9.2,
      proximaProva: "21/06/2025",
    },
  },
};

// --- Dados mockados para frequência ---
const MOCK_FREQUENCIA = [
  {
    id: "freq1",
    nome: "Matemática",
    iconeMCI: null,
    iconeIon: "calculator",
    corIcone: "#D32F2F",
    turma: "AX",
    percentual: 89.5,
  },
  {
    id: "freq2",
    nome: "Português",
    iconeMCI: null,
    iconeIon: "book",
    corIcone: "#00796B",
    turma: "AX",
    percentual: 92.3,
  },
  {
    id: "freq3",
    nome: "História",
    iconeMCI: null,
    iconeIon: "library",
    corIcone: "#F57C00",
    turma: "AX",
    percentual: 85.7,
  },
  {
    id: "freq4",
    nome: "Geografia",
    iconeMCI: null,
    iconeIon: "map",
    corIcone: "#0288D1",
    turma: "AX",
    percentual: 88.1,
  },
  {
    id: "freq5",
    nome: "Ciências",
    iconeMCI: "flask",
    iconeIon: null,
    corIcone: "#388E3C",
    turma: "AX",
    percentual: 91.2,
  },
  {
    id: "freq6",
    nome: "Inglês",
    iconeMCI: "translate",
    iconeIon: null,
    corIcone: "#C2185B",
    turma: "AX",
    percentual: 87.9,
  },
  {
    id: "freq7",
    nome: "Ed. Física",
    iconeMCI: "basketball",
    iconeIon: null,
    corIcone: "#1976D2",
    turma: "AX",
    percentual: 95.8,
  },
  {
    id: "freq8",
    nome: "Artes",
    iconeMCI: "palette",
    iconeIon: null,
    corIcone: "#E91E63",
    turma: "AX",
    percentual: 93.4,
  },
  {
    id: "freq9",
    nome: "Física",
    iconeMCI: "atom",
    iconeIon: null,
    corIcone: "#FF5722",
    turma: "AX",
    percentual: 82.6,
  },
  {
    id: "freq10",
    nome: "Química",
    iconeMCI: "test-tube",
    iconeIon: null,
    corIcone: "#9C27B0",
    turma: "AX",
    percentual: 86.3,
  },
  {
    id: "freq11",
    nome: "Biologia",
    iconeMCI: "leaf",
    iconeIon: null,
    corIcone: "#4CAF50",
    turma: "AX",
    percentual: 90.7,
  },
  {
    id: "freq12",
    nome: "Filosofia",
    iconeMCI: "head-lightbulb",
    iconeIon: null,
    corIcone: "#795548",
    turma: "AX",
    percentual: 84.2,
  },
  {
    id: "freq13",
    nome: "Sociologia",
    iconeMCI: "account-group",
    iconeIon: null,
    corIcone: "#607D8B",
    turma: "AX",
    percentual: 88.9,
  },
  {
    id: "freq14",
    nome: "Espanhol",
    iconeMCI: "castle",
    iconeIon: null,
    corIcone: "#FF9800",
    turma: "AX",
    percentual: 91.5,
  },
  {
    id: "freq15",
    nome: "Literatura",
    iconeMCI: null,
    iconeIon: "library-outline",
    corIcone: "#673AB7",
    turma: "AX",
    percentual: 87.3,
  },
  {
    id: "freq16",
    nome: "Redação",
    iconeMCI: "pencil",
    iconeIon: null,
    corIcone: "#3F51B5",
    turma: "AX",
    percentual: 89.1,
  },
  {
    id: "freq17",
    nome: "Informática",
    iconeMCI: "laptop",
    iconeIon: null,
    corIcone: "#2196F3",
    turma: "AX",
    percentual: 94.6,
  },
  {
    id: "freq18",
    nome: "Música",
    iconeMCI: "music",
    iconeIon: null,
    corIcone: "#FF4081",
    turma: "AX",
    percentual: 96.2,
  },
  {
    id: "freq19",
    nome: "Geografia Física",
    iconeMCI: "earth",
    iconeIon: null,
    corIcone: "#00BCD4",
    turma: "AX",
    percentual: 83.7,
  },
  {
    id: "freq20",
    nome: "Geografia Humana",
    iconeMCI: "city-variant",
    iconeIon: null,
    corIcone: "#009688",
    turma: "AX",
    percentual: 86.8,
  },
];

const MOCK_NOTIFICACOES = [
  {
    id: "not1",
    iconeMCI: "calculator-variant",
    corIcone: "#D32F2F",
    texto:
      '🧮 Nova fórmula de Matemática adicionada: "Teorema de Pitágoras em Geometria Espacial" - Aprenda a calcular distâncias em 3D!',
    tempo: "15 min. atrás",
  },
  {
    id: "not2",
    iconeMCI: "calculator-variant",
    corIcone: RED_ERROR,
    texto:
      'Viviane Duarte Bonfim criou um novo trabalho para o componente curricular: "Abex III: Projeto de Software II"',
    tempo: "55 min. atrás",
  },
  {
    id: "not3",
    iconeMCI: "book-open-page-variant-outline",
    corIcone: "#00796B",
    texto:
      'Nova atividade de Português disponível: "Análise Sintática Avançada"',
    tempo: "1 hora atrás",
  },
  {
    id: "not4",
    iconeMCI: "flask-outline",
    corIcone: "#388E3C",
    texto: "Lembrete: Feira de Ciências amanhã!",
    tempo: "3 horas atrás",
  },
  {
    id: "not5",
    iconeMCI: "calculator",
    corIcone: "#D32F2F",
    texto:
      '📊 Desafio Matemático da Semana: "Resolva 3 equações quadráticas e ganhe 50 moedas extras!" Prazo até sexta-feira.',
    tempo: "4 horas atrás",
  },
  {
    id: "not6",
    iconeMCI: "history",
    corIcone: "#F57C00",
    texto:
      '🏛️ História: Nova videoaula sobre "Revolução Industrial" já disponível com Prof. Bruno Costa',
    tempo: "6 horas atrás",
  },
  {
    id: "not7",
    iconeMCI: "earth",
    corIcone: "#0288D1",
    texto:
      '🌍 Geografia: Atividade prática "Mapeamento de Bacias Hidrográficas" foi atualizada',
    tempo: "8 horas atrás",
  },
  {
    id: "not8",
    iconeMCI: "calculator-variant-outline",
    corIcone: "#D32F2F",
    texto:
      "🔢 Matemática: Olimpíada Brasileira de Matemática - Inscrições abertas! Prepare-se com nossos exercícios especiais.",
    tempo: "12 horas atrás",
  },
  {
    id: "not9",
    iconeMCI: "translate",
    corIcone: "#7B1FA2",
    texto:
      "🇺🇸 English Club: Sessão de conversação esta quarta às 15h com Prof. Elena Rodriguez",
    tempo: "1 dia atrás",
  },
  {
    id: "not10",
    iconeMCI: "dna",
    corIcone: "#388E3C",
    texto:
      '🧬 Biologia: Experimento "Extração de DNA de frutas" disponível no laboratório virtual',
    tempo: "1 dia atrás",
  },
  {
    id: "not11",
    iconeMCI: "run-fast",
    corIcone: "#FF6F00",
    texto:
      "🏃‍♂️ Ed. Física: Jogos Internos começam na próxima semana! Inscreva-se em sua modalidade favorita",
    tempo: "2 dias atrás",
  },
  {
    id: "not12",
    iconeMCI: "chart-line",
    corIcone: "#D32F2F",
    texto:
      '📈 Matemática Aplicada: Aprenda "Estatística e Probabilidade" com exemplos do mundo real!',
    tempo: "2 dias atrás",
  },
  {
    id: "not13",
    iconeMCI: "music-note",
    corIcone: "#E91E63",
    texto:
      "🎵 Artes: Ensaio do Coral Escolar toda quinta às 16h - Venha cantar conosco!",
    tempo: "3 dias atrás",
  },
  {
    id: "not14",
    iconeMCI: "laptop",
    corIcone: "#455A64",
    texto:
      '💻 Informática: Workshop "Python para Iniciantes" será ministrado pelo Prof. Lucas Martins',
    tempo: "3 dias atrás",
  },
  {
    id: "not15",
    iconeMCI: "lightbulb-on",
    corIcone: "#FF9800",
    texto:
      '💡 Filosofia: Café Filosófico desta sexta: "Ética na Era Digital" - Debate aberto a todos',
    tempo: "4 dias atrás",
  },
];

// --- Contexto Global ---
const GlobalStateContext = createContext(undefined);
const GlobalStateProvider = ({ children, onLogout }) => {
  const [saldoMoedas, setSaldoMoedas] = useState(950);
  const [pontosBonus, setPontosBonus] = useState(0);
  const [carrinhoLoja, setCarrinhoLoja] = useState([]);
  const [atividadesCompletas, setAtividadesCompletas] = useState([]);
  const [resumosLidos, setResumosLidos] = useState([]);
  const adicionarMoedas = (quantidade) => {
    setSaldoMoedas((prev) => prev + quantidade);
    Alert.alert("Parabéns!", `Você ganhou ${quantidade} moedas!`);
  };
  const gastarMoedas = (quantidade) => {
    setSaldoMoedas((prev) => prev - quantidade);
  };
  const adicionarPontosBonus = (quantidade) => {
    setPontosBonus((prev) => prev + quantidade);
  };
  const marcarAtividadeCompleta = (atividadeId, recompensa) => {
    if (!atividadesCompletas.includes(atividadeId)) {
      setAtividadesCompletas((prev) => [...prev, atividadeId]);
      adicionarMoedas(recompensa);
    }
  };
  const marcarResumoLido = (resumoId, recompensa = 5) => {
    if (!resumosLidos.includes(resumoId)) {
      setResumosLidos([...resumosLidos, resumoId]);
      adicionarMoedas(recompensa);
    } else {
      Alert.alert("Já Lido", "Você já marcou este resumo como lido.");
    }
  };
  const adicionarAoCarrinhoLoja = (item) =>
    setCarrinhoLoja((prev) =>
      prev.find((p) => p.id === item.id) ? prev : [...prev, item]
    );
  const removerDoCarrinhoLoja = (itemId) =>
    setCarrinhoLoja((prev) => prev.filter((p) => p.id !== itemId));
  const limparCarrinhoLoja = () => setCarrinhoLoja([]);
  const calcularTotalCarrinhoLoja = () =>
    carrinhoLoja.reduce((total, item) => total + item.precoMoedas, 0);
  return (
    <GlobalStateContext.Provider
      value={{
        saldoMoedas,
        adicionarMoedas,
        gastarMoedas,
        pontosBonus,
        adicionarPontosBonus,
        atividadesCompletas,
        marcarAtividadeCompleta,
        resumosLidos,
        marcarResumoLido,
        carrinhoLoja,
        adicionarAoCarrinhoLoja,
        removerDoCarrinhoLoja,
        limparCarrinhoLoja,
        calcularTotalCarrinhoLoja,
        onLogout,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context)
    throw new Error(
      "useGlobalState deve ser usado dentro de um GlobalStateProvider"
    );
  return context;
};

// --- Componente de Cabeçalho Padrão ---
const AppHeader = ({ navigation, route, options }) => {
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : route.name;
  const isDrawerAvailable = !!navigation.openDrawer;
  let showBackButton = false;
  if (navigation.canGoBack()) {
    const parentNavigator = navigation.getParent();
    if (parentNavigator && parentNavigator.getState().index > 0) {
      showBackButton = true;
    } else if (!parentNavigator && navigation.getState().index > 0) {
      showBackButton = true;
    } else if (
      route.name !== "Início" &&
      route.name !== "PrincipalTabs" &&
      route.name !== "LojaRoot" &&
      route.name !== "DisciplinasListDrawer" &&
      route.name !== "ProfessoresListDrawer" &&
      route.name !== "VideosListDrawer" &&
      route.name !== "PesquisarTab" &&
      route.name !== "PerfilTabDrawer" &&
      route.name !== "NotificacoesListDrawer"
    ) {
      showBackButton = true;
    }
  }
  const showMenuButton = isDrawerAvailable && !showBackButton;
  return (
    <SafeAreaView style={styles.headerSafeArea}>
      <StatusBar barStyle="light-content" backgroundColor={PRIMARY_COLOR} />
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          {showMenuButton ? (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={styles.headerIconButton}
            >
              <Ionicons name="menu" size={28} color={WHITE_COLOR} />
            </TouchableOpacity>
          ) : showBackButton ? (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.headerIconButton}
            >
              <Ionicons name="arrow-back" size={24} color={WHITE_COLOR} />
            </TouchableOpacity>
          ) : (
            <View style={styles.headerIconButton} />
          )}
        </View>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.headerRight}>
          <TouchableOpacity
            onPress={() => navigation.navigate("NotificacoesDrawer")}
            style={styles.headerIconButton}
          >
            <Ionicons
              name="notifications-outline"
              size={24}
              color={WHITE_COLOR}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

// --- Conteúdo Personalizado do Drawer ---
const CustomDrawerContent = (props) => {
  const [avatarError, setAvatarError] = useState(false);
  const { onLogout } = useGlobalState();

  const handleAvatarError = () => {
    setAvatarError(true);
  };

  const handleLogout = () => {
    Alert.alert(
      "Sair da conta",
      "Tem certeza que deseja sair?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sair",
          style: "destructive",
          onPress: () => {
            if (onLogout) {
              onLogout();
            } else {
              Alert.alert("Erro", "Não foi possível sair da conta.");
            }
          }
        }
      ]
    );
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ paddingTop: 0 }}
    >
      <View style={styles.drawerHeader}>
        <View style={styles.drawerAvatarContainer}>
          {!avatarError ? (
            <Image
              source={{ uri: FOTO_ALUNO_EXEMPLO }}
              style={styles.drawerAvatar}
              onError={handleAvatarError}
            />
          ) : (
            // Fallback com ícone caso a imagem não carregue
            <Icon
              name="user-circle"
              size={60}
              color={WHITE_COLOR}
              style={styles.drawerAvatarFallback}
            />
          )}
        </View>
        <Text style={styles.drawerHeaderText}>{NOME_ALUNO_EXEMPLO}</Text>
        <Text style={styles.drawerSubHeaderText}>
          Matrícula: {MATRICULA_EXEMPLO}
        </Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Sair"
        icon={({ color, size }) => (
          <Ionicons name="log-out-outline" color={color} size={size} />
        )}
        onPress={() => handleLogout()}
        labelStyle={styles.drawerItemLabel}
        style={styles.drawerItem}
      />
    </DrawerContentScrollView>
  );
};

// --- Telas ---
const HomeScreen = ({ navigation }) => {
  const renderDisciplinaItem = ({ item }) => (
    <TouchableOpacity
      style={styles.disciplinaCard}
      onPress={() => {
        if (item.id === "outros") {
          // Navegar para a tela de todas as disciplinas
          navigation.navigate("TodasDisciplinas");
        } else {
          navigation.navigate("DisciplinasDrawer", {
            screen: "DetalhesMateria",
            params: {
              materiaId: item.id,
              materiaNome: item.nome,
              corIcone: item.cor,
            },
          });
        }
      }}
    >
      {" "}
      <View
        style={[styles.disciplinaIconContainer, { backgroundColor: item.cor }]}
      >
        {" "}
        <item.iconLib
          name={item.iconeIon || item.iconeMCI}
          size={width * 0.11}
          color={WHITE_COLOR}
        />{" "}
      </View>{" "}
      <Text style={styles.disciplinaNome}>{item.nome}</Text>{" "}
    </TouchableOpacity>
  );

  const renderProfessorItem = ({ item }) => {
    // Extrair a primeira letra do primeiro nome
    const primeiraLetra = item.nome.split(" ")[0].charAt(0).toUpperCase();

    return (
      <TouchableOpacity
        style={styles.professorCard}
        onPress={() =>
          navigation.navigate("ProfessoresDrawer", {
            screen: "DetalhesProfessor",
            params: { professorId: item.id },
          })
        }
      >
        <View style={styles.professorImageContainer}>
          <Image
            source={{ uri: item.imagemUrl }}
            style={styles.professorImagem}
          />
          <View style={styles.professorLetraIcon}>
            <Text style={styles.professorLetraText}>{primeiraLetra}</Text>
          </View>
          <View style={styles.professorBadge}>
            <Ionicons name="school" size={12} color={WHITE_COLOR} />
          </View>
        </View>
        <View style={styles.professorInfo}>
          <Text style={styles.professorNome} numberOfLines={1}>
            {item.nome}
          </Text>
          <Text style={styles.professorDisciplina} numberOfLines={1}>
            {item.disciplina}
          </Text>
          <View style={styles.professorRatingContainer}>
            <Ionicons name="star" size={12} color="#FFD700" />
            <Text style={styles.professorRating}>{item.rating || "4.8"}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderVideoaulaItem = ({ item }) => (
    <TouchableOpacity
      style={styles.videoaulaCard}
      onPress={() => navigation.navigate("VideosDrawer")}
    >
      <Image
        source={{ uri: item.imagemUrl }}
        style={styles.videoaulaThumbnail}
      />
      <View style={styles.videoaulaPlayIconContainer}>
        <Ionicons
          name="play-circle"
          size={40}
          color={WHITE_COLOR_TRANSLUCENT}
        />
      </View>
      <Text style={styles.videoaulaTitulo} numberOfLines={1}>
        {item.titulo}
      </Text>
      <Text style={styles.videoaulaProfessor}>{item.professor}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={styles.homeScreenContainer}
      contentContainerStyle={styles.homeScrollContent}
      showsVerticalScrollIndicator={true}
      bounces={true}
      scrollEventThrottle={16}
    >
      <View style={styles.homeHeader}>
        <View>
          <Text style={styles.homeSaudacao}>Seja bem-vindo</Text>
          <Text style={styles.homeNomeAluno}>{NOME_ALUNO_EXEMPLO}!</Text>
        </View>
        <TouchableOpacity
          style={styles.homeAvatarContainer}
          onPress={() => navigation.navigate("PerfilDrawer")}
        >
          <Image
            source={{ uri: FOTO_ALUNO_EXEMPLO }}
            style={styles.homeAvatar}
            onError={() => {
              // Fallback será tratado pelo estilo
            }}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.sectionTitle}>Disciplinas</Text>
      <FlatList
        data={DISCIPLINAS_MOCK}
        renderItem={renderDisciplinaItem}
        keyExtractor={(item) => item.id}
        numColumns={4}
        columnWrapperStyle={{
          justifyContent: "space-around",
          marginBottom: 15,
        }}
        style={{ paddingHorizontal: 5 }}
      />
      <View style={styles.professoresSectionHeader}>
        <View style={styles.professoresSectionTitleContainer}>
          <Ionicons name="people" size={24} color={PRIMARY_COLOR} />
          <Text style={styles.professoresSectionTitle}>Nossos Professores</Text>
        </View>
        <TouchableOpacity
          style={styles.professoresVerTodosButton}
          onPress={() => navigation.navigate("ProfessoresDrawer")}
        >
          <Text style={styles.professoresVerTodosText}>Ver todos</Text>
          <Ionicons name="chevron-forward" size={16} color={PRIMARY_COLOR} />
        </TouchableOpacity>
      </View>
      <View style={styles.professoresContainer}>
        <FlatList
          data={PROFESSORES_MOCK}
          renderItem={renderProfessorItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.professoresListContent}
        />
      </View>
      <Text style={styles.sectionTitle}>Videoaula</Text>
      <FlatList
        data={VIDEOAULAS_MOCK}
        renderItem={renderVideoaulaItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 10 }}
      />
    </ScrollView>
  );
};
const DisciplinasScreen = ({ navigation }) => {
  const renderMateria = ({ item }) => (
    <TouchableOpacity
      style={styles.materiaItemButton}
      onPress={() =>
        navigation.navigate("DetalhesMateria", {
          materiaId: item.id,
          materiaNome: item.nome,
          corIcone: item.cor,
        })
      }
    >
      <View
        style={[
          styles.materiaItemIconContainer,
          { backgroundColor: item.cor || ACCENT_COLOR },
        ]}
      >
        <item.iconLib
          name={item.iconeIon || item.iconeMCI}
          size={22}
          color={WHITE_COLOR}
        />
      </View>
      <Text style={styles.materiaItemText}>{item.nome}</Text>
      <View style={styles.materiaItemActions}>
        <TouchableOpacity
          style={styles.materiaInfoButton}
          onPress={() =>
            navigation.navigate("DesempenhoMateria", {
              materiaId: item.id,
            })
          }
        >
          <Ionicons
            name="information-circle-outline"
            size={24}
            color={PRIMARY_COLOR}
          />
        </TouchableOpacity>
        <Ionicons name="chevron-forward-outline" size={22} color="#CCC" />
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.screenContainerPadded}>
      <FlatList
        data={DISCIPLINAS_MOCK}
        renderItem={renderMateria}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={true}
        bounces={true}
        contentContainerStyle={styles.disciplinasScrollContent}
      />
    </View>
  );
};
const ResumosScreen = ({ route }) => {
  const { materiaId } = route.params;
  const { resumosLidos, marcarResumoLido } = useGlobalState();

  // Sempre usar o materiaId direto dos params sem estado local
  const materia = CONTEUDO_MATERIAS_MOCK[materiaId] || { resumos: [] };

  // Log para debug
  useEffect(() => {
    console.log("ResumosScreen: Matéria mudou para:", materiaId);
  }, [materiaId]);

  return (
    <ScrollView
      style={styles.conteudoDetalheContainer}
      contentContainerStyle={styles.resumosScrollContent}
      showsVerticalScrollIndicator={true}
      bounces={true}
      scrollEventThrottle={16}
      nestedScrollEnabled={true}
    >
      {materia.resumos.length === 0 && (
        <Text style={styles.emptyStateText}>Nenhum resumo disponível.</Text>
      )}

      {materia.resumos.map((resumo) => (
        <View key={resumo.id} style={styles.resumoCard}>
          <Text style={styles.resumoTitulo}>{resumo.titulo}</Text>
          <Text style={styles.resumoConteudo}>{resumo.conteudo}</Text>

          <TouchableOpacity
            style={[
              styles.marcarLidoButton,
              resumosLidos.includes(resumo.id) &&
                styles.marcarLidoButtonDisabled,
            ]}
            onPress={() => marcarResumoLido(resumo.id, 5)}
            disabled={resumosLidos.includes(resumo.id)}
          >
            <Text style={styles.marcarLidoButtonText}>
              {resumosLidos.includes(resumo.id)
                ? "Lido ✓"
                : "Marcar como Lido (+5 Moedas)"}
            </Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Espaço extra para scroll completo */}
      <View style={styles.resumosFooterSpace} />
    </ScrollView>
  );
};
const AtividadesScreen = ({ route }) => {
  const { materiaId } = route.params;
  const { atividadesCompletas, marcarAtividadeCompleta } = useGlobalState();
  const [respostas, setRespostas] = useState({});

  // Sempre usar o materiaId direto dos params
  const materia = CONTEUDO_MATERIAS_MOCK[materiaId] || { atividades: [] };

  // Limpar respostas quando mudar de matéria e forçar re-render
  useEffect(() => {
    setRespostas({});
    console.log("AtividadesScreen: Matéria mudou para:", materiaId);
  }, [materiaId]);

  // Também limpar ao focar na tela
  useFocusEffect(
    useCallback(() => {
      setRespostas({});
      console.log("AtividadesScreen: Foco na tela, matéria:", materiaId);
    }, [materiaId])
  );

  const handleSelecionarOpcao = (atividadeId, opcao) =>
    setRespostas((prev) => ({ ...prev, [atividadeId]: opcao }));

  const handleVerificarResposta = (atividade) => {
    if (atividadesCompletas.includes(atividade.id)) {
      Alert.alert("✅ Já Respondida", "Você já completou esta atividade!", [
        { text: "OK", style: "default" },
      ]);
      return;
    }

    const respostaSelecionada = respostas[atividade.id];
    if (!respostaSelecionada) {
      Alert.alert(
        "⚠️ Atenção",
        "Por favor, selecione uma opção antes de continuar.",
        [{ text: "OK", style: "default" }]
      );
      return;
    }

    if (respostaSelecionada === atividade.respostaCorreta) {
      Alert.alert(
        "🎉 Parabéns!",
        `Resposta correta!\n\nVocê ganhou ${atividade.recompensa} moedas! 💰`,
        [{ text: "Continuar", style: "default" }]
      );
      marcarAtividadeCompleta(atividade.id, atividade.recompensa);
    } else {
      Alert.alert(
        "❌ Resposta Incorreta",
        `Ops! A resposta correta é: "${atividade.respostaCorreta}"\n\nTente novamente para aprender! 📚`,
        [{ text: "Tentar Novamente", style: "default" }]
      );
    }
  };

  const renderAtividade = ({ item: atividade }) => (
    <View style={styles.atividadeCard}>
      <Text style={styles.atividadePergunta}>{atividade.pergunta}</Text>

      {atividade.opcoes.map((opcao, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.opcaoButton,
            respostas[atividade.id] === opcao && styles.opcaoButtonSelected,
          ]}
          onPress={() =>
            !atividadesCompletas.includes(atividade.id) &&
            handleSelecionarOpcao(atividade.id, opcao)
          }
          disabled={atividadesCompletas.includes(atividade.id)}
        >
          <Text
            style={[
              styles.opcaoText,
              respostas[atividade.id] === opcao && styles.opcaoTextSelected,
            ]}
          >
            {opcao}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[
          styles.verificarButton,
          atividadesCompletas.includes(atividade.id) &&
            styles.verificarButtonDisabled,
        ]}
        onPress={() => handleVerificarResposta(atividade)}
        disabled={atividadesCompletas.includes(atividade.id)}
      >
        <Text style={styles.verificarButtonText}>
          {atividadesCompletas.includes(atividade.id)
            ? `Correta! +${atividade.recompensa} Moedas`
            : "Verificar Resposta"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  if (materia.atividades.length === 0) {
    return (
      <View style={styles.emptyStateContainer}>
        <Ionicons name="clipboard-outline" size={80} color={TEXT_COLOR_MUTED} />
        <Text style={styles.emptyStateText}>Nenhuma atividade disponível.</Text>
        <Text style={styles.emptyStateSubText}>
          Novas atividades serão adicionadas em breve!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={materia.atividades}
      renderItem={renderAtividade}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={true}
      bounces={true}
      scrollEventThrottle={16}
      contentContainerStyle={styles.atividadesScrollContent}
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      style={styles.conteudoDetalheContainer}
      nestedScrollEnabled={true}
    />
  );
};
const TopTab = createMaterialTopTabNavigator();
const DetalhesMateriaScreen = ({ route }) => {
  const { materiaId, materiaNome, corIcone } = route.params;

  // Criar componentes que sempre recebem o materiaId atual
  const ResumosScreenWrapper = (props) => (
    <ResumosScreen {...props} route={{ params: { materiaId } }} />
  );

  const AtividadesScreenWrapper = (props) => (
    <AtividadesScreen {...props} route={{ params: { materiaId } }} />
  );

  return (
    <TopTab.Navigator
      key={materiaId} // Força remount quando materiaId muda
      screenOptions={{
        tabBarActiveTintColor: corIcone || PRIMARY_COLOR,
        tabBarInactiveTintColor: TEXT_COLOR_MUTED,
        tabBarIndicatorStyle: {
          backgroundColor: corIcone || PRIMARY_COLOR,
          height: 3,
        },
        tabBarLabelStyle: { fontSize: 13, fontWeight: "bold" },
        tabBarStyle: {
          backgroundColor: WHITE_COLOR,
          elevation: 1,
          shadowOpacity: 0.1,
        },
      }}
    >
      <TopTab.Screen name="Resumos" component={ResumosScreenWrapper} />
      <TopTab.Screen name="Atividades" component={AtividadesScreenWrapper} />
    </TopTab.Navigator>
  );
};

const LojaPontosScreen = ({ navigation }) => {
  const {
    carrinhoLoja,
    adicionarAoCarrinhoLoja,
    removerDoCarrinhoLoja,
    calcularTotalCarrinhoLoja,
  } = useGlobalState();
  const toggleItemCarrinho = (item) => {
    if (carrinhoLoja.find((p) => p.id === item.id))
      removerDoCarrinhoLoja(item.id);
    else adicionarAoCarrinhoLoja(item);
  };
  const totalCarrinho = calcularTotalCarrinhoLoja();
  const handleCheckout = () => {
    if (carrinhoLoja.length === 0) {
      Alert.alert("Carrinho vazio!");
      return;
    }
    navigation.navigate("LojaPagamento");
  };
  const renderLojaItem = ({ item }) => (
    <View style={styles.lojaPontoItemCard}>
      <View
        style={[
          styles.lojaPontoIconContainer,
          { backgroundColor: item.corIcone },
        ]}
      >
        {item.iconeMCI ? (
          <MaterialCommunityIcons
            name={item.iconeMCI}
            size={28}
            color={WHITE_COLOR}
          />
        ) : (
          <Ionicons name={item.iconeIon} size={28} color={WHITE_COLOR} />
        )}
      </View>
      <View style={styles.lojaPontoInfo}>
        <Text style={styles.lojaPontoNome}>{item.nome}</Text>
        <Text style={styles.lojaPontoDetalhe}>
          Quantidade de pontos: {item.pontos}
        </Text>
      </View>
      <View style={styles.lojaPontoAcao}>
        <Text style={styles.lojaPontoPreco}>${item.precoMoedas}</Text>
        <TouchableOpacity
          onPress={() => toggleItemCarrinho(item)}
          style={styles.lojaPontoAddButton}
        >
          <Ionicons
            name={
              carrinhoLoja.find((i) => i.id === item.id)
                ? "checkmark-circle"
                : "add-circle"
            }
            size={30}
            color={
              carrinhoLoja.find((i) => i.id === item.id)
                ? GREEN_SUCCESS
                : PRIMARY_COLOR
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View style={{ flex: 1, backgroundColor: LIGHT_BG_COLOR }}>
      <FlatList
        data={MOCK_LOJA_PONTOS}
        renderItem={renderLojaItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={true}
        bounces={true}
        scrollEventThrottle={16}
        contentContainerStyle={{
          padding: 10,
          paddingBottom:
            carrinhoLoja.length > 0 ? (Platform.OS === "ios" ? 140 : 120) : 30,
        }}
      />
      <ConditionalDisplay condition={carrinhoLoja.length > 0}>
        <View style={styles.lojaCarrinhoResumoContainer}>
          <Text style={styles.lojaCarrinhoResumoTitulo}>Carrinho</Text>
          {carrinhoLoja.map((item) => (
            <View key={item.id} style={styles.lojaCarrinhoItem}>
              <Text style={styles.lojaCarrinhoItemTexto}>{item.nome}</Text>
              <Text style={styles.lojaCarrinhoItemTexto}>
                ${item.precoMoedas}
              </Text>
            </View>
          ))}
          <View style={styles.lojaCarrinhoTotalLinha}>
            <Text style={styles.lojaCarrinhoResumoTextoBold}>Total:</Text>
            <Text style={styles.lojaCarrinhoResumoTextoBold}>
              ${totalCarrinho} Moedas
            </Text>
          </View>
          <TouchableOpacity
            style={styles.lojaCarrinhoResumoBotao}
            onPress={handleCheckout}
          >
            <Text style={styles.lojaCarrinhoResumoBotaoTexto}>
              Realizar Transferência
            </Text>
            <Ionicons
              name="arrow-forward-outline"
              size={18}
              color={WHITE_COLOR}
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        </View>
      </ConditionalDisplay>
    </View>
  );
};
const LojaPagamentoScreen = ({ navigation }) => {
  const {
    carrinhoLoja,
    saldoMoedas,
    gastarMoedas,
    adicionarPontosBonus,
    limparCarrinhoLoja,
    calcularTotalCarrinhoLoja,
  } = useGlobalState();
  const totalCompraMoedas = calcularTotalCarrinhoLoja();
  const totalPontosAdquiridos = carrinhoLoja.reduce(
    (total, item) => total + item.pontos,
    0
  );
  const handleComprar = () => {
    if (saldoMoedas < totalCompraMoedas) {
      Alert.alert(
        "Moedas Insuficientes",
        `Você precisa de ${totalCompraMoedas} moedas.`
      );
      return;
    }
    gastarMoedas(totalCompraMoedas);
    adicionarPontosBonus(totalPontosAdquiridos);
    navigation.replace("LojaRecibo", {
      itensComprados: carrinhoLoja,
      totalPago: totalCompraMoedas,
      pontosGanhos: totalPontosAdquiridos,
    });
    limparCarrinhoLoja();
  };
  return (
    <ScrollView
      style={styles.lojaPagamentoScroll}
      contentContainerStyle={{ paddingBottom: 30 }}
      showsVerticalScrollIndicator={true}
      bounces={true}
      scrollEventThrottle={16}
    >
      <View style={styles.lojaPagamentoCard}>
        <Text style={styles.lojaPagamentoCardTitle}>Itens da compra</Text>
        {carrinhoLoja.map((item) => (
          <View key={item.id} style={styles.lojaPagamentoItemLinha}>
            <Text style={styles.lojaPagamentoItemTexto}>
              {item.nome} (+{item.pontos} pts)
            </Text>
            <Text style={styles.lojaPagamentoItemPreco}>
              ${item.precoMoedas}
            </Text>
          </View>
        ))}
        <View style={styles.lojaPagamentoSeparador} />
        <View style={styles.lojaPagamentoItemLinha}>
          <Text style={styles.lojaPagamentoTotalTexto}>Total de Matérias:</Text>
          <Text style={styles.lojaPagamentoTotalValor}>
            {carrinhoLoja.length}
          </Text>
        </View>
        <View style={styles.lojaPagamentoItemLinha}>
          <Text style={styles.lojaPagamentoTotalTextoBold}>Total:</Text>
          <Text style={styles.lojaPagamentoTotalValorBold}>
            ${totalCompraMoedas} Moedas
          </Text>
        </View>
      </View>
      <Ionicons
        name="cash-outline"
        size={60}
        color={PRIMARY_COLOR}
        style={styles.lojaPagamentoIconeCentral}
      />
      <View style={styles.lojaPagamentoInfoCartao}>
        <Text style={styles.lojaPagamentoInfoCartaoTitulo}>
          Informações do cartão
        </Text>
        <View style={styles.lojaPagamentoInfoCartaoRow}>
          <View>
            <Text style={styles.lojaPagamentoInfoCartaoSaldo}>
              ${saldoMoedas}
            </Text>
            <Text style={styles.lojaPagamentoInfoCartaoLabel}>Moedas</Text>
          </View>
          <MaterialCommunityIcons
            name="school-outline"
            size={40}
            color={WHITE_COLOR}
          />
        </View>
        <View style={styles.lojaPagamentoInfoCartaoRow}>
          <View>
            <Text style={styles.lojaPagamentoInfoCartaoLabelPequeno}>
              Matrícula
            </Text>
            <Text style={styles.lojaPagamentoInfoCartaoValorPequeno}>
              {MATRICULA_EXEMPLO}
            </Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.lojaPagamentoInfoCartaoLabelPequeno}>
              Aluno (a)
            </Text>
            <Text style={styles.lojaPagamentoInfoCartaoValorPequeno}>
              {NOME_ALUNO_EXEMPLO}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.lojaPagamentoBotaoComprar,
          saldoMoedas < totalCompraMoedas &&
            styles.lojaPagamentoBotaoComprarDisabled,
        ]}
        onPress={handleComprar}
        disabled={saldoMoedas < totalCompraMoedas}
      >
        <Text style={styles.lojaPagamentoBotaoComprarTexto}>
          {saldoMoedas < totalCompraMoedas ? "Moedas Insuficientes" : "Comprar"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const LojaReciboScreen = ({ route, navigation }) => {
  const { saldoMoedas } = useGlobalState();
  const { itensComprados, totalPago, pontosGanhos } = route.params;
  const handleFinalizar = () => {
    navigation.popToTop();
    navigation.navigate("LojaRoot");
  };
  return (
    <ScrollView
      style={styles.lojaPagamentoScroll}
      contentContainerStyle={{ alignItems: "center", paddingBottom: 30 }}
      showsVerticalScrollIndicator={true}
      bounces={true}
      scrollEventThrottle={16}
      onStartShouldSetResponder={() => true}
      onResponderRelease={handleFinalizar}
    >
      <View style={styles.lojaReciboHeader}>
        <Text style={styles.lojaReciboHeaderText}>Compra realizada!</Text>
        <Text style={styles.lojaReciboSubHeaderText}>Esse é o seu recibo!</Text>
      </View>
      <View style={[styles.lojaPagamentoCard, { marginTop: 20 }]}>
        <Text style={styles.lojaPagamentoCardTitle}>Itens da compra</Text>
        {itensComprados.map((item) => (
          <View key={item.id} style={styles.lojaPagamentoItemLinha}>
            <Text style={styles.lojaPagamentoItemTexto}>
              {item.nome} (+{item.pontos} pts)
            </Text>
            <Text style={styles.lojaPagamentoItemPreco}>
              ${item.precoMoedas}
            </Text>
          </View>
        ))}
        <View style={styles.lojaPagamentoSeparador} />
        <View style={styles.lojaPagamentoItemLinha}>
          <Text style={styles.lojaPagamentoTotalTexto}>Total de Matérias:</Text>
          <Text style={styles.lojaPagamentoTotalValor}>
            {itensComprados.length}
          </Text>
        </View>
        <View style={styles.lojaPagamentoItemLinha}>
          <Text style={styles.lojaPagamentoTotalTextoBold}>Total Pago:</Text>
          <Text style={styles.lojaPagamentoTotalValorBold}>
            ${totalPago} Moedas
          </Text>
        </View>
      </View>
      <Ionicons
        name="cash-outline"
        size={60}
        color={PRIMARY_COLOR}
        style={styles.lojaPagamentoIconeCentral}
      />
      <View style={[styles.lojaPagamentoInfoCartao, { marginBottom: 20 }]}>
        <Text style={styles.lojaPagamentoInfoCartaoTitulo}>
          Informações do cartão
        </Text>
        <View style={styles.lojaPagamentoInfoCartaoRow}>
          <View>
            <Text style={styles.lojaPagamentoInfoCartaoSaldo}>
              ${saldoMoedas}
            </Text>
            <Text style={styles.lojaPagamentoInfoCartaoLabel}>
              Moedas (Saldo Restante)
            </Text>
          </View>
          <MaterialCommunityIcons
            name="school-outline"
            size={40}
            color={WHITE_COLOR}
          />
        </View>
        <View style={styles.lojaPagamentoInfoCartaoRow}>
          <View>
            <Text style={styles.lojaPagamentoInfoCartaoLabelPequeno}>
              Matrícula
            </Text>
            <Text style={styles.lojaPagamentoInfoCartaoValorPequeno}>
              {MATRICULA_EXEMPLO}
            </Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.lojaPagamentoInfoCartaoLabelPequeno}>
              Aluno (a)
            </Text>
            <Text style={styles.lojaPagamentoInfoCartaoValorPequeno}>
              {NOME_ALUNO_EXEMPLO}
            </Text>
          </View>
        </View>
      </View>
      <Text
        style={{
          color: TEXT_COLOR_MUTED,
          marginVertical: 20,
          fontWeight: "bold",
        }}
      >
        Toque na tela para continuar.
      </Text>
    </ScrollView>
  );
};

const ResgatarTarefasScreen = () => {
  const { saldoMoedas, atividadesCompletas, marcarAtividadeCompleta } =
    useGlobalState();
  const renderTarefaItem = (tarefa, tipo) => (
    <View key={tarefa.id} style={styles.resgatarTarefaCard}>
      <View style={styles.resgatarTarefaIconContainer}>
        <View
          style={[
            styles.resgatarTarefaIconBg,
            { backgroundColor: tarefa.corIcone },
          ]}
        >
          {tarefa.iconeMCI ? (
            <MaterialCommunityIcons
              name={tarefa.iconeMCI}
              size={24}
              color={WHITE_COLOR}
            />
          ) : (
            <Ionicons name={tarefa.iconeIon} size={24} color={WHITE_COLOR} />
          )}
        </View>
      </View>
      <View style={styles.resgatarTarefaInfo}>
        <Text style={styles.resgatarTarefaMateria}>{tarefa.materia}</Text>
        <Text style={styles.resgatarTarefaDescricao}>{tarefa.descricao}</Text>
      </View>
      <View style={styles.resgatarTarefaRecompensaContainer}>
        <Text style={styles.resgatarTarefaRecompensa}>
          {tarefa.recompensa} moedas
        </Text>
      </View>
      <TouchableOpacity
        style={[
          styles.resgatarTarefaBotao,
          atividadesCompletas.includes(tarefa.id) &&
            styles.resgatarTarefaBotaoResgatado,
        ]}
        onPress={() => marcarAtividadeCompleta(tarefa.id, tarefa.recompensa)}
        disabled={atividadesCompletas.includes(tarefa.id)}
      >
        <Text style={styles.resgatarTarefaBotaoTexto}>
          {atividadesCompletas.includes(tarefa.id) ? "Resgatado!" : "Resgatar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <ScrollView
      style={styles.screenContainerPaddedPurpleBG}
      contentContainerStyle={{ paddingBottom: 30 }}
      showsVerticalScrollIndicator={true}
      bounces={true}
      scrollEventThrottle={16}
    >
      <Text style={styles.resgatarSaldo}>
        Saldo Atual: ${saldoMoedas} moedas
      </Text>
      <Text style={styles.sectionTitleAlt}>Semanais</Text>
      {MOCK_TAREFAS_RESGATE.semanais.map((tarefa) =>
        renderTarefaItem(tarefa, "semanal")
      )}
      <Text style={styles.sectionTitleAlt}>Diárias</Text>
      {MOCK_TAREFAS_RESGATE.diarias.map((tarefa) =>
        renderTarefaItem(tarefa, "diaria")
      )}
    </ScrollView>
  );
};
const NotasScreen = () => {
  const {
    nomeAluno,
    anoEscolar,
    serie,
    matricula,
    disciplinas,
    ausencias,
    faltas,
    ausenciasJustificadas,
  } = MOCK_NOTAS;
  const [tipoCardSelecionado, setTipoCardSelecionado] = useState(null);

  const renderCard = (item, tipo) => {
    let corCard = PRIMARY_COLOR;
    let iconCard = "calendar-outline";

    if (tipo === "faltas") {
      corCard = RED_ERROR;
      iconCard = "warning-outline";
    } else if (tipo === "ausenciasJustificadas") {
      corCard = GREEN_SUCCESS;
      iconCard = "checkmark-circle-outline";
    }

    return (
      <View
        key={item.id}
        style={[styles.notasInfoCard, { borderLeftColor: corCard }]}
      >
        <View style={styles.notasInfoCardHeader}>
          <View
            style={[styles.notasInfoCardIcon, { backgroundColor: corCard }]}
          >
            <Ionicons name={iconCard} size={20} color={WHITE_COLOR} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.notasInfoCardData}>{item.data}</Text>
            <Text style={styles.notasInfoCardDisciplina}>
              {item.disciplina}
            </Text>
          </View>
        </View>
        <Text style={styles.notasInfoCardMotivo}>{item.motivo}</Text>
        <Text style={styles.notasInfoCardPeriodo}>Período: {item.periodo}</Text>
        <Text style={styles.notasInfoCardProfessor}>
          Professor: {item.professor}
        </Text>
        {item.justificativa && (
          <Text style={styles.notasInfoCardJustificativa}>
            Justificativa: {item.justificativa}
          </Text>
        )}
        {item.observacao && (
          <Text style={styles.notasInfoCardObservacao}>
            Observação: {item.observacao}
          </Text>
        )}
        {item.documentoAnexado && (
          <Text style={styles.notasInfoCardDocumento}>
            📎 {item.documentoAnexado}
          </Text>
        )}
      </View>
    );
  };

  const renderCards = () => {
    if (!tipoCardSelecionado) return null;

    let dados = [];
    let titulo = "";

    switch (tipoCardSelecionado) {
      case "ausencias":
        dados = ausencias;
        titulo = "Ausências";
        break;
      case "faltas":
        dados = faltas;
        titulo = "Faltas";
        break;
      case "ausenciasJustificadas":
        dados = ausenciasJustificadas;
        titulo = "Ausências Justificadas";
        break;
    }

    return (
      <View style={styles.notasCardsContainer}>
        <View style={styles.notasCardsHeader}>
          <Text style={styles.notasCardsTitle}>{titulo}</Text>
          <TouchableOpacity
            style={styles.notasCardsCloseButton}
            onPress={() => setTipoCardSelecionado(null)}
          >
            <Ionicons name="close-circle" size={24} color={PRIMARY_COLOR} />
          </TouchableOpacity>
        </View>
        {dados.length > 0 ? (
          dados.map((item) => renderCard(item, tipoCardSelecionado))
        ) : (
          <View style={styles.notasCardsEmpty}>
            <Text style={styles.notasCardsEmptyText}>
              Nenhum registro encontrado para {titulo.toLowerCase()}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.screenContainerPaddedPurpleBG}
      contentContainerStyle={{ paddingBottom: 30 }}
      showsVerticalScrollIndicator={true}
      bounces={true}
      scrollEventThrottle={16}
    >
      <View style={styles.notasInfoContainer}>
        <View>
          <Text style={styles.notasInfoLabel}>
            Nome: <Text style={styles.notasInfoValor}>{nomeAluno}</Text>
          </Text>
          <Text style={styles.notasInfoLabel}>
            Série: <Text style={styles.notasInfoValor}>{serie}</Text>
          </Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.notasInfoLabel}>
            Ano escolar: <Text style={styles.notasInfoValor}>{anoEscolar}</Text>
          </Text>
          <Text style={styles.notasInfoLabel}>
            Matrícula: <Text style={styles.notasInfoValor}>{matricula}</Text>
          </Text>
        </View>
      </View>
      <View style={styles.notasTabelaContainer}>
        <View style={styles.notasTabelaHeaderRow}>
          <Text style={[styles.notasTabelaHeaderCell, { flex: 2 }]}>
            Disciplina
          </Text>
          <Text style={styles.notasTabelaHeaderCell}>A1</Text>
          <Text style={styles.notasTabelaHeaderCell}>A2</Text>
          <Text style={styles.notasTabelaHeaderCell}>A3</Text>
        </View>
        {disciplinas.map((d, index) => (
          <View key={index} style={styles.notasTabelaRow}>
            <Text
              style={[styles.notasTabelaCell, { flex: 2, fontWeight: "bold" }]}
            >
              {d.nome}
            </Text>
            <Text style={styles.notasTabelaCell}>{d.a1}</Text>
            <Text style={styles.notasTabelaCell}>{d.a2}</Text>
            <Text style={styles.notasTabelaCell}>{d.a3}</Text>
          </View>
        ))}
      </View>
      <View style={[styles.notasBottomContainer]}>
        <View style={[styles.notasBottomCard, styles.notasBottomCardInfo]}>
          <Text style={styles.notasBottomCardTitle}>Informações</Text>
          <TouchableOpacity
            style={styles.notasInfoButton}
            onPress={() => setTipoCardSelecionado("ausencias")}
          >
            <Text style={styles.notasInfoButtonText}>
              Ausências ({ausencias.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.notasInfoButton}
            onPress={() => setTipoCardSelecionado("faltas")}
          >
            <Text style={styles.notasInfoButtonText}>
              Faltas ({faltas.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.notasInfoButton}
            onPress={() => setTipoCardSelecionado("ausenciasJustificadas")}
          >
            <Text style={styles.notasInfoButtonText}>
              Ausências Justificadas ({ausenciasJustificadas.length})
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.notasBottomCard}>
          <Text style={styles.notasBottomCardTitle}>Comentários</Text>
          <TextInput
            style={styles.notasComentariosInput}
            placeholder="Escreva seus comentários aqui..."
            multiline
            numberOfLines={Platform.OS === "ios" ? 5 : 4}
            placeholderTextColor="#999"
          />
        </View>
      </View>
      {renderCards()}
    </ScrollView>
  );
};
const FrequenciaScreen = () => {
  return (
    <ScrollView
      style={styles.screenContainerPaddedPurpleBG}
      contentContainerStyle={{ paddingBottom: 30 }}
      showsVerticalScrollIndicator={true}
      bounces={true}
      scrollEventThrottle={16}
    >
      {MOCK_FREQUENCIA.map((item) => (
        <View key={item.id} style={styles.frequenciaCard}>
          <View
            style={[
              styles.lojaItemIconContainer,
              { backgroundColor: item.corIcone, marginRight: 15 },
            ]}
          >
            {item.iconeMCI ? (
              <MaterialCommunityIcons
                name={item.iconeMCI}
                size={24}
                color={WHITE_COLOR}
              />
            ) : (
              <Ionicons name={item.iconeIon} size={24} color={WHITE_COLOR} />
            )}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.frequenciaNome}>{item.nome}</Text>
            <Text style={styles.frequenciaTurma}>Turma: {item.turma}</Text>
          </View>
          <View
            style={[styles.frequenciaCirculo, { borderColor: item.corIcone }]}
          >
            <Text
              style={[styles.frequenciaPercentual, { color: item.corIcone }]}
            >
              {item.percentual.toFixed(1)}%
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const CartaoAlunoScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView
      style={styles.screenContainerPaddedPurpleBG}
      contentContainerStyle={{ paddingBottom: 30 }}
      showsVerticalScrollIndicator={true}
      bounces={true}
      scrollEventThrottle={16}
    >
      {/* Cartão Principal */}
      <View style={styles.cartaoAlunoCard}>
        {/* Header com Saldo */}
        <View style={styles.cartaoAlunoHeader}>
          <View style={styles.cartaoAlunoSaldoContainer}>
            <Text style={styles.cartaoAlunoSaldoSymbol}>$</Text>
            <Text style={styles.cartaoAlunoSaldo}>950</Text>
            <Text style={styles.cartaoAlunoMoedasLabel}>Moedas</Text>
          </View>
          <View style={styles.cartaoAlunoGraduationIcon}>
            <Ionicons name="school" size={32} color={WHITE_COLOR} />
          </View>
        </View>

        {/* Informações do Aluno */}
        <View style={styles.cartaoAlunoInfoSection}>
          <Text style={styles.cartaoAlunoMatriculaLabel}>Matrícula</Text>
          <Text style={styles.cartaoAlunoMatriculaValue}>
            {MOCK_PERFIL_USUARIO.matricula}
          </Text>
          <Text style={styles.cartaoAlunoNomeLabel}>Aluno (a)</Text>
          <Text style={styles.cartaoAlunoNomeValue}>
            {MOCK_PERFIL_USUARIO.nome}
          </Text>
        </View>
      </View>

      {/* Botões de Ação */}
      <View style={styles.cartaoAlunoBotoesContainer}>
        <TouchableOpacity
          style={styles.cartaoAlunoBotao}
          activeOpacity={0.7}
          onPress={() => {
            // Navega para a loja
            navigation.navigate("LojaDrawer");
          }}
        >
          <View style={styles.cartaoAlunoBotaoIcon}>
            <Ionicons name="bag" size={24} color={WHITE_COLOR} />
          </View>
          <Text style={styles.cartaoAlunoBotaoText}>Comprar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cartaoAlunoBotao}
          activeOpacity={0.7}
          onPress={() => {
            // Navega para resgatar
            navigation.navigate("ResgatarDrawer");
          }}
        >
          <View style={styles.cartaoAlunoBotaoIcon}>
            <Ionicons name="gift" size={24} color={WHITE_COLOR} />
          </View>
          <Text style={styles.cartaoAlunoBotaoText}>Resgatar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cartaoAlunoBotao}
          activeOpacity={0.7}
          onPress={() => {
            // Navega para notas
            navigation.navigate("NotasDrawer");
          }}
        >
          <View style={styles.cartaoAlunoBotaoIcon}>
            <Ionicons name="bar-chart" size={24} color={WHITE_COLOR} />
          </View>
          <Text style={styles.cartaoAlunoBotaoText}>Desempenho</Text>
        </TouchableOpacity>
      </View>

      {/* Lista por mais moedas */}
      <View style={styles.cartaoAlunoListContainer}>
        <Text style={styles.cartaoAlunoListTitle}>
          Lista por{" "}
          <Text style={styles.cartaoAlunoListTitleBold}>mais moedas</Text>
        </Text>

        {/* Disciplina - Matemática */}
        <View style={styles.cartaoAlunoDisciplinaItem}>
          <View
            style={[
              styles.cartaoAlunoDisciplinaIcon,
              { backgroundColor: "#D32F2F" },
            ]}
          >
            <MaterialCommunityIcons
              name="calculator"
              size={24}
              color={WHITE_COLOR}
            />
          </View>
          <View style={styles.cartaoAlunoDisciplinaInfo}>
            <Text style={styles.cartaoAlunoDisciplinaNome}>Matemática</Text>
            <Text style={styles.cartaoAlunoDisciplinaMoedas}>
              700/1000 moedas
            </Text>
            <View style={styles.cartaoAlunoProgressBar}>
              <View
                style={[
                  styles.cartaoAlunoProgressFill,
                  { width: "70%", backgroundColor: "#D32F2F" },
                ]}
              />
            </View>
          </View>
        </View>

        {/* Disciplina - Português */}
        <View style={styles.cartaoAlunoDisciplinaItem}>
          <View
            style={[
              styles.cartaoAlunoDisciplinaIcon,
              { backgroundColor: "#00ACC1" },
            ]}
          >
            <MaterialCommunityIcons
              name="book-open-variant"
              size={24}
              color={WHITE_COLOR}
            />
          </View>
          <View style={styles.cartaoAlunoDisciplinaInfo}>
            <Text style={styles.cartaoAlunoDisciplinaNome}>Português</Text>
            <Text style={styles.cartaoAlunoDisciplinaMoedas}>
              120/1000 moedas
            </Text>
            <View style={styles.cartaoAlunoProgressBar}>
              <View
                style={[
                  styles.cartaoAlunoProgressFill,
                  { width: "12%", backgroundColor: "#00ACC1" },
                ]}
              />
            </View>
          </View>
        </View>

        {/* Disciplina - Ed. Física */}
        <View style={styles.cartaoAlunoDisciplinaItem}>
          <View
            style={[
              styles.cartaoAlunoDisciplinaIcon,
              { backgroundColor: "#388E3C" },
            ]}
          >
            <MaterialCommunityIcons name="run" size={24} color={WHITE_COLOR} />
          </View>
          <View style={styles.cartaoAlunoDisciplinaInfo}>
            <Text style={styles.cartaoAlunoDisciplinaNome}>Ed. Física</Text>
            <Text style={styles.cartaoAlunoDisciplinaMoedas}>
              500/1000 moedas
            </Text>
            <View style={styles.cartaoAlunoProgressBar}>
              <View
                style={[
                  styles.cartaoAlunoProgressFill,
                  { width: "50%", backgroundColor: "#388E3C" },
                ]}
              />
            </View>
          </View>
        </View>

        {/* Disciplina - Ciências */}
        <View style={styles.cartaoAlunoDisciplinaItem}>
          <View
            style={[
              styles.cartaoAlunoDisciplinaIcon,
              { backgroundColor: "#7B1FA2" },
            ]}
          >
            <MaterialCommunityIcons
              name="flask"
              size={24}
              color={WHITE_COLOR}
            />
          </View>
          <View style={styles.cartaoAlunoDisciplinaInfo}>
            <Text style={styles.cartaoAlunoDisciplinaNome}>Ciências</Text>
            <Text style={styles.cartaoAlunoDisciplinaMoedas}>
              450/1000 moedas
            </Text>
            <View style={styles.cartaoAlunoProgressBar}>
              <View
                style={[
                  styles.cartaoAlunoProgressFill,
                  { width: "45%", backgroundColor: "#7B1FA2" },
                ]}
              />
            </View>
          </View>
        </View>

        {/* Disciplina - História */}
        <View style={styles.cartaoAlunoDisciplinaItem}>
          <View
            style={[
              styles.cartaoAlunoDisciplinaIcon,
              { backgroundColor: "#8D6E63" },
            ]}
          >
            <MaterialCommunityIcons
              name="castle"
              size={24}
              color={WHITE_COLOR}
            />
          </View>
          <View style={styles.cartaoAlunoDisciplinaInfo}>
            <Text style={styles.cartaoAlunoDisciplinaNome}>História</Text>
            <Text style={styles.cartaoAlunoDisciplinaMoedas}>
              380/1000 moedas
            </Text>
            <View style={styles.cartaoAlunoProgressBar}>
              <View
                style={[
                  styles.cartaoAlunoProgressFill,
                  { width: "38%", backgroundColor: "#8D6E63" },
                ]}
              />
            </View>
          </View>
        </View>

        {/* Disciplina - Geografia */}
        <View style={styles.cartaoAlunoDisciplinaItem}>
          <View
            style={[
              styles.cartaoAlunoDisciplinaIcon,
              { backgroundColor: "#2E7D32" },
            ]}
          >
            <MaterialCommunityIcons
              name="earth"
              size={24}
              color={WHITE_COLOR}
            />
          </View>
          <View style={styles.cartaoAlunoDisciplinaInfo}>
            <Text style={styles.cartaoAlunoDisciplinaNome}>Geografia</Text>
            <Text style={styles.cartaoAlunoDisciplinaMoedas}>
              320/1000 moedas
            </Text>
            <View style={styles.cartaoAlunoProgressBar}>
              <View
                style={[
                  styles.cartaoAlunoProgressFill,
                  { width: "32%", backgroundColor: "#2E7D32" },
                ]}
              />
            </View>
          </View>
        </View>

        {/* Disciplina - Inglês */}
        <View style={styles.cartaoAlunoDisciplinaItem}>
          <View
            style={[
              styles.cartaoAlunoDisciplinaIcon,
              { backgroundColor: "#1976D2" },
            ]}
          >
            <MaterialCommunityIcons
              name="translate"
              size={24}
              color={WHITE_COLOR}
            />
          </View>
          <View style={styles.cartaoAlunoDisciplinaInfo}>
            <Text style={styles.cartaoAlunoDisciplinaNome}>Inglês</Text>
            <Text style={styles.cartaoAlunoDisciplinaMoedas}>
              280/1000 moedas
            </Text>
            <View style={styles.cartaoAlunoProgressBar}>
              <View
                style={[
                  styles.cartaoAlunoProgressFill,
                  { width: "28%", backgroundColor: "#1976D2" },
                ]}
              />
            </View>
          </View>
        </View>

        {/* Disciplina - Artes */}
        <View style={styles.cartaoAlunoDisciplinaItem}>
          <View
            style={[
              styles.cartaoAlunoDisciplinaIcon,
              { backgroundColor: "#E91E63" },
            ]}
          >
            <MaterialCommunityIcons
              name="palette"
              size={24}
              color={WHITE_COLOR}
            />
          </View>
          <View style={styles.cartaoAlunoDisciplinaInfo}>
            <Text style={styles.cartaoAlunoDisciplinaNome}>Artes</Text>
            <Text style={styles.cartaoAlunoDisciplinaMoedas}>
              250/1000 moedas
            </Text>
            <View style={styles.cartaoAlunoProgressBar}>
              <View
                style={[
                  styles.cartaoAlunoProgressFill,
                  { width: "25%", backgroundColor: "#E91E63" },
                ]}
              />
            </View>
          </View>
        </View>

        {/* Disciplina - Informática */}
        <View style={styles.cartaoAlunoDisciplinaItem}>
          <View
            style={[
              styles.cartaoAlunoDisciplinaIcon,
              { backgroundColor: "#FF6F00" },
            ]}
          >
            <MaterialCommunityIcons
              name="laptop"
              size={24}
              color={WHITE_COLOR}
            />
          </View>
          <View style={styles.cartaoAlunoDisciplinaInfo}>
            <Text style={styles.cartaoAlunoDisciplinaNome}>Informática</Text>
            <Text style={styles.cartaoAlunoDisciplinaMoedas}>
              200/1000 moedas
            </Text>
            <View style={styles.cartaoAlunoProgressBar}>
              <View
                style={[
                  styles.cartaoAlunoProgressFill,
                  { width: "20%", backgroundColor: "#FF6F00" },
                ]}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const NotificacoesScreen = () => {
  const renderNotificacao = ({ item }) => (
    <View style={styles.notificacaoCard}>
      <View
        style={[
          styles.lojaItemIconContainer,
          { backgroundColor: item.corIcone, marginRight: 15 },
        ]}
      >
        <MaterialCommunityIcons
          name={item.iconeMCI}
          size={24}
          color={WHITE_COLOR}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.notificacaoTexto}>{item.texto}</Text>
        <Text style={styles.notificacaoTempo}>{item.tempo}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.notificacoesContainer}>
      <View style={styles.notificacoesHeader}>
        <Text style={styles.notificacoesTitle}>Notificações</Text>
        <Text style={styles.notificacoesSubtitle}>
          Fique por dentro das novidades
        </Text>
      </View>
      <FlatList
        data={MOCK_NOTIFICACOES}
        renderItem={renderNotificacao}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={true}
        bounces={true}
        scrollEventThrottle={16}
        contentContainerStyle={styles.notificacoesScrollContent}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </View>
  );
};
// Cores para os professores (seguindo o padrão das disciplinas)
const CORES_PROFESSORES = [
  "#D32F2F", // Vermelho
  "#F57C00", // Laranja
  "#0288D1", // Azul
  "#388E3C", // Verde
  "#7B1FA2", // Roxo
  "#00796B", // Teal
  "#C2185B", // Pink
  "#5D4037", // Marrom
  "#455A64", // Blue Grey
  "#E64A19", // Deep Orange
  "#1976D2", // Blue
  "#8BC34A", // Light Green
];

const ProfessoresScreen = ({ navigation }) => {
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (professorId) => {
    setImageErrors((prev) => ({
      ...prev,
      [professorId]: true,
    }));
  };

  const renderProfessor = ({ item, index }) => {
    // Atribui uma cor baseada no índice do professor
    const corProfessor = CORES_PROFESSORES[index % CORES_PROFESSORES.length];

    // Pega as iniciais do nome do professor (para fallback)
    const nomeCompleto = item.nome.replace("Prof. ", "");
    const iniciais = nomeCompleto
      .split(" ")
      .map((palavra) => palavra.charAt(0))
      .join("")
      .substring(0, 2);

    const hasImageError = imageErrors[item.id];

    return (
      <TouchableOpacity
        style={styles.disciplinaCard} // Usando o mesmo estilo das disciplinas
        onPress={() =>
          navigation.navigate("DetalhesProfessor", {
            professorId: item.id,
            professorNome: item.nome,
          })
        }
      >
        <View style={styles.disciplinaIconContainer}>
          {!hasImageError ? (
            <Image
              source={{ uri: item.imagemUrl }}
              style={styles.professorImagemLista}
              onError={() => handleImageError(item.id)}
            />
          ) : (
            // Fallback com iniciais quando a imagem falha
            <View
              style={[
                styles.professorFallbackContainer,
                { backgroundColor: corProfessor, opacity: 1 },
              ]}
            >
              <Text style={styles.professorIniciais}>{iniciais}</Text>
            </View>
          )}
        </View>
        <Text style={styles.disciplinaNome} numberOfLines={2}>
          {nomeCompleto}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView
      style={styles.professoresContainer}
      contentContainerStyle={styles.professoresScrollContent}
      showsVerticalScrollIndicator={true}
      bounces={true}
      scrollEventThrottle={16}
    >
      <View style={styles.professoresHeader}>
        <Text style={styles.professoresTitle}>Nossos Professores</Text>
        <Text style={styles.professoresSubtitle}>
          Conheça nossa equipe pedagógica
        </Text>
      </View>
      <FlatList
        data={PROFESSORES_MOCK}
        renderItem={renderProfessor}
        keyExtractor={(item) => item.id}
        numColumns={4} // Grid 4x4 igual às disciplinas
        columnWrapperStyle={{
          justifyContent: "space-around",
          marginBottom: 15,
        }}
        style={{ paddingHorizontal: 5 }}
        scrollEnabled={false} // Desabilita scroll do FlatList pois está dentro do ScrollView
      />
    </ScrollView>
  );
};
const VideosScreen = ({ navigation }) => {
  const renderVideo = ({ item }) => (
    <TouchableOpacity
      style={styles.videoCard}
      onPress={() => {
        Alert.alert(
          "▶️ Videoaula",
          `Reproduzindo: "${item.titulo}"\nProfessor: ${item.professor}\nDuração: ${item.duracao}`,
          [{ text: "OK", style: "default" }]
        );
      }}
    >
      <View style={styles.videoThumbnailContainer}>
        <View style={styles.videoThumbnail}>
          <Ionicons name="play-circle" size={48} color={WHITE_COLOR} />
        </View>
        <View style={styles.videoDuration}>
          <Text style={styles.videoDurationText}>{item.duracao}</Text>
        </View>
      </View>
      <View style={styles.videoInfo}>
        <Text style={styles.videoTitulo}>{item.titulo}</Text>
        <Text style={styles.videoProfessor}>
          <Ionicons name="person" size={14} color={TEXT_COLOR_MUTED} />{" "}
          {item.professor}
        </Text>
      </View>
      <View style={styles.videoChevron}>
        <Ionicons name="chevron-forward-outline" size={20} color="#CCC" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.videosContainer}>
      <View style={styles.videosHeader}>
        <Text style={styles.videosTitle}>Videoaulas</Text>
        <Text style={styles.videosSubtitle}>
          Aprenda com nossos professores
        </Text>
      </View>
      <FlatList
        data={VIDEOAULAS_MOCK}
        renderItem={renderVideo}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={true}
        bounces={true}
        scrollEventThrottle={16}
        contentContainerStyle={styles.videosScrollContent}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        alwaysBounceVertical={true}
        scrollIndicatorInsets={{ right: 1 }}
        persistentScrollbar={true}
      />
    </View>
  );
};
const PesquisarScreen = () => (
  <ScrollView
    style={styles.screenContainerPadded}
    contentContainerStyle={styles.pesquisarScrollContent}
    showsVerticalScrollIndicator={true}
    bounces={true}
    scrollEventThrottle={16}
  >
    <View style={styles.searchContainer}>
      <Ionicons
        name="search"
        size={20}
        color={TEXT_COLOR_MUTED}
        style={styles.searchIcon}
      />
      <TextInput
        placeholder="Pesquisar no app..."
        style={styles.searchInput}
        placeholderTextColor={TEXT_COLOR_MUTED}
      />
    </View>
    <View style={styles.placeholderContainer}>
      <Ionicons
        name="search-circle-outline"
        size={80}
        color={TEXT_COLOR_MUTED}
      />
      <Text style={styles.placeholderText}>Pesquisa</Text>
      <Text style={styles.placeholderSubText}>(Funcionalidade em breve)</Text>
    </View>

    {/* Espaço extra para scroll */}
    <View style={styles.pesquisarFooterSpace} />
  </ScrollView>
);
const PerfilScreen = () => {
  const { saldoMoedas, onLogout } = useGlobalState();
  const [modoEdicao, setModoEdicao] = useState(false);
  const [dadosPerfil, setDadosPerfil] = useState(MOCK_PERFIL_USUARIO);
  const [dadosTemporarios, setDadosTemporarios] = useState({});

  const handleLogout = () => {
    Alert.alert(
      "Sair da conta",
      "Tem certeza que deseja sair?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sair",
          style: "destructive",
          onPress: () => {
            if (onLogout) {
              onLogout();
            } else {
              Alert.alert("Erro", "Não foi possível sair da conta.");
            }
          }
        }
      ]
    );
  };

  const iniciarEdicao = () => {
    setDadosTemporarios({ ...dadosPerfil });
    setModoEdicao(true);
  };

  const cancelarEdicao = () => {
    setDadosTemporarios({});
    setModoEdicao(false);
  };

  const salvarEdicao = () => {
    setDadosPerfil({ ...dadosTemporarios });
    setDadosTemporarios({});
    setModoEdicao(false);
    Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
  };

  const atualizarCampo = (campo, valor) => {
    setDadosTemporarios((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const renderCampoEdicao = (label, campo, placeholder, multiline = false) => {
    const valor = modoEdicao
      ? dadosTemporarios[campo] || dadosPerfil[campo]
      : dadosPerfil[campo];

    return (
      <View style={styles.perfilCampoContainer}>
        <Text style={styles.perfilCampoLabel}>{label}:</Text>
        {modoEdicao ? (
          <TextInput
            style={[
              styles.perfilCampoInput,
              multiline && styles.perfilCampoInputMultiline,
            ]}
            value={valor}
            onChangeText={(text) => atualizarCampo(campo, text)}
            placeholder={placeholder}
            multiline={multiline}
            numberOfLines={multiline ? 3 : 1}
          />
        ) : (
          <Text style={styles.perfilCampoValor}>{valor}</Text>
        )}
      </View>
    );
  };

  const renderCampoFixo = (label, valor, icone) => (
    <View style={styles.perfilInfoItem}>
      <Ionicons
        name={icone}
        size={24}
        color={PRIMARY_COLOR}
        style={styles.perfilInfoIcon}
      />
      <Text style={styles.perfilInfoLabel}>{label}:</Text>
      <Text style={styles.perfilInfoValor}>{valor}</Text>
    </View>
  );

  return (
    <ScrollView
      contentContainerStyle={styles.screenContainerPadded}
      showsVerticalScrollIndicator={true}
      bounces={true}
      scrollEventThrottle={16}
      style={styles.perfilScrollContainer}
    >
      {/* Header do Perfil */}
      <View style={styles.perfilHeader}>
        <View style={styles.perfilAvatarContainer}>
          <Image
            source={{ uri: FOTO_ALUNO_EXEMPLO }}
            style={styles.perfilAvatar}
            onError={() => {
              // Fallback será o ícone original
            }}
          />
        </View>
        <Text style={styles.perfilNome}>{dadosPerfil.nome}</Text>
        <Text style={styles.perfilMatricula}>
          Matrícula: {dadosPerfil.matricula}
        </Text>
        <Text style={styles.perfilTurma}>
          {dadosPerfil.turma} - {dadosPerfil.periodo}
        </Text>
      </View>

      {/* Informações Básicas (Não Editáveis) */}
      <View style={styles.perfilInfoCard}>
        <Text style={styles.perfilSectionTitle}>Informações Básicas</Text>
        {renderCampoFixo(
          "Saldo de Moedas",
          `$${saldoMoedas}`,
          "wallet-outline"
        )}
        {renderCampoFixo("Email", dadosPerfil.email, "mail-outline")}
        {renderCampoFixo("Telefone", dadosPerfil.telefone, "call-outline")}
        {renderCampoFixo(
          "Data de Nascimento",
          dadosPerfil.dataNascimento,
          "calendar-outline"
        )}
        {renderCampoFixo(
          "Ano de Ingresso",
          dadosPerfil.anoIngresso,
          "school-outline"
        )}
      </View>

      {/* Endereço */}
      <View style={styles.perfilInfoCard}>
        <Text style={styles.perfilSectionTitle}>Endereço</Text>
        {renderCampoFixo("Endereço", dadosPerfil.endereco, "home-outline")}
        {renderCampoFixo("Cidade", dadosPerfil.cidade, "location-outline")}
        {renderCampoFixo("Estado", dadosPerfil.estado, "map-outline")}
        {renderCampoFixo("CEP", dadosPerfil.cep, "pin-outline")}
      </View>

      {/* Responsável */}
      <View style={styles.perfilInfoCard}>
        <Text style={styles.perfilSectionTitle}>Responsável</Text>
        {renderCampoFixo("Nome", dadosPerfil.responsavel, "person-outline")}
        {renderCampoFixo(
          "Telefone",
          dadosPerfil.telefoneResponsavel,
          "call-outline"
        )}
      </View>

      {/* Informações Editáveis */}
      <View style={styles.perfilInfoCard}>
        <Text style={styles.perfilSectionTitle}>Informações Pessoais</Text>
        {renderCampoEdicao(
          "Biografia",
          "bio",
          "Conte um pouco sobre você...",
          true
        )}
        {renderCampoEdicao("Hobbies", "hobbies", "Seus hobbies e interesses")}
        {renderCampoEdicao(
          "Matéria Favorita",
          "materiaFavorita",
          "Qual sua matéria favorita?"
        )}
        {renderCampoEdicao(
          "Meta Acadêmica",
          "metaAcademica",
          "Qual sua meta para este ano?",
          true
        )}
      </View>

      {/* Botões de Ação */}
      <View style={styles.perfilBotoesContainer}>
        {modoEdicao ? (
          <>
            <TouchableOpacity
              style={[styles.perfilActionButton, styles.perfilBotaoSalvar]}
              onPress={salvarEdicao}
            >
              <Ionicons
                name="checkmark-outline"
                size={20}
                color={WHITE_COLOR}
                style={styles.perfilActionButtonIcon}
              />
              <Text style={styles.perfilActionButtonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.perfilActionButton, styles.perfilBotaoCancelar]}
              onPress={cancelarEdicao}
            >
              <Ionicons
                name="close-outline"
                size={20}
                color={WHITE_COLOR}
                style={styles.perfilActionButtonIcon}
              />
              <Text style={styles.perfilActionButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={styles.perfilActionButton}
            onPress={iniciarEdicao}
          >
            <Ionicons
              name="pencil-outline"
              size={20}
              color={WHITE_COLOR}
              style={styles.perfilActionButtonIcon}
            />
            <Text style={styles.perfilActionButtonText}>Editar Perfil</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.perfilActionButton, styles.perfilBotaoSair]}
          onPress={handleLogout}
        >
          <Ionicons
            name="log-out-outline"
            size={20}
            color={WHITE_COLOR}
            style={styles.perfilActionButtonIcon}
          />
          <Text style={styles.perfilActionButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const DetalhesProfessorScreen = ({ route }) => {
  const { professorId } = route.params;

  // Encontrar o professor no array de dados mockados
  const professor = PROFESSORES_MOCK.find((prof) => prof.id === professorId);

  // Se o professor não foi encontrado, exibir erro
  if (!professor) {
    return (
      <View style={styles.placeholderContainer}>
        <Ionicons
          name="person-circle-outline"
          size={80}
          color={TEXT_COLOR_MUTED}
        />
        <Text style={styles.placeholderText}>Professor não encontrado</Text>
        <Text style={styles.placeholderSubText}>
          Verifique se o ID está correto
        </Text>
      </View>
    );
  }

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Ionicons key={i} name="star" size={16} color="#FFD700" />);
    }

    if (hasHalfStar) {
      stars.push(
        <Ionicons key="half" name="star-half" size={16} color="#FFD700" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Ionicons
          key={`empty-${i}`}
          name="star-outline"
          size={16}
          color="#FFD700"
        />
      );
    }

    return stars;
  };

  return (
    <ScrollView
      style={styles.detalhesProfessorContainer}
      contentContainerStyle={styles.detalhesProfessorScrollContent}
      showsVerticalScrollIndicator={true}
      bounces={true}
      scrollEventThrottle={16}
      indicatorStyle="default"
      persistentScrollbar={true}
      alwaysBounceVertical={true}
      scrollIndicatorInsets={{ right: 1 }}
    >
      {/* Header com foto e informações básicas */}
      <View style={styles.detalhesProfessorHeader}>
        <Image
          source={{ uri: professor.imagemUrl }}
          style={styles.detalhesProfessorImagem}
        />
        <View style={styles.detalhesProfessorHeaderInfo}>
          <Text style={styles.detalhesProfessorNome}>{professor.nome}</Text>
          <Text style={styles.detalhesProfessorDisciplina}>
            {professor.disciplina}
          </Text>

          {/* Rating */}
          <View style={styles.detalhesProfessorRatingContainer}>
            <View style={styles.detalhesProfessorStars}>
              {renderStars(professor.rating)}
            </View>
            <Text style={styles.detalhesProfessorRatingText}>
              {professor.rating} ({professor.avaliacoes} avaliações)
            </Text>
          </View>
        </View>
      </View>

      {/* Biografia */}
      <View style={styles.detalhesProfessorCard}>
        <Text style={styles.detalhesProfessorCardTitle}>
          <Ionicons name="person-outline" size={18} color={PRIMARY_COLOR} />{" "}
          Sobre
        </Text>
        <Text style={styles.detalhesProfessorBio}>{professor.bio}</Text>
      </View>

      {/* Formação e Experiência */}
      <View style={styles.detalhesProfessorCard}>
        <Text style={styles.detalhesProfessorCardTitle}>
          <Ionicons name="school-outline" size={18} color={PRIMARY_COLOR} />{" "}
          Formação e Experiência
        </Text>
        <View style={styles.detalhesProfessorInfoItem}>
          <Text style={styles.detalhesProfessorInfoLabel}>Formação:</Text>
          <Text style={styles.detalhesProfessorInfoValue}>
            {professor.formacao}
          </Text>
        </View>
        <View style={styles.detalhesProfessorInfoItem}>
          <Text style={styles.detalhesProfessorInfoLabel}>Especialização:</Text>
          <Text style={styles.detalhesProfessorInfoValue}>
            {professor.especializacao}
          </Text>
        </View>
        <View style={styles.detalhesProfessorInfoItem}>
          <Text style={styles.detalhesProfessorInfoLabel}>Experiência:</Text>
          <Text style={styles.detalhesProfessorInfoValue}>
            {professor.experiencia}
          </Text>
        </View>
      </View>

      {/* Contato */}
      <View style={styles.detalhesProfessorCard}>
        <Text style={styles.detalhesProfessorCardTitle}>
          <Ionicons name="call-outline" size={18} color={PRIMARY_COLOR} />{" "}
          Contato
        </Text>
        <TouchableOpacity style={styles.detalhesProfessorContatoItem}>
          <Ionicons name="mail-outline" size={20} color={PRIMARY_COLOR} />
          <Text style={styles.detalhesProfessorContatoText}>
            {professor.email}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.detalhesProfessorContatoItem}>
          <Ionicons name="call-outline" size={20} color={PRIMARY_COLOR} />
          <Text style={styles.detalhesProfessorContatoText}>
            {professor.telefone}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Horários */}
      <View style={styles.detalhesProfessorCard}>
        <Text style={styles.detalhesProfessorCardTitle}>
          <Ionicons name="time-outline" size={18} color={PRIMARY_COLOR} />{" "}
          Horários de Atendimento
        </Text>
        {professor.horarios.map((horario, index) => (
          <View key={index} style={styles.detalhesProfessorHorarioItem}>
            <Ionicons
              name="calendar-outline"
              size={16}
              color={TEXT_COLOR_MUTED}
            />
            <Text style={styles.detalhesProfessorHorarioText}>{horario}</Text>
          </View>
        ))}
      </View>

      {/* Turmas */}
      <View style={styles.detalhesProfessorCard}>
        <Text style={styles.detalhesProfessorCardTitle}>
          <Ionicons name="people-outline" size={18} color={PRIMARY_COLOR} />{" "}
          Turmas
        </Text>
        <View style={styles.detalhesProfessorTurmasContainer}>
          {professor.turmas.map((turma, index) => (
            <View key={index} style={styles.detalhesProfessorTurmaChip}>
              <Text style={styles.detalhesProfessorTurmaText}>{turma}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Projetos */}
      <View style={styles.detalhesProfessorCard}>
        <Text style={styles.detalhesProfessorCardTitle}>
          <Ionicons name="rocket-outline" size={18} color={PRIMARY_COLOR} />{" "}
          Projetos
        </Text>
        {professor.projetos.map((projeto, index) => (
          <View key={index} style={styles.detalhesProfessorProjetoItem}>
            <Ionicons
              name="checkmark-circle-outline"
              size={16}
              color={GREEN_SUCCESS}
            />
            <Text style={styles.detalhesProfessorProjetoText}>{projeto}</Text>
          </View>
        ))}
      </View>

      {/* Seção Adicional de Avaliações */}
      <View style={styles.detalhesProfessorCard}>
        <Text style={styles.detalhesProfessorCardTitle}>
          <Ionicons name="star-outline" size={18} color={PRIMARY_COLOR} />{" "}
          Avaliações dos Alunos
        </Text>
        <View style={styles.detalhesProfessorAvaliacaoItem}>
          <View style={styles.detalhesProfessorAvaliacaoHeader}>
            <Text style={styles.detalhesProfessorAvaliacaoAluno}>
              Ana Silva
            </Text>
            <View style={styles.detalhesProfessorStars}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Ionicons name="star" size={14} color="#FFD700" />
              <Ionicons name="star" size={14} color="#FFD700" />
              <Ionicons name="star" size={14} color="#FFD700" />
              <Ionicons name="star" size={14} color="#FFD700" />
            </View>
          </View>
          <Text style={styles.detalhesProfessorAvaliacaoTexto}>
            "Excelente professor! Explica de forma muito clara e sempre está
            disposto a ajudar."
          </Text>
        </View>
        <View style={styles.detalhesProfessorAvaliacaoItem}>
          <View style={styles.detalhesProfessorAvaliacaoHeader}>
            <Text style={styles.detalhesProfessorAvaliacaoAluno}>
              João Santos
            </Text>
            <View style={styles.detalhesProfessorStars}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Ionicons name="star" size={14} color="#FFD700" />
              <Ionicons name="star" size={14} color="#FFD700" />
              <Ionicons name="star" size={14} color="#FFD700" />
              <Ionicons name="star-outline" size={14} color="#FFD700" />
            </View>
          </View>
          <Text style={styles.detalhesProfessorAvaliacaoTexto}>
            "Metodologia inovadora e aulas muito dinâmicas. Recomendo!"
          </Text>
        </View>
      </View>

      {/* Seção de Materiais e Recursos */}
      <View style={styles.detalhesProfessorCard}>
        <Text style={styles.detalhesProfessorCardTitle}>
          <Ionicons name="book-outline" size={18} color={PRIMARY_COLOR} />{" "}
          Materiais e Recursos
        </Text>
        <View style={styles.detalhesProfessorRecursoItem}>
          <Ionicons
            name="document-text-outline"
            size={16}
            color={TEXT_COLOR_MUTED}
          />
          <Text style={styles.detalhesProfessorRecursoText}>
            Material didático atualizado
          </Text>
        </View>
        <View style={styles.detalhesProfessorRecursoItem}>
          <Ionicons
            name="videocam-outline"
            size={16}
            color={TEXT_COLOR_MUTED}
          />
          <Text style={styles.detalhesProfessorRecursoText}>
            Videoaulas complementares
          </Text>
        </View>
        <View style={styles.detalhesProfessorRecursoItem}>
          <Ionicons
            name="clipboard-outline"
            size={16}
            color={TEXT_COLOR_MUTED}
          />
          <Text style={styles.detalhesProfessorRecursoText}>
            Listas de exercícios
          </Text>
        </View>
        <View style={styles.detalhesProfessorRecursoItem}>
          <Ionicons name="flask-outline" size={16} color={TEXT_COLOR_MUTED} />
          <Text style={styles.detalhesProfessorRecursoText}>
            Experimentos práticos
          </Text>
        </View>
      </View>

      {/* Espaço extra para scroll completo */}
      <View style={styles.detalhesProfessorFooterSpace} />

      {/* View extra para garantir scroll visível */}
      <View style={{ height: 200, backgroundColor: "transparent" }} />
    </ScrollView>
  );
};

const TodasDisciplinasScreen = ({ navigation }) => {
  const renderDisciplinaCompleta = ({ item }) => (
    <TouchableOpacity
      style={styles.todasDisciplinasCard}
      onPress={() =>
        navigation.navigate("DisciplinasDrawer", {
          screen: "DetalhesMateria",
          params: {
            materiaId: item.id,
            materiaNome: item.nome,
            corIcone: item.cor,
          },
        })
      }
    >
      <View
        style={[
          styles.todasDisciplinasIconContainer,
          { backgroundColor: item.cor },
        ]}
      >
        <item.iconLib
          name={item.iconeIon || item.iconeMCI}
          size={32}
          color={WHITE_COLOR}
        />
      </View>
      <View style={styles.todasDisciplinasInfo}>
        <Text style={styles.todasDisciplinasNome}>{item.nome}</Text>
        <Text style={styles.todasDisciplinasDescricao}>
          {CONTEUDO_MATERIAS_MOCK[item.id]
            ? `${
                CONTEUDO_MATERIAS_MOCK[item.id].resumos?.length || 0
              } resumos • ${
                CONTEUDO_MATERIAS_MOCK[item.id].atividades?.length || 0
              } atividades`
            : "Em breve"}
        </Text>
      </View>
      <View style={styles.todasDisciplinasChevron}>
        <Ionicons name="chevron-forward-outline" size={24} color="#CCC" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.todasDisciplinasContainer}>
      <View style={styles.todasDisciplinasHeader}>
        <Text style={styles.todasDisciplinasTitle}>Todas as Disciplinas</Text>
        <Text style={styles.todasDisciplinasSubtitle}>
          Explore todo o conteúdo disponível
        </Text>
      </View>
      <FlatList
        data={TODAS_DISCIPLINAS_MOCK}
        renderItem={renderDisciplinaCompleta}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={true}
        bounces={true}
        scrollEventThrottle={16}
        contentContainerStyle={styles.todasDisciplinasScrollContent}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </View>
  );
};

// --- Navegadores ---
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DisciplinasStackNavigatorDrawer = () => (
  <Stack.Navigator screenOptions={{ header: AppHeader }}>
    <Stack.Screen
      name="DisciplinasListDrawer"
      component={TodasDisciplinasScreen}
      options={{ title: "Todas as Disciplinas" }}
    />
    <Stack.Screen
      name="DetalhesMateria"
      component={DetalhesMateriaScreen}
      options={({ route }) => ({
        title: route.params.materiaNome || "Detalhes",
      })}
    />
  </Stack.Navigator>
);
const LojaStackNavigator = () => (
  <Stack.Navigator screenOptions={{ header: AppHeader }}>
    <Stack.Screen
      name="LojaRoot"
      component={LojaPontosScreen}
      options={{ title: "Loja de Pontos" }}
    />
    <Stack.Screen
      name="LojaPagamento"
      component={LojaPagamentoScreen}
      options={{ title: "Pagamento" }}
    />
    <Stack.Screen
      name="LojaRecibo"
      component={LojaReciboScreen}
      options={{ title: "Recibo" }}
    />
  </Stack.Navigator>
);
const ProfessoresStackNavigatorDrawer = () => (
  <Stack.Navigator screenOptions={{ header: AppHeader }}>
    <Stack.Screen
      name="ProfessoresListDrawer"
      component={ProfessoresScreen}
      options={{ title: "Professores" }}
    />
    <Stack.Screen
      name="DetalhesProfessor"
      component={DetalhesProfessorScreen}
      options={({ route }) => ({
        title: route.params?.professorId
          ? "Detalhes do Professor"
          : "Professor",
      })}
    />
  </Stack.Navigator>
);

const HomeStackNavigator = () => (
  <Stack.Navigator screenOptions={{ header: AppHeader }}>
    <Stack.Screen
      name="HomeMain"
      component={HomeScreen}
      options={{ title: "Início" }}
    />
    <Stack.Screen
      name="TodasDisciplinas"
      component={TodasDisciplinasScreen}
      options={{ title: "Todas as Disciplinas" }}
    />
  </Stack.Navigator>
);

const MainBottomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        const iconColor = focused
          ? ICON_COLOR_ACTIVE_TAB
          : ICON_COLOR_INACTIVE_TAB;
        size = Platform.OS === "ios" ? 28 : 24;
        if (route.name === "Início")
          iconName = focused ? "home-sharp" : "home-outline";
        else if (route.name === "LojaTab")
          iconName = focused ? "card-sharp" : "card-outline";
        else if (route.name === "PesquisarTab")
          iconName = focused ? "search-sharp" : "search-outline";
        else if (route.name === "PerfilTab") {
          // Componente customizado para mostrar a foto do aluno na tab
          return (
            <View style={styles.tabPerfilIconContainer}>
              <Image
                source={{ uri: FOTO_ALUNO_EXEMPLO }}
                style={[
                  styles.tabPerfilIcon,
                  {
                    borderColor: focused
                      ? ICON_COLOR_ACTIVE_TAB
                      : ICON_COLOR_INACTIVE_TAB,
                  },
                ]}
                onError={() => {
                  // Se falhar, usa o ícone padrão (será tratado pelo fallback)
                }}
              />
              {/* Fallback com ícone */}
              <Ionicons
                name={focused ? "person-circle-sharp" : "person-circle-outline"}
                size={size}
                color={iconColor}
                style={styles.tabPerfilIconFallback}
              />
            </View>
          );
        } else iconName = "ellipse-outline";
        return <Ionicons name={iconName} size={size} color={iconColor} />;
      },
      tabBarActiveTintColor: ICON_COLOR_ACTIVE_TAB,
      tabBarInactiveTintColor: ICON_COLOR_INACTIVE_TAB,
      tabBarStyle: styles.tabBarStyle,
      tabBarLabelStyle: styles.tabBarLabelStyle,
      header: AppHeader,
    })}
  >
    <Tab.Screen
      name="Início"
      component={HomeStackNavigator}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="LojaTab"
      component={LojaStackNavigator}
      options={{ title: "Loja", headerShown: false }}
    />
    <Tab.Screen
      name="PesquisarTab"
      component={PesquisarScreen}
      options={{ title: "Pesquisar" }}
    />
    <Tab.Screen
      name="PerfilTab"
      component={PerfilScreen}
      options={{ title: "Perfil" }}
    />
  </Tab.Navigator>
);

const AppDrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    sceneContainerStyle={{ backgroundColor: PRIMARY_COLOR }}
    screenOptions={({ navigation, route }) => ({
      header: (props) => (
        <AppHeader {...props} navigation={navigation} route={route} />
      ),
      drawerActiveTintColor: ICON_COLOR_DRAWER_ACTIVE,
      drawerInactiveTintColor: ICON_COLOR_DRAWER_INACTIVE,
      drawerActiveBackgroundColor: LIGHT_BG_COLOR,
      drawerLabelStyle: styles.drawerItemLabel,
      drawerItemStyle: styles.drawerItem,
      drawerStyle: { backgroundColor: WHITE_COLOR, width: width * 0.82 },
    })}
  >
    <Drawer.Screen
      name="PrincipalTabs"
      component={MainBottomTabNavigator}
      options={{
        title: "Início",
        drawerIcon: ({ color, size }) => (
          <Ionicons name="home-sharp" color={color} size={size - 2} />
        ),
        headerShown: false,
      }}
    />
    <Drawer.Screen
      name="CartaoAlunoDrawer"
      component={CartaoAlunoScreen}
      options={{
        title: "Cartão Aluno",
        drawerIcon: ({ color, size }) => (
          <Ionicons name="card" color={color} size={size - 2} />
        ),
      }}
    />
    <Drawer.Screen
      name="DisciplinasDrawer"
      component={DisciplinasStackNavigatorDrawer}
      options={{
        title: "Disciplinas",
        drawerIcon: ({ color, size }) => (
          <Ionicons name="library-sharp" color={color} size={size - 2} />
        ),
        headerShown: false,
      }}
    />
    <Drawer.Screen
      name="LojaDrawer"
      component={LojaStackNavigator}
      options={{
        title: "Loja de Pontos",
        drawerIcon: ({ color, size }) => (
          <Ionicons name="card-sharp" color={color} size={size - 2} />
        ),
        headerShown: false,
      }}
    />
    <Drawer.Screen
      name="ResgatarDrawer"
      component={ResgatarTarefasScreen}
      options={{
        title: "Resgatar Tarefas",
        drawerIcon: ({ color, size }) => (
          <Ionicons name="trophy-sharp" color={color} size={size - 2} />
        ),
      }}
    />
    <Drawer.Screen
      name="NotasDrawer"
      component={NotasScreen}
      options={{
        title: "Minhas Notas",
        drawerIcon: ({ color, size }) => (
          <Ionicons name="analytics-sharp" color={color} size={size - 2} />
        ),
      }}
    />
    <Drawer.Screen
      name="FrequenciaDrawer"
      component={FrequenciaScreen}
      options={{
        title: "Frequência",
        drawerIcon: ({ color, size }) => (
          <Ionicons name="pie-chart-sharp" color={color} size={size - 2} />
        ),
      }}
    />
    <Drawer.Screen
      name="ProfessoresDrawer"
      component={ProfessoresStackNavigatorDrawer}
      options={{
        title: "Professores",
        drawerIcon: ({ color, size }) => (
          <Ionicons name="people-sharp" color={color} size={size - 2} />
        ),
        headerShown: false,
      }}
    />
    <Drawer.Screen
      name="VideosDrawer"
      component={VideosScreen}
      options={{
        title: "Videoaulas",
        drawerIcon: ({ color, size }) => (
          <Ionicons name="play-circle-sharp" color={color} size={size - 2} />
        ),
      }}
    />
    <Drawer.Screen
      name="NotificacoesDrawer"
      component={NotificacoesScreen}
      options={{
        title: "Notificações",
        drawerIcon: ({ color, size }) => (
          <Ionicons name="notifications-sharp" color={color} size={size - 2} />
        ),
      }}
    />
    <Drawer.Screen
      name="PerfilDrawer"
      component={PerfilScreen}
      options={{
        title: "Meu Perfil",
        drawerIcon: ({ color, size }) => (
          <Ionicons name="person-circle-sharp" color={color} size={size - 2} />
        ),
      }}
    />
  </Drawer.Navigator>
);

const ConditionalDisplay = ({ condition, children }) =>
  condition ? children : null;

export default function App({ onLogout }) {
  return (
    <GlobalStateProvider onLogout={onLogout}>
      <NavigationContainer>
        <AppDrawerNavigator />
      </NavigationContainer>
    </GlobalStateProvider>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  headerSafeArea: {
    backgroundColor: PRIMARY_COLOR,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 0,
    height: 55,
  },
  headerLeft: {
    flex: 0.15,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 5,
  },
  headerIconButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    minWidth: 44,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: WHITE_COLOR,
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
    flex: 0.7,
  },
  headerRight: {
    flex: 0.15,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 0,
  },
  avatarPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  drawerHeader: {
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: "flex-start",
    marginBottom: 8,
  },
  drawerHeaderText: {
    color: WHITE_COLOR,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  drawerSubHeaderText: { color: "#E0E0E0", fontSize: 14 },
  drawerAvatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: WHITE_COLOR,
    position: "relative",
  },
  drawerAvatar: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  drawerAvatarFallback: {
    width: 60,
    height: 60,
  },
  drawerItem: { marginVertical: 0, marginHorizontal: 5, paddingVertical: 1 },
  drawerItemLabel: {
    marginLeft: 0,
    fontSize: 15,
    fontWeight: "500",
    paddingVertical: 3,
  },
  tabBarStyle: {
    backgroundColor: WHITE_COLOR,
    borderTopColor: "#E0E0E0",
    borderTopWidth: Platform.OS === "ios" ? 0.5 : 1,
    height: Platform.OS === "ios" ? 85 : 60,
    paddingBottom: Platform.OS === "ios" ? 25 : 5,
    paddingTop: 5,
  },
  tabBarLabelStyle: {
    fontSize: 10,
    fontWeight: "500",
    marginTop: 2,
    marginBottom: Platform.OS === "ios" ? 0 : 5,
  },
  tabPerfilIconContainer: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  tabPerfilIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    position: "absolute",
  },
  tabPerfilIconFallback: {
    position: "absolute",
    opacity: 0, // Só aparece se a imagem falhar
  },
  homeScreenContainer: { flex: 1, backgroundColor: LIGHT_BG_COLOR },
  homeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 20 : 15,
    paddingBottom: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 10,
  },
  homeAvatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: WHITE_COLOR,
    overflow: "hidden",
  },
  homeAvatar: {
    width: "100%",
    height: "100%",
    borderRadius: 25,
  },
  homeSaudacao: { fontSize: 18, color: WHITE_COLOR_TRANSLUCENT },
  homeNomeAluno: { fontSize: 26, fontWeight: "bold", color: WHITE_COLOR },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: TEXT_COLOR_DARK,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
  },
  professoresSectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
    paddingHorizontal: 4,
  },
  professoresSectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  professoresSectionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: TEXT_COLOR_DARK,
    marginLeft: 8,
  },
  professoresVerTodosButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: PRIMARY_COLOR_VERY_LIGHT,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR_LIGHT,
  },
  professoresVerTodosText: {
    fontSize: 13,
    color: PRIMARY_COLOR,
    fontWeight: "600",
    marginRight: 4,
  },
  professoresContainer: {
    backgroundColor: "rgba(106, 13, 173, 0.02)",
    paddingVertical: 15,
    marginHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(106, 13, 173, 0.08)",
  },
  professoresListContent: {
    paddingHorizontal: 15,
  },
  sectionTitleAlt: {
    fontSize: 18,
    fontWeight: "bold",
    color: TEXT_COLOR_DARK,
    marginHorizontal: 0,
    marginTop: 20,
    marginBottom: 15,
  },
  disciplinaCard: {
    alignItems: "center",
    width: width / 4 - 15,
    marginHorizontal: 5,
  },
  disciplinaIconContainer: {
    width: width * 0.19,
    height: width * 0.19,
    borderRadius: (width * 0.19) / 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    elevation: 5,
    shadowColor: BLACK_COLOR,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
  },
  disciplinaNome: {
    fontSize: 11,
    color: TEXT_COLOR_DARK,
    textAlign: "center",
    fontWeight: "500",
  },
  professorIniciais: {
    fontSize: width * 0.08, // Tamanho proporcional ao container
    color: WHITE_COLOR,
    textAlign: "center",
    fontWeight: "bold",
  },
  professorImagemLista: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    position: "absolute",
    top: 0,
    left: 0,
  },
  professorFallbackContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 0, // Inicialmente invisível, será mostrado apenas se a imagem falhar
  },
  professorCard: {
    marginRight: 15,
    width: width * 0.32,
    backgroundColor: WHITE_COLOR,
    borderRadius: 16,
    elevation: 6,
    shadowColor: PRIMARY_COLOR,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    padding: 12,
    borderWidth: 0.5,
    borderColor: PRIMARY_COLOR_VERY_LIGHT,
  },
  professorImageContainer: {
    position: "relative",
    alignItems: "center",
    marginBottom: 8,
  },
  professorImagem: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: width * 0.1,
    borderWidth: 3,
    borderColor: PRIMARY_COLOR_LIGHT,
  },
  professorBadge: {
    position: "absolute",
    bottom: -2,
    right: 8,
    backgroundColor: ACCENT_COLOR,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: WHITE_COLOR,
  },
  professorLetraIcon: {
    position: "absolute",
    top: -4,
    left: -4,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: WHITE_COLOR,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  professorLetraText: {
    fontSize: 16,
    fontWeight: "bold",
    color: WHITE_COLOR,
    textAlign: "center",
  },
  professorInfo: {
    alignItems: "center",
    flex: 1,
  },
  professorNome: {
    fontSize: 14,
    color: TEXT_COLOR_DARK,
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 2,
  },
  professorDisciplina: {
    fontSize: 12,
    color: PRIMARY_COLOR,
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 4,
  },
  professorRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF8E1",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  professorRating: {
    fontSize: 11,
    color: "#F57C00",
    fontWeight: "600",
    marginLeft: 2,
  },
  videoaulaCard: {
    marginRight: 15,
    width: width * 0.7,
    backgroundColor: WHITE_COLOR,
    borderRadius: 12,
    elevation: 3,
    shadowOpacity: 0.15,
    shadowRadius: 4,
    overflow: "hidden",
  },
  videoaulaThumbnail: {
    width: "100%",
    height: height * 0.16,
    backgroundColor: PRIMARY_COLOR_LIGHT,
  },
  videoaulaPlayIconContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  videoaulaTitulo: {
    fontSize: 14,
    fontWeight: "bold",
    color: TEXT_COLOR_DARK,
    paddingHorizontal: 10,
    marginTop: 8,
  },
  videoaulaProfessor: {
    fontSize: 12,
    color: TEXT_COLOR_MUTED,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  screenContainerPadded: {
    flexGrow: 1,
    padding: 15,
    backgroundColor: LIGHT_BG_COLOR,
  },
  screenContainerPaddedPurpleBG: {
    flexGrow: 1,
    padding: 15,
    backgroundColor: LIGHT_BG_COLOR,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: PRIMARY_COLOR,
    marginBottom: 15,
  },
  subtitle: { fontSize: 15, color: TEXT_COLOR_MUTED, marginBottom: 20 },
  materiaItemButton: {
    backgroundColor: WHITE_COLOR,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    elevation: 1,
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  materiaItemIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  materiaItemText: {
    fontSize: 16,
    color: TEXT_COLOR_DARK,
    flex: 1,
    fontWeight: "500",
  },
  conteudoDetalheContainer: {
    flex: 1,
    backgroundColor: LIGHT_BG_COLOR,
    padding: 15,
  },
  resumosScrollContent: {
    paddingBottom: 100,
    flexGrow: 1,
    minHeight: height + 50,
  },
  atividadesScrollContent: {
    paddingBottom: 100,
    flexGrow: 1,
    minHeight: height + 50,
  },
  resumoCard: {
    backgroundColor: WHITE_COLOR,
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 1,
    shadowOpacity: 0.05,
  },
  resumoTitulo: {
    fontSize: 17,
    fontWeight: "bold",
    color: PRIMARY_COLOR,
    marginBottom: 8,
  },
  resumoConteudo: { fontSize: 14, color: TEXT_COLOR_DARK, lineHeight: 21 },
  marcarLidoButton: {
    backgroundColor: ACCENT_COLOR,
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 15,
    alignItems: "center",
  },
  marcarLidoButtonDisabled: { backgroundColor: GREEN_SUCCESS },
  marcarLidoButtonText: {
    color: WHITE_COLOR,
    fontWeight: "bold",
    fontSize: 13,
  },
  atividadeCard: {
    backgroundColor: WHITE_COLOR,
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 1,
    shadowOpacity: 0.05,
  },
  atividadePergunta: {
    fontSize: 15,
    fontWeight: "bold",
    color: TEXT_COLOR_DARK,
    marginBottom: 12,
    lineHeight: 20,
  },
  opcaoButton: {
    backgroundColor: LIGHT_BG_COLOR,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 6,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  opcaoButtonSelected: {
    backgroundColor: PRIMARY_COLOR_LIGHT,
    borderColor: PRIMARY_COLOR,
  },
  opcaoText: { fontSize: 14, color: TEXT_COLOR_DARK },
  opcaoTextSelected: { color: WHITE_COLOR, fontWeight: "500" },
  verificarButton: {
    backgroundColor: ACCENT_COLOR,
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 10,
    alignItems: "center",
  },
  verificarButtonDisabled: { backgroundColor: GREEN_SUCCESS },
  verificarButtonText: { color: WHITE_COLOR, fontWeight: "bold", fontSize: 14 },
  resumosFooterSpace: { height: 30, marginBottom: 20 },
  atividadesFooterSpace: { height: 30, marginBottom: 20 },
  emptyStateText: {
    textAlign: "center",
    color: TEXT_COLOR_MUTED,
    fontSize: 15,
    marginTop: 30,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: LIGHT_BG_COLOR,
    padding: 20,
  },
  placeholderText: {
    fontSize: 20,
    fontWeight: "bold",
    color: TEXT_COLOR_MUTED,
    textAlign: "center",
    marginBottom: 5,
  },
  placeholderSubText: {
    fontSize: 14,
    color: TEXT_COLOR_MUTED,
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: WHITE_COLOR,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    elevation: 2,
    shadowOpacity: 0.1,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, height: 50, fontSize: 16, color: TEXT_COLOR_DARK },
  perfilInfoCard: {
    backgroundColor: WHITE_COLOR,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2.0,
    elevation: 2,
  },
  perfilInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  perfilInfoItemLast: { borderBottomWidth: 0 },
  perfilInfoIcon: { marginRight: 18, width: 24, textAlign: "center" },
  perfilInfoLabel: { fontSize: 16, color: TEXT_COLOR_DARK, flex: 1 },
  perfilInfoValor: { fontSize: 16, fontWeight: "600", color: TEXT_COLOR_DARK },
  perfilActionButton: {
    flexDirection: "row",
    backgroundColor: ACCENT_COLOR,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.0,
    elevation: 3,
  },
  perfilActionButtonIcon: { marginRight: 10 },
  perfilActionButtonText: {
    color: WHITE_COLOR,
    fontSize: 16,
    fontWeight: "bold",
  },

  // Novos estilos para perfil expandido
  perfilHeader: {
    alignItems: "center",
    marginBottom: 25,
  },
  perfilAvatarContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: PRIMARY_COLOR,
    overflow: "hidden",
  },
  perfilAvatar: {
    width: "100%",
    height: "100%",
    borderRadius: 45,
  },
  perfilNome: {
    fontSize: 24,
    fontWeight: "bold",
    color: TEXT_COLOR_DARK,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  perfilMatricula: {
    fontSize: 16,
    color: TEXT_COLOR_MUTED,
    textAlign: "center",
  },
  perfilTurma: {
    fontSize: 14,
    color: PRIMARY_COLOR,
    textAlign: "center",
    fontWeight: "500",
  },
  perfilSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: PRIMARY_COLOR,
    marginBottom: 15,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: PRIMARY_COLOR_LIGHT,
  },
  perfilCampoContainer: {
    marginBottom: 15,
  },
  perfilCampoLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: TEXT_COLOR_DARK,
    marginBottom: 8,
  },
  perfilCampoValor: {
    fontSize: 16,
    color: TEXT_COLOR_DARK_SECONDARY,
    lineHeight: 22,
    paddingVertical: 5,
  },
  perfilCampoInput: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: TEXT_COLOR_DARK,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  perfilCampoInputMultiline: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  perfilBotoesContainer: {
    marginTop: 10,
  },
  perfilBotaoSalvar: {
    backgroundColor: GREEN_SUCCESS,
  },
  perfilBotaoCancelar: {
    backgroundColor: TEXT_COLOR_MUTED,
    marginTop: 10,
  },
  perfilBotaoSair: {
    backgroundColor: RED_ERROR,
    marginTop: 12,
  },
  notasInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: WHITE_COLOR,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  notasInfoLabel: { fontSize: 13, color: "#555" },
  notasInfoValor: { fontWeight: "bold", color: TEXT_COLOR_DARK },
  notasTabelaContainer: {
    backgroundColor: WHITE_COLOR,
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden",
  },
  notasTabelaHeaderRow: {
    flexDirection: "row",
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  notasTabelaHeaderCell: {
    flex: 1,
    color: WHITE_COLOR,
    fontWeight: "bold",
    fontSize: 13,
    textAlign: "center",
  },
  notasTabelaRow: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  notasTabelaCell: {
    flex: 1,
    fontSize: 14,
    color: TEXT_COLOR_DARK,
    textAlign: "center",
  },
  notasBottomContainer: {
    flexDirection: Platform.OS === "web" ? "column" : "row",
    justifyContent: "space-between",
    gap: 10,
  },
  notasBottomCard: {
    flex: 1,
    backgroundColor: WHITE_COLOR,
    borderRadius: 10,
    padding: 15,
    marginBottom: Platform.OS === "web" ? 10 : 0,
  },
  notasBottomCardTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: PRIMARY_COLOR,
    marginBottom: 10,
  },
  notasInfoButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  notasInfoButtonText: { color: WHITE_COLOR, fontSize: 14, fontWeight: "500" },
  notasComentariosInput: {
    backgroundColor: "#F7F7F7",
    borderRadius: 6,
    padding: 10,
    fontSize: 13,
    textAlignVertical: "top",
    minHeight: 80,
    color: TEXT_COLOR_DARK,
  },
  frequenciaCard: {
    backgroundColor: WHITE_COLOR,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  frequenciaNome: { fontSize: 16, fontWeight: "bold", color: TEXT_COLOR_DARK },
  frequenciaTurma: { fontSize: 12, color: "#666" },
  frequenciaCirculo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  frequenciaPercentual: { fontSize: 13, fontWeight: "bold" },

  // Estilos do Cartão do Aluno - Novo Design
  cartaoAlunoCard: {
    backgroundColor: WHITE_COLOR,
    borderRadius: 15,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    overflow: "hidden",
  },
  cartaoAlunoHeader: {
    backgroundColor: PRIMARY_COLOR,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cartaoAlunoSaldoContainer: {
    flex: 1,
  },
  cartaoAlunoSaldoSymbol: {
    color: WHITE_COLOR,
    fontSize: 24,
    fontWeight: "bold",
  },
  cartaoAlunoSaldo: {
    color: WHITE_COLOR,
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 2,
  },
  cartaoAlunoMoedasLabel: {
    color: WHITE_COLOR,
    fontSize: 14,
    opacity: 0.9,
  },
  cartaoAlunoGraduationIcon: {
    width: 50,
    height: 50,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  cartaoAlunoInfoSection: {
    padding: 20,
  },
  cartaoAlunoMatriculaLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  cartaoAlunoMatriculaValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  cartaoAlunoNomeLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  cartaoAlunoNomeValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  cartaoAlunoBotoesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 15,
    gap: 10,
  },
  cartaoAlunoBotao: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  cartaoAlunoBotaoIcon: {
    marginBottom: 8,
  },
  cartaoAlunoBotaoText: {
    color: WHITE_COLOR,
    fontSize: 12,
    fontWeight: "600",
  },
  cartaoAlunoListContainer: {
    marginHorizontal: 20,
    marginTop: 25,
  },
  cartaoAlunoListTitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },
  cartaoAlunoListTitleBold: {
    fontWeight: "bold",
    color: "#333",
  },
  cartaoAlunoDisciplinaItem: {
    backgroundColor: WHITE_COLOR,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 3,
  },
  cartaoAlunoDisciplinaIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  cartaoAlunoDisciplinaInfo: {
    flex: 1,
  },
  cartaoAlunoDisciplinaNome: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  cartaoAlunoDisciplinaMoedas: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  cartaoAlunoProgressBar: {
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    overflow: "hidden",
  },
  cartaoAlunoProgressFill: {
    height: "100%",
    borderRadius: 2,
  },

  notificacaoCard: {
    backgroundColor: WHITE_COLOR,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  notificacaoTexto: {
    fontSize: 13,
    color: TEXT_COLOR_DARK,
    lineHeight: 18,
    flexShrink: 1,
  },
  notificacaoTempo: { fontSize: 11, color: "#777", marginTop: 4 },

  // Estilos para cards informativos de notas (ausências, faltas, ausências justificadas)
  notasCardsContainer: {
    backgroundColor: WHITE_COLOR,
    borderRadius: 12,
    padding: 15,
    marginTop: 20,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notasCardsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  notasCardsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: TEXT_COLOR_DARK,
  },
  notasCardsCloseButton: {
    padding: 5,
  },
  notasCardsEmpty: {
    alignItems: "center",
    padding: 20,
  },
  notasCardsEmptyText: {
    fontSize: 16,
    color: TEXT_COLOR_MUTED,
    textAlign: "center",
  },
  notasInfoCard: {
    backgroundColor: WHITE_COLOR,
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  notasInfoCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  notasInfoCardIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  notasInfoCardData: {
    fontSize: 16,
    fontWeight: "bold",
    color: TEXT_COLOR_DARK,
    marginBottom: 2,
  },
  notasInfoCardDisciplina: {
    fontSize: 14,
    color: TEXT_COLOR_MUTED,
  },
  notasInfoCardMotivo: {
    fontSize: 15,
    color: TEXT_COLOR_DARK,
    marginBottom: 8,
    lineHeight: 20,
  },
  notasInfoCardPeriodo: {
    fontSize: 13,
    color: TEXT_COLOR_MUTED,
    marginBottom: 4,
  },
  notasInfoCardProfessor: {
    fontSize: 13,
    color: TEXT_COLOR_MUTED,
    marginBottom: 4,
  },
  notasInfoCardJustificativa: {
    fontSize: 13,
    color: GREEN_SUCCESS,
    marginTop: 8,
    fontStyle: "italic",
    lineHeight: 18,
  },
  notasInfoCardObservacao: {
    fontSize: 13,
    color: TEXT_COLOR_DARK_SECONDARY,
    marginTop: 8,
    fontStyle: "italic",
    lineHeight: 18,
  },
  notasInfoCardDocumento: {
    fontSize: 13,
    color: PRIMARY_COLOR,
    marginTop: 8,
    fontWeight: "500",
  },

  // Estilos para Loja de Pontos (baseado em 121.jpg)
  lojaPontoItemCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: CARD_BG_COLOR,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 10,
    elevation: 2,
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  lojaPontoIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  lojaPontoInfo: { flex: 1, justifyContent: "center" },
  lojaPontoNome: { fontSize: 15, fontWeight: "bold", color: TEXT_COLOR_DARK },
  lojaPontoDetalhe: { fontSize: 12, color: TEXT_COLOR_MUTED },
  lojaPontoAcao: { alignItems: "flex-end", marginLeft: 10 }, // Alinhado à direita
  lojaPontoPreco: {
    fontSize: 14,
    fontWeight: "bold",
    color: PRIMARY_COLOR,
    marginBottom: 5,
  },
  lojaPontoAddButton: {
    /* Estilo para o botão de adicionar, pode ser um ícone */
  },
  lojaItemIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  lojaCarrinhoResumoContainer: {
    backgroundColor: PRIMARY_COLOR_VERY_LIGHT,
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 8,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  lojaCarrinhoResumoTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: TEXT_COLOR_DARK,
    marginBottom: 10,
  },
  lojaCarrinhoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  lojaCarrinhoItemTexto: { fontSize: 14, color: TEXT_COLOR_DARK_SECONDARY },
  lojaCarrinhoTotalLinha: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#DDD",
  },
  lojaCarrinhoResumoTextoBold: {
    fontSize: 16,
    fontWeight: "bold",
    color: TEXT_COLOR_DARK,
  },
  lojaCarrinhoResumoBotao: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  lojaCarrinhoResumoBotaoTexto: {
    color: WHITE_COLOR,
    fontSize: 16,
    fontWeight: "bold",
  },
  // Estilos para Pagamento e Recibo da Loja (baseados em 123-124.jpg)
  lojaPagamentoScroll: {
    backgroundColor: PRIMARY_COLOR_VERY_LIGHT,
    flexGrow: 1,
    padding: 15,
  },
  lojaPagamentoCard: {
    backgroundColor: WHITE_COLOR,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  lojaPagamentoCardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: TEXT_COLOR_DARK,
    marginBottom: 15,
  },
  lojaPagamentoItemLinha: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  lojaPagamentoItemTexto: { fontSize: 15, color: "#444" },
  lojaPagamentoItemPreco: {
    fontSize: 15,
    color: PRIMARY_COLOR,
    fontWeight: "500",
  },
  lojaPagamentoSeparador: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 10,
  },
  lojaPagamentoTotalTexto: {
    fontSize: 15,
    fontWeight: "bold",
    color: TEXT_COLOR_DARK,
  },
  lojaPagamentoTotalValor: {
    fontSize: 15,
    fontWeight: "bold",
    color: TEXT_COLOR_DARK,
  },
  lojaPagamentoTotalTextoBold: {
    fontSize: 18,
    fontWeight: "bold",
    color: TEXT_COLOR_DARK,
  },
  lojaPagamentoTotalValorBold: {
    fontSize: 18,
    fontWeight: "bold",
    color: PRIMARY_COLOR,
  },
  lojaPagamentoIconeCentral: { alignSelf: "center", marginVertical: 20 },
  lojaPagamentoInfoCartao: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 12,
    padding: 20,
    marginBottom: 25,
    elevation: 3,
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  lojaPagamentoInfoCartaoTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: WHITE_COLOR,
    marginBottom: 10,
  },
  lojaPagamentoInfoCartaoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  lojaPagamentoInfoCartaoSaldo: {
    fontSize: 28,
    fontWeight: "bold",
    color: WHITE_COLOR,
  },
  lojaPagamentoInfoCartaoLabel: { fontSize: 14, color: "#E0E0E0" },
  lojaPagamentoInfoCartaoLabelPequeno: { fontSize: 12, color: "#E0E0E0" },
  lojaPagamentoInfoCartaoValorPequeno: {
    fontSize: 13,
    color: WHITE_COLOR,
    fontWeight: "500",
  },
  lojaPagamentoBotaoComprar: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  lojaPagamentoBotaoComprarDisabled: { backgroundColor: TEXT_COLOR_MUTED },
  lojaPagamentoBotaoComprarTexto: {
    color: WHITE_COLOR,
    fontSize: 16,
    fontWeight: "bold",
  },
  lojaReciboHeader: { alignItems: "center", marginBottom: 10 },
  lojaReciboHeaderText: {
    fontSize: 22,
    fontWeight: "bold",
    color: GREEN_SUCCESS,
    marginBottom: 5,
  },
  lojaReciboSubHeaderText: { fontSize: 16, color: TEXT_COLOR_MUTED },
  resgatarSaldo: {
    fontSize: 16,
    fontWeight: "bold",
    color: WHITE_COLOR,
    backgroundColor: PRIMARY_COLOR,
    padding: 15,
    borderRadius: 10,
    textAlign: "center",
    marginBottom: 20,
  },
  resgatarTarefaCard: {
    backgroundColor: WHITE_COLOR,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    elevation: 1,
    shadowOpacity: 0.05,
  },
  resgatarTarefaIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  resgatarTarefaIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
  },
  resgatarTarefaInfo: { flex: 1 },
  resgatarTarefaMateria: {
    fontSize: 15,
    fontWeight: "bold",
    color: TEXT_COLOR_DARK,
  },
  resgatarTarefaDescricao: {
    fontSize: 13,
    color: TEXT_COLOR_MUTED,
    marginBottom: 5,
  },
  resgatarTarefaRecompensaContainer: {
    backgroundColor: PRIMARY_COLOR_LIGHT,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  resgatarTarefaRecompensa: {
    fontSize: 14,
    fontWeight: "bold",
    color: WHITE_COLOR,
  },
  resgatarTarefaBotao: {
    backgroundColor: ACCENT_COLOR,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  resgatarTarefaBotaoResgatado: { backgroundColor: GREEN_SUCCESS },
  resgatarTarefaBotaoTexto: {
    color: WHITE_COLOR,
    fontWeight: "bold",
    fontSize: 14,
  },

  // Estilos para Detalhes do Professor
  detalhesProfessorContainer: { flex: 1, backgroundColor: LIGHT_BG_COLOR },
  detalhesProfessorScrollContent: {
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 100,
    flexGrow: 1,
    minHeight: height + 200, // Força altura mínima para ativar scroll
  },
  detalhesProfessorHeader: {
    backgroundColor: WHITE_COLOR,
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 15,
    elevation: 2,
    shadowOpacity: 0.1,
  },
  detalhesProfessorImagem: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 4,
    borderColor: PRIMARY_COLOR_LIGHT,
  },
  detalhesProfessorHeaderInfo: { alignItems: "center" },
  detalhesProfessorNome: {
    fontSize: 22,
    fontWeight: "bold",
    color: TEXT_COLOR_DARK,
    textAlign: "center",
    marginBottom: 5,
  },
  detalhesProfessorDisciplina: {
    fontSize: 16,
    color: PRIMARY_COLOR,
    fontWeight: "600",
    marginBottom: 10,
  },
  detalhesProfessorRatingContainer: { alignItems: "center" },
  detalhesProfessorStars: { flexDirection: "row", marginBottom: 5 },
  detalhesProfessorRatingText: { fontSize: 13, color: TEXT_COLOR_MUTED },
  detalhesProfessorCard: {
    backgroundColor: WHITE_COLOR,
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 12,
    padding: 18,
    elevation: 1,
    shadowOpacity: 0.05,
  },
  detalhesProfessorCardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: TEXT_COLOR_DARK,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  detalhesProfessorBio: {
    fontSize: 14,
    color: TEXT_COLOR_DARK,
    lineHeight: 20,
  },
  detalhesProfessorInfoItem: { marginBottom: 12 },
  detalhesProfessorInfoLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: TEXT_COLOR_DARK,
    marginBottom: 4,
  },
  detalhesProfessorInfoValue: {
    fontSize: 14,
    color: TEXT_COLOR_DARK_SECONDARY,
    lineHeight: 18,
  },
  detalhesProfessorContatoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: LIGHT_BG_COLOR,
    borderRadius: 8,
    marginBottom: 8,
  },
  detalhesProfessorContatoText: {
    fontSize: 14,
    color: TEXT_COLOR_DARK,
    marginLeft: 12,
  },
  detalhesProfessorHorarioItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: LIGHT_BG_COLOR,
    borderRadius: 6,
    marginBottom: 6,
  },
  detalhesProfessorHorarioText: {
    fontSize: 14,
    color: TEXT_COLOR_DARK,
    marginLeft: 10,
  },
  detalhesProfessorTurmasContainer: { flexDirection: "row", flexWrap: "wrap" },
  detalhesProfessorTurmaChip: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  detalhesProfessorTurmaText: {
    fontSize: 12,
    color: WHITE_COLOR,
    fontWeight: "600",
  },
  detalhesProfessorProjetoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: LIGHT_BG_COLOR,
    borderRadius: 6,
    marginBottom: 6,
  },
  detalhesProfessorProjetoText: {
    fontSize: 14,
    color: TEXT_COLOR_DARK,
    marginLeft: 10,
  },
  detalhesProfessorFooterSpace: { height: 50, marginBottom: 50 },

  // Estilos para seções adicionais da DetalhesProfessorScreen
  detalhesProfessorAvaliacaoItem: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  detalhesProfessorAvaliacaoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  detalhesProfessorAvaliacaoAluno: {
    fontSize: 14,
    fontWeight: "600",
    color: TEXT_COLOR_DARK,
  },
  detalhesProfessorAvaliacaoTexto: {
    fontSize: 14,
    color: TEXT_COLOR_DARK,
    fontStyle: "italic",
    lineHeight: 18,
  },
  detalhesProfessorRecursoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  detalhesProfessorRecursoText: {
    fontSize: 14,
    color: TEXT_COLOR_DARK,
    marginLeft: 10,
  },

  // Estilos para TodasDisciplinasScreen
  todasDisciplinasContainer: {
    flex: 1,
    backgroundColor: LIGHT_BG_COLOR,
  },
  todasDisciplinasHeader: {
    backgroundColor: WHITE_COLOR,
    padding: 20,
    paddingBottom: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  todasDisciplinasTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: TEXT_COLOR_DARK,
    marginBottom: 5,
  },
  todasDisciplinasSubtitle: {
    fontSize: 16,
    color: TEXT_COLOR_MUTED,
  },
  todasDisciplinasScrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 100,
    flexGrow: 1,
    minHeight: height + 100,
  },
  todasDisciplinasCard: {
    backgroundColor: WHITE_COLOR,
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 2,
  },
  todasDisciplinasIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  todasDisciplinasInfo: {
    flex: 1,
  },
  todasDisciplinasNome: {
    fontSize: 18,
    fontWeight: "600",
    color: TEXT_COLOR_DARK,
    marginBottom: 4,
  },
  todasDisciplinasDescricao: {
    fontSize: 14,
    color: TEXT_COLOR_MUTED,
  },
  todasDisciplinasChevron: {
    marginLeft: 10,
  },

  // Estilos para ProfessoresScreen
  professoresContainer: {
    flex: 1,
    backgroundColor: LIGHT_BG_COLOR,
  },
  professoresHeader: {
    backgroundColor: WHITE_COLOR,
    padding: 20,
    paddingBottom: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  professoresTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: TEXT_COLOR_DARK,
    marginBottom: 5,
  },
  professoresSubtitle: {
    fontSize: 16,
    color: TEXT_COLOR_MUTED,
  },
  professoresScrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 100,
    flexGrow: 1,
    minHeight: height + 100,
  },
  professorCard: {
    backgroundColor: WHITE_COLOR,
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 2,
  },
  professorImageContainer: {
    marginRight: 15,
  },
  professorImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  professorInfo: {
    flex: 1,
  },
  professorNome: {
    fontSize: 18,
    fontWeight: "600",
    color: TEXT_COLOR_DARK,
    marginBottom: 4,
  },
  professorDisciplina: {
    fontSize: 16,
    fontWeight: "500",
    color: PRIMARY_COLOR,
    marginBottom: 2,
  },
  professorExperiencia: {
    fontSize: 14,
    color: TEXT_COLOR_MUTED,
    marginBottom: 4,
  },
  professorRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  professorRating: {
    fontSize: 14,
    color: TEXT_COLOR_MUTED,
    marginLeft: 4,
  },
  professorChevron: {
    marginLeft: 10,
  },

  // Estilo para estado vazio melhorado
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    backgroundColor: LIGHT_BG_COLOR,
  },
  emptyStateSubText: {
    fontSize: 14,
    color: TEXT_COLOR_MUTED,
    textAlign: "center",
    marginTop: 8,
  },

  // Estilos para VideosScreen
  videosContainer: {
    flex: 1,
    backgroundColor: LIGHT_BG_COLOR,
  },
  videosHeader: {
    backgroundColor: WHITE_COLOR,
    padding: 20,
    paddingBottom: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  videosTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: TEXT_COLOR_DARK,
    marginBottom: 5,
  },
  videosSubtitle: {
    fontSize: 16,
    color: TEXT_COLOR_MUTED,
  },
  videosScrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 100,
    flexGrow: 1,
    minHeight: height + 100,
  },
  videoCard: {
    backgroundColor: WHITE_COLOR,
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 2,
  },
  videoThumbnailContainer: {
    position: "relative",
    marginRight: 15,
  },
  videoThumbnail: {
    width: 80,
    height: 60,
    borderRadius: 8,
    backgroundColor: PRIMARY_COLOR,
    justifyContent: "center",
    alignItems: "center",
  },
  videoDuration: {
    position: "absolute",
    bottom: 4,
    right: 4,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  videoDurationText: {
    color: WHITE_COLOR,
    fontSize: 10,
    fontWeight: "bold",
  },
  videoInfo: {
    flex: 1,
  },
  videoTitulo: {
    fontSize: 16,
    fontWeight: "600",
    color: TEXT_COLOR_DARK,
    marginBottom: 4,
  },
  videoProfessor: {
    fontSize: 14,
    color: TEXT_COLOR_MUTED,
  },
  videoChevron: {
    marginLeft: 10,
  },

  // Estilos para NotificacoesScreen
  notificacoesContainer: {
    flex: 1,
    backgroundColor: LIGHT_BG_COLOR,
  },
  notificacoesHeader: {
    backgroundColor: WHITE_COLOR,
    padding: 20,
    paddingBottom: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  notificacoesTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: TEXT_COLOR_DARK,
    marginBottom: 5,
  },
  notificacoesSubtitle: {
    fontSize: 16,
    color: TEXT_COLOR_MUTED,
  },
  notificacoesScrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 100,
    flexGrow: 1,
    minHeight: height + 100,
  },
});
