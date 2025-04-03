import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import {
  TextInput,
  Button,
  Title,
  Paragraph,
  Card,
  RadioButton,
  Text,
  Checkbox,
} from "react-native-paper";

export default function AdoptionFormScreen({ navigation }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    houseType: "",
    hasOtherPets: false,
    experience: "",
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    // Remove caracteres não numéricos
    const cleanPhone = phone.replace(/\D/g, "");
    return cleanPhone.length >= 10 && cleanPhone.length <= 11;
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert(
        "Campo Obrigatório",
        "Por favor, preencha seu nome completo para continuar.",
        [{ text: "OK" }]
      );
      return false;
    }

    if (!formData.email.trim()) {
      Alert.alert(
        "Campo Obrigatório",
        "Por favor, preencha seu e-mail para continuar.",
        [{ text: "OK" }]
      );
      return false;
    }

    if (!validateEmail(formData.email)) {
      Alert.alert(
        "E-mail Inválido",
        "Por favor, insira um endereço de e-mail válido.",
        [{ text: "OK" }]
      );
      return false;
    }

    if (!formData.phone.trim()) {
      Alert.alert(
        "Campo Obrigatório",
        "Por favor, preencha seu telefone para continuar.",
        [{ text: "OK" }]
      );
      return false;
    }

    if (!validatePhone(formData.phone)) {
      Alert.alert(
        "Telefone Inválido",
        "Por favor, insira um número de telefone válido com DDD.",
        [{ text: "OK" }]
      );
      return false;
    }

    if (!formData.address.trim()) {
      Alert.alert(
        "Campo Obrigatório",
        "Por favor, preencha seu endereço completo para continuar.",
        [{ text: "OK" }]
      );
      return false;
    }

    if (!formData.houseType) {
      Alert.alert(
        "Campo Obrigatório",
        "Por favor, selecione o tipo de sua residência para continuar.",
        [{ text: "OK" }]
      );
      return false;
    }

    if (!formData.experience.trim()) {
      Alert.alert(
        "Campo Obrigatório",
        "Por favor, conte-nos sobre sua experiência com pets para continuar.",
        [{ text: "OK" }]
      );
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Aqui você implementaria a lógica de envio do formulário
      console.log("Formulário enviado:", formData);
      Alert.alert(
        "Sucesso! 🎉",
        "Seu formulário foi enviado com sucesso! Entraremos em contato em breve para dar continuidade ao processo de adoção.",
        [
          {
            text: "OK",
            onPress: () => {
              // Resetar a pilha de navegação para evitar que o usuário volte para o formulário
              navigation.reset({
                index: 0,
                routes: [{ name: "MainTabs", params: { screen: "Home" } }],
              });
            },
          },
        ]
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.headerCard}>
        <Card.Content>
          <Title style={styles.headerTitle}>Formulário de Adoção</Title>
          <Paragraph style={styles.headerText}>
            Preencha o formulário abaixo para iniciar o processo de adoção.
            Avaliaremos suas informações com carinho.
          </Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.formCard}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Informações Pessoais</Title>

          <TextInput
            label="Nome Completo"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            style={styles.input}
            mode="outlined"
            outlineColor="#6B4EFF"
            activeOutlineColor="#6B4EFF"
          />

          <TextInput
            label="E-mail"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            style={styles.input}
            mode="outlined"
            outlineColor="#6B4EFF"
            activeOutlineColor="#6B4EFF"
            keyboardType="email-address"
          />

          <TextInput
            label="Telefone"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            style={styles.input}
            mode="outlined"
            outlineColor="#6B4EFF"
            activeOutlineColor="#6B4EFF"
            keyboardType="phone-pad"
          />

          <TextInput
            label="Endereço Completo"
            value={formData.address}
            onChangeText={(text) => setFormData({ ...formData, address: text })}
            style={styles.input}
            mode="outlined"
            outlineColor="#6B4EFF"
            activeOutlineColor="#6B4EFF"
            multiline
          />
        </Card.Content>
      </Card>

      <Card style={styles.formCard}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Ambiente e Experiência</Title>

          <Text style={styles.label}>Tipo de Residência:</Text>
          <RadioButton.Group
            onValueChange={(value) =>
              setFormData({ ...formData, houseType: value })
            }
            value={formData.houseType}
          >
            <View style={styles.radioOption}>
              <RadioButton.Item
                label="Casa"
                value="casa"
                color="#6B4EFF"
                labelStyle={styles.radioLabel}
              />
            </View>
            <View style={styles.radioOption}>
              <RadioButton.Item
                label="Apartamento"
                value="apartamento"
                color="#6B4EFF"
                labelStyle={styles.radioLabel}
              />
            </View>
          </RadioButton.Group>

          <View style={styles.checkboxContainer}>
            <Checkbox.Item
              label="Possui outros animais de estimação?"
              status={formData.hasOtherPets ? "checked" : "unchecked"}
              onPress={() =>
                setFormData({
                  ...formData,
                  hasOtherPets: !formData.hasOtherPets,
                })
              }
              color="#6B4EFF"
              labelStyle={styles.checkboxLabel}
            />
          </View>

          <TextInput
            label="Experiência com Pets"
            value={formData.experience}
            onChangeText={(text) =>
              setFormData({ ...formData, experience: text })
            }
            style={styles.input}
            mode="outlined"
            outlineColor="#6B4EFF"
            activeOutlineColor="#6B4EFF"
            multiline
            numberOfLines={4}
          />
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.submitButton}
          labelStyle={styles.buttonLabel}
        >
          Enviar Formulário
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  headerCard: {
    margin: 15,
    backgroundColor: "#6B4EFF",
    elevation: 4,
    borderRadius: 10,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    marginBottom: 10,
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  formCard: {
    margin: 15,
    marginTop: 0,
    backgroundColor: "#FFFFFF",
    elevation: 4,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 20,
    color: "#333",
    marginBottom: 15,
  },
  input: {
    marginBottom: 15,
    backgroundColor: "#F8F7FF",
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  radioOption: {
    backgroundColor: "#F8F7FF",
    marginBottom: 8,
    borderRadius: 8,
  },
  radioLabel: {
    color: "#333",
  },
  checkboxContainer: {
    marginVertical: 15,
  },
  checkboxLabel: {
    color: "#333",
    fontSize: 16,
  },
  buttonContainer: {
    margin: 15,
  },
  submitButton: {
    backgroundColor: "#6B4EFF",
    padding: 5,
    borderRadius: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
