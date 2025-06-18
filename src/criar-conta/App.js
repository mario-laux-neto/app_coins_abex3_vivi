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
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

// Cores utilizadas (baseadas no padrão do app)
const PRIMARY_COLOR = "#6A0DAD";
const PRIMARY_COLOR_LIGHT = "#7E3FBF";
const PRIMARY_COLOR_DARK = "#5D0C9B";
const ACCENT_COLOR = "#FFA500";
const WHITE_COLOR = "#FFFFFF";
const TEXT_COLOR_DARK = "#333333";
const TEXT_COLOR_MUTED = "#6c757d";
const GREEN_SUCCESS = "#4CAF50";
const RED_ERROR = "#D32F2F";

const { width, height } = Dimensions.get("window");

export default function CriarContaApp({ onNavigateToLogin }) {
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confirmarSenhaVisivel, setConfirmarSenhaVisivel] = useState(false);
  const [loading, setLoading] = useState(false);

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validarData = (data) => {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    return regex.test(data);
  };

  const formatarData = (texto) => {
    // Remove caracteres não numéricos
    const apenasNumeros = texto.replace(/\D/g, '');
    
    // Adiciona as barras automaticamente
    if (apenasNumeros.length <= 2) {
      return apenasNumeros;
    } else if (apenasNumeros.length <= 4) {
      return `${apenasNumeros.slice(0, 2)}/${apenasNumeros.slice(2)}`;
    } else {
      return `${apenasNumeros.slice(0, 2)}/${apenasNumeros.slice(2, 4)}/${apenasNumeros.slice(4, 8)}`;
    }
  };

  const handleCadastro = async () => {
    // Validações
    if (!nome.trim()) {
      Alert.alert("Erro", "Por favor, digite seu nome completo.");
      return;
    }

    if (!dataNascimento.trim()) {
      Alert.alert("Erro", "Por favor, digite sua data de nascimento.");
      return;
    }

    if (!validarData(dataNascimento)) {
      Alert.alert("Erro", "Por favor, digite uma data válida (DD/MM/AAAA).");
      return;
    }

    if (!email.trim()) {
      Alert.alert("Erro", "Por favor, digite seu email.");
      return;
    }

    if (!validarEmail(email)) {
      Alert.alert("Erro", "Por favor, digite um email válido.");
      return;
    }

    if (!senha.trim()) {
      Alert.alert("Erro", "Por favor, digite uma senha.");
      return;
    }

    if (senha.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    setLoading(true);
    
    // Simular processo de cadastro
    setTimeout(() => {
      setLoading(false);
        Alert.alert(
        "Cadastro realizado com sucesso!",
        `Bem-vindo(a), ${nome}! Sua conta foi criada.`,
        [
          {
            text: "Fazer Login",
            onPress: () => {
              if (onNavigateToLogin) {
                onNavigateToLogin();
              } else {
                console.log("Navegando para tela de login...");
              }
            }
          }
        ]
      );
    }, 2000);
  };
  const handleVoltar = () => {
    if (onNavigateToLogin) {
      onNavigateToLogin();
    } else {
      Alert.alert(
        "Voltar",
        "Deseja voltar para a tela de login?",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Sim", onPress: () => console.log("Voltando para login...") }
        ]
      );
    }
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
                <MaterialCommunityIcons name="currency-usd-circle" size={30} color={ACCENT_COLOR} />
                <MaterialCommunityIcons name="school" size={35} color={WHITE_COLOR} />
                <MaterialCommunityIcons name="currency-usd-circle" size={28} color={ACCENT_COLOR} />
              </View>
              <View style={styles.iconsRow}>
                <MaterialCommunityIcons name="school" size={25} color={WHITE_COLOR} />
                <MaterialCommunityIcons name="currency-usd-circle" size={40} color={ACCENT_COLOR} />
                <Ionicons name="school" size={32} color={WHITE_COLOR} />
                <MaterialCommunityIcons name="currency-usd-circle" size={28} color={ACCENT_COLOR} />
              </View>
              <View style={styles.iconsRow}>
                <MaterialCommunityIcons name="currency-usd-circle" size={35} color={ACCENT_COLOR} />
                <Ionicons name="school" size={30} color={WHITE_COLOR} />
                <MaterialCommunityIcons name="currency-usd-circle" size={32} color={ACCENT_COLOR} />
              </View>
            </View>

            {/* Formulário de Cadastro */}
            <View style={styles.cadastroContainer}>
              <Text style={styles.cadastroTitle}>Cadastre-se</Text>
              <Text style={styles.cadastroSubtitle}>Já se cadastrou? Entre aqui!</Text>

              {/* Campo Nome */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>NOME</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="person-outline" size={20} color={TEXT_COLOR_MUTED} style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Guilherme M. Casagrande"
                    placeholderTextColor={TEXT_COLOR_MUTED}
                    value={nome}
                    onChangeText={setNome}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>
              </View>

              {/* Campo Data de Nascimento */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>DATA DE NASCIMENTO</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="calendar-outline" size={20} color={TEXT_COLOR_MUTED} style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="19/06/2003"
                    placeholderTextColor={TEXT_COLOR_MUTED}
                    value={dataNascimento}
                    onChangeText={(texto) => setDataNascimento(formatarData(texto))}
                    keyboardType="numeric"
                    maxLength={10}
                  />
                </View>
              </View>

              {/* Campo Email */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>EMAIL</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="mail-outline" size={20} color={TEXT_COLOR_MUTED} style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="hello@krety.com"
                    placeholderTextColor={TEXT_COLOR_MUTED}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
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
                    placeholder="••••••••"
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

              {/* Campo Confirmar Senha */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>CONFIRMAR SENHA</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="lock-closed-outline" size={20} color={TEXT_COLOR_MUTED} style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="••••••••"
                    placeholderTextColor={TEXT_COLOR_MUTED}
                    value={confirmarSenha}
                    onChangeText={setConfirmarSenha}
                    secureTextEntry={!confirmarSenhaVisivel}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    onPress={() => setConfirmarSenhaVisivel(!confirmarSenhaVisivel)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons 
                      name={confirmarSenhaVisivel ? "eye-outline" : "eye-off-outline"} 
                      size={20} 
                      color={PRIMARY_COLOR} 
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Botão Cadastrar */}
              <TouchableOpacity
                style={[styles.cadastroButton, loading && styles.cadastroButtonDisabled]}
                onPress={handleCadastro}
                disabled={loading}
                activeOpacity={0.8}
              >
                {loading ? (
                  <View style={styles.loadingContainer}>
                    <MaterialCommunityIcons name="loading" size={20} color={WHITE_COLOR} />
                    <Text style={styles.cadastroButtonText}>Cadastrando...</Text>
                  </View>
                ) : (
                  <Text style={styles.cadastroButtonText}>Cadastre-se</Text>
                )}
              </TouchableOpacity>

              {/* Link para Login */}
              <View style={styles.linksContainer}>
                <TouchableOpacity onPress={handleVoltar}>
                  <Text style={styles.linkText}>Já tem conta? <Text style={styles.linkTextBold}>Faça login</Text></Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Footer decorativo */}
            <View style={styles.footerContainer}>
              <View style={styles.iconsRowBottom}>
                <MaterialCommunityIcons name="currency-usd-circle" size={25} color={ACCENT_COLOR} />
                <Ionicons name="school" size={22} color={WHITE_COLOR} />
                <MaterialCommunityIcons name="currency-usd-circle" size={28} color={ACCENT_COLOR} />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
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
    paddingVertical: 30,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 40,
    paddingTop: Platform.OS === "ios" ? 20 : 10,
  },
  iconsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: width * 0.8,
    marginVertical: 6,
  },
  cadastroContainer: {
    backgroundColor: WHITE_COLOR,
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 20,
  },
  cadastroTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: PRIMARY_COLOR,
    textAlign: "center",
    marginBottom: 8,
  },
  cadastroSubtitle: {
    fontSize: 16,
    color: TEXT_COLOR_MUTED,
    textAlign: "center",
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
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
    height: 50,
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
  cadastroButton: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 12,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    shadowColor: PRIMARY_COLOR,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  cadastroButtonDisabled: {
    backgroundColor: TEXT_COLOR_MUTED,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cadastroButtonText: {
    color: WHITE_COLOR,
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  linksContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  linkText: {
    fontSize: 14,
    color: TEXT_COLOR_MUTED,
    textAlign: "center",
  },
  linkTextBold: {
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
    width: width * 0.4,
  },
});
