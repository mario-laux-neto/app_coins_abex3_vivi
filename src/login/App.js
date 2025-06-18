import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Alert,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import CriarContaApp from '../criar-conta/App.js';
import RedefinirSenhaApp from '../redefinir/App.js';
import AlunoApp from '../aluno/App.js';

// Cores e Constantes (baseadas no app principal)
const PRIMARY_COLOR = "#6A0DAD";
const PRIMARY_COLOR_LIGHT = "#7E3FBF";
const PRIMARY_COLOR_DARK = "#5D0C9B";
const ACCENT_COLOR = "#FFA500";
const WHITE_COLOR = "#FFFFFF";
const BLACK_COLOR = "#000000";
const TEXT_COLOR_DARK = "#333333";
const TEXT_COLOR_LIGHT = "#FFFFFF";
const TEXT_COLOR_MUTED = "#6c757d";
const LIGHT_BG_COLOR = "#F4F0F8";
const GREEN_SUCCESS = "#4CAF50";
const RED_ERROR = "#D32F2F";

const { width, height } = Dimensions.get("window");

// Componente de Login
function LoginScreen({ onNavigateToCadastro, onNavigateToRedefinirSenha, onNavigateToAluno }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!usuario.trim()) {
      Alert.alert("Erro", "Por favor, digite seu usuário ou matrícula.");
      return;
    }

    if (!senha.trim()) {
      Alert.alert("Erro", "Por favor, digite sua senha.");
      return;
    }

    setLoading(true);
      // Simular processo de login
    setTimeout(() => {
      setLoading(false);
        // Validação simples para demo
      if (usuario.toLowerCase() === "lucas" || usuario === "123-456-7890") {
        console.log("Login válido, navegando para aluno..."); // Debug
        // Navegar diretamente para o app do aluno
        if (onNavigateToAluno) {
          onNavigateToAluno();
        } else {
          Alert.alert("Sucesso", "Login realizado! Direcionando...");
        }
      } else {
        Alert.alert("Erro", "Usuário ou senha incorretos.");
      }
    }, 1000);
  };
  const handleEsqueceuSenha = () => {
    if (onNavigateToRedefinirSenha) {
      onNavigateToRedefinirSenha();
    } else {
      Alert.alert(
        "Esqueceu a senha?",
        "Entre em contato com a secretaria da escola para redefinir sua senha.",
        [{ text: "OK" }]
      );
    }
  };
  const handleCadastrar = () => {
    onNavigateToCadastro();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={PRIMARY_COLOR} />
      
      <LinearGradient
        colors={[PRIMARY_COLOR, PRIMARY_COLOR_LIGHT, PRIMARY_COLOR_DARK]}
        style={styles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardContainer}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            {/* Header com ícones decorativos */}
            <View style={styles.headerContainer}>
              <View style={styles.iconsRow}>
                <MaterialCommunityIcons name="school" size={30} color={WHITE_COLOR} />
                <MaterialCommunityIcons name="currency-usd-circle" size={35} color={ACCENT_COLOR} />
                <Ionicons name="school" size={28} color={WHITE_COLOR} />
              </View>
              <View style={styles.iconsRow}>
                <Ionicons name="school" size={25} color={WHITE_COLOR} />
                <MaterialCommunityIcons name="currency-usd-circle" size={40} color={ACCENT_COLOR} />
                <MaterialCommunityIcons name="school" size={32} color={WHITE_COLOR} />
                <Ionicons name="school" size={28} color={WHITE_COLOR} />
              </View>
            </View>

            {/* Formulário de Login */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginTitle}>Login</Text>
              <Text style={styles.loginSubtitle}>Cadastre-se para continuar</Text>

              {/* Campo Usuário */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>USUÁRIO</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="person-outline" size={20} color={TEXT_COLOR_MUTED} style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Matrícula Henkel"
                    placeholderTextColor={TEXT_COLOR_MUTED}
                    value={usuario}
                    onChangeText={setUsuario}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>

              {/* Campo Senha */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>SENHA</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="lock-closed-outline" size={20} color={TEXT_COLOR_MUTED} style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="******"
                    placeholderTextColor={TEXT_COLOR_MUTED}
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry={!senhaVisivel}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    onPress={() => setSenhaVisivel(!senhaVisivel)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons 
                      name={senhaVisivel ? "eye-outline" : "eye-off-outline"} 
                      size={20} 
                      color={PRIMARY_COLOR} 
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Botão Login */}
              <TouchableOpacity
                style={[styles.loginButton, loading && styles.loginButtonDisabled]}
                onPress={handleLogin}
                disabled={loading}
                activeOpacity={0.8}
              >
                {loading ? (
                  <View style={styles.loadingContainer}>
                    <MaterialCommunityIcons name="loading" size={20} color={WHITE_COLOR} />
                    <Text style={styles.loginButtonText}>Entrando...</Text>
                  </View>
                ) : (
                  <Text style={styles.loginButtonText}>Login</Text>
                )}
              </TouchableOpacity>

              {/* Links */}
              <View style={styles.linksContainer}>
                <TouchableOpacity onPress={handleEsqueceuSenha}>
                  <Text style={styles.linkText}>Esqueceu a senha?</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={handleCadastrar}>
                  <Text style={styles.linkTextBold}>Cadastre-se</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Footer decorativo */}
            <View style={styles.footerContainer}>
              <View style={styles.iconsRowBottom}>
                <MaterialCommunityIcons name="currency-usd-circle" size={25} color={ACCENT_COLOR} />
                <Ionicons name="school" size={22} color={WHITE_COLOR} />
                <MaterialCommunityIcons name="school" size={28} color={WHITE_COLOR} />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>    </SafeAreaView>
  );
}

