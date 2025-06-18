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

export default function RedefinirSenhaApp({ onNavigateBack }) {
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState("");
  const [senhaAtualVisivel, setSenhaAtualVisivel] = useState(false);
  const [novaSenhaVisivel, setNovaSenhaVisivel] = useState(false);
  const [confirmarNovaSenhaVisivel, setConfirmarNovaSenhaVisivel] = useState(false);
  const [loading, setLoading] = useState(false);

  const validarSenhas = () => {
    if (!senhaAtual.trim()) {
      Alert.alert("Erro", "Por favor, digite sua senha atual.");
      return false;
    }

    if (!novaSenha.trim()) {
      Alert.alert("Erro", "Por favor, digite a nova senha.");
      return false;
    }

    if (novaSenha.length < 6) {
      Alert.alert("Erro", "A nova senha deve ter pelo menos 6 caracteres.");
      return false;
    }

    if (novaSenha !== confirmarNovaSenha) {
      Alert.alert("Erro", "A confirmação da nova senha não confere.");
      return false;
    }

    if (senhaAtual === novaSenha) {
      Alert.alert("Erro", "A nova senha deve ser diferente da senha atual.");
      return false;
    }

    return true;
  };

  const handleRedefinirSenha = async () => {
    if (!validarSenhas()) {
      return;
    }

    setLoading(true);
    
    // Simular processo de redefinição de senha
    setTimeout(() => {
      setLoading(false);
      
      // Validação simples da senha atual (mockada)
      if (senhaAtual !== "123456") {
        Alert.alert("Erro", "Senha atual incorreta.");
        return;
      }
      
      Alert.alert(
        "Senha alterada com sucesso!",
        "Sua senha foi redefinida. Use a nova senha no próximo login.",
        [
          {
            text: "OK",
            onPress: () => {
              // Limpar campos
              setSenhaAtual("");
              setNovaSenha("");
              setConfirmarNovaSenha("");
              
              // Navegar de volta se callback disponível
              if (onNavigateBack) {
                onNavigateBack();
              }
            }
          }
        ]
      );
    }, 2000);
  };

  const handleVoltar = () => {
    if (onNavigateBack) {
      onNavigateBack();
    } else {
      Alert.alert(
        "Voltar",
        "Deseja voltar sem salvar as alterações?",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Sim", onPress: () => console.log("Voltando...") }
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

            {/* Formulário de Redefinir Senha */}
            <View style={styles.redefinirContainer}>
              <Text style={styles.redefinirTitle}>Crie uma{'\n'}nova senha</Text>

              {/* Campo Senha Atual */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>SENHA ATUAL</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="lock-closed-outline" size={20} color={TEXT_COLOR_MUTED} style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="••••••"
                    placeholderTextColor={TEXT_COLOR_MUTED}
                    value={senhaAtual}
                    onChangeText={setSenhaAtual}
                    secureTextEntry={!senhaAtualVisivel}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    onPress={() => setSenhaAtualVisivel(!senhaAtualVisivel)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons 
                      name={senhaAtualVisivel ? "eye-outline" : "eye-off-outline"} 
                      size={20} 
                      color={PRIMARY_COLOR} 
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Campo Nova Senha */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>NOVA SENHA</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="lock-closed-outline" size={20} color={TEXT_COLOR_MUTED} style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="••••••"
                    placeholderTextColor={TEXT_COLOR_MUTED}
                    value={novaSenha}
                    onChangeText={setNovaSenha}
                    secureTextEntry={!novaSenhaVisivel}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    onPress={() => setNovaSenhaVisivel(!novaSenhaVisivel)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons 
                      name={novaSenhaVisivel ? "eye-outline" : "eye-off-outline"} 
                      size={20} 
                      color={PRIMARY_COLOR} 
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Campo Confirmar Nova Senha */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>CONFIRME NOVA SENHA</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="lock-closed-outline" size={20} color={TEXT_COLOR_MUTED} style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="••••••"
                    placeholderTextColor={TEXT_COLOR_MUTED}
                    value={confirmarNovaSenha}
                    onChangeText={setConfirmarNovaSenha}
                    secureTextEntry={!confirmarNovaSenhaVisivel}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    onPress={() => setConfirmarNovaSenhaVisivel(!confirmarNovaSenhaVisivel)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons 
                      name={confirmarNovaSenhaVisivel ? "eye-outline" : "eye-off-outline"} 
                      size={20} 
                      color={PRIMARY_COLOR} 
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Botão Confirmar */}
              <TouchableOpacity
                style={[styles.redefinirButton, loading && styles.redefinirButtonDisabled]}
                onPress={handleRedefinirSenha}
                disabled={loading}
                activeOpacity={0.8}
              >
                {loading ? (
                  <View style={styles.loadingContainer}>
                    <MaterialCommunityIcons name="loading" size={20} color={WHITE_COLOR} />
                    <Text style={styles.redefinirButtonText}>Processando...</Text>
                  </View>
                ) : (
                  <Text style={styles.redefinirButtonText}>Confirmar</Text>
                )}
              </TouchableOpacity>

              {/* Link para Voltar */}
              <View style={styles.linksContainer}>
                <TouchableOpacity onPress={handleVoltar}>
                  <Text style={styles.linkText}>← Voltar</Text>
                </TouchableOpacity>
              </View>

              {/* Dica de segurança */}
              <View style={styles.infoContainer}>
                <MaterialCommunityIcons name="shield-check" size={20} color={GREEN_SUCCESS} />
                <Text style={styles.infoText}>
                  Use "123456" como senha atual para testar
                </Text>
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
  redefinirContainer: {
    backgroundColor: WHITE_COLOR,
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 35,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 20,
  },
  redefinirTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: PRIMARY_COLOR,
    textAlign: "center",
    marginBottom: 35,
    lineHeight: 34,
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
  redefinirButton: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 12,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    shadowColor: PRIMARY_COLOR,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  redefinirButtonDisabled: {
    backgroundColor: TEXT_COLOR_MUTED,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  redefinirButtonText: {
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
    fontSize: 16,
    color: PRIMARY_COLOR,
    fontWeight: "500",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E8",
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: GREEN_SUCCESS,
  },
  infoText: {
    color: GREEN_SUCCESS,
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 10,
    flex: 1,
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