// Componente principal com navegação
export default function LoginApp() {
  const [telaAtual, setTelaAtual] = useState('login'); // 'login', 'cadastro', 'redefinir' ou 'aluno'
  
  console.log("Tela atual:", telaAtual); // Debug

  const navegarParaCadastro = () => {
    setTelaAtual('cadastro');
  };

  const navegarParaLogin = () => {
    setTelaAtual('login');
  };

  const navegarParaRedefinirSenha = () => {
    setTelaAtual('redefinir');
  };
  const navegarParaAluno = () => {
    console.log("Navegando para o app do aluno...");
    setTelaAtual('aluno');
  };

  if (telaAtual === 'cadastro') {
    return <CriarContaApp onNavigateToLogin={navegarParaLogin} />;
  }

  if (telaAtual === 'redefinir') {
    return <RedefinirSenhaApp onNavigateBack={navegarParaLogin} />;
  }  if (telaAtual === 'aluno') {
    console.log("Renderizando AlunoApp"); // Debug
    return <AlunoApp onLogout={navegarParaLogin} />;
  }

  return (
    <LoginScreen 
      onNavigateToCadastro={navegarParaCadastro} 
      onNavigateToRedefinirSenha={navegarParaRedefinirSenha}
      onNavigateToAluno={navegarParaAluno}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 60,
    paddingTop: Platform.OS === "ios" ? 40 : 20,
  },
  iconsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: width * 0.8,
    marginVertical: 8,
  },
  loginContainer: {
    backgroundColor: WHITE_COLOR,
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 35,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 40,
  },
  loginTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: PRIMARY_COLOR,
    textAlign: "center",
    marginBottom: 8,
  },
  loginSubtitle: {
    fontSize: 16,
    color: TEXT_COLOR_MUTED,
    textAlign: "center",
    marginBottom: 35,
  },
  inputContainer: {
    marginBottom: 25,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: TEXT_COLOR_MUTED,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E9ECEF",
    paddingHorizontal: 15,
    height: 55,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: TEXT_COLOR_DARK,
    paddingVertical: 0,
  },
  eyeIcon: {
    padding: 5,
  },
  loginButton: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 12,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowColor: PRIMARY_COLOR,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButtonDisabled: {
    backgroundColor: TEXT_COLOR_MUTED,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  loginButtonText: {
    color: WHITE_COLOR,
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  linksContainer: {
    marginTop: 25,
    alignItems: "center",
  },
  linkText: {
    fontSize: 14,
    color: PRIMARY_COLOR,
    marginBottom: 15,
    textDecorationLine: "underline",
  },
  linkTextBold: {
    fontSize: 16,
    color: PRIMARY_COLOR,
    fontWeight: "bold",
  },
  footerContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  iconsRowBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: width * 0.5,
  },
});
