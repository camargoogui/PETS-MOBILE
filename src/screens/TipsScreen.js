import React from "react";
import { ScrollView, StyleSheet, Linking } from "react-native";
import { Card, Title, Paragraph, Button, List } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const tips = [
  {
    title: "Preparação para Adoção",
    icon: "home-heart",
    items: [
      "Prepare um espaço adequado para o pet",
      "Tenha os itens básicos (cama, potes, brinquedos)",
      "Pesquise sobre a raça ou tipo do animal",
    ],
  },
  {
    title: "Cuidados Básicos",
    icon: "paw",
    items: [
      "Mantenha as vacinas em dia",
      "Alimentação adequada e água fresca",
      "Exercícios e passeios regulares",
    ],
  },
  {
    title: "Saúde e Bem-estar",
    icon: "heart-pulse",
    items: [
      "Visitas regulares ao veterinário",
      "Higiene e banho quando necessário",
      "Prevenção de pulgas e carrapatos",
    ],
  },
];

export default function TipsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.headerCard}>
        <Card.Content>
          <Title style={styles.headerTitle}>Guia de Cuidados</Title>
          <Paragraph style={styles.headerText}>
            Adotar um pet é uma decisão importante. Confira nossas dicas para
            garantir uma vida feliz para seu novo amigo.
          </Paragraph>
        </Card.Content>
      </Card>

      {tips.map((tip, index) => (
        <Card key={index} style={styles.tipCard}>
          <Card.Content>
            <Title style={styles.tipTitle}>
              <MaterialCommunityIcons
                name={tip.icon}
                size={24}
                color="#6B4EFF"
              />{" "}
              {tip.title}
            </Title>
            <List.Section>
              {tip.items.map((item, itemIndex) => (
                <List.Item
                  key={itemIndex}
                  title={item}
                  titleStyle={styles.listItemTitle}
                  left={(props) => (
                    <List.Icon {...props} icon="check-circle" color="#6B4EFF" />
                  )}
                  style={styles.listItem}
                />
              ))}
            </List.Section>
          </Card.Content>
        </Card>
      ))}

      <Card style={styles.resourcesCard}>
        <Card.Content>
          <Title style={styles.resourcesTitle}>Recursos Adicionais</Title>
          <Paragraph style={styles.resourcesText}>
            Acesse mais informações sobre cuidados com pets em nossos parceiros.
          </Paragraph>
          <Button
            mode="contained"
            onPress={() => Linking.openURL("https://www.adotepet.org")}
            style={styles.button}
            icon="web"
          >
            Visitar Site Parceiro
          </Button>
        </Card.Content>
      </Card>
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
    borderRadius: 10,
    backgroundColor: "#6B4EFF",
    elevation: 4,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 24,
    marginBottom: 10,
  },
  headerText: {
    color: "#fff",
    fontSize: 16,
  },
  tipCard: {
    margin: 15,
    marginTop: 0,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    elevation: 4,
  },
  tipTitle: {
    fontSize: 20,
    marginBottom: 10,
    color: "#333",
  },
  listItem: {
    backgroundColor: "#F8F7FF",
    borderRadius: 8,
    marginBottom: 8,
  },
  listItemTitle: {
    color: "#333",
    fontSize: 16,
  },
  resourcesCard: {
    margin: 15,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    elevation: 4,
  },
  resourcesTitle: {
    fontSize: 20,
    color: "#333",
    marginBottom: 10,
  },
  resourcesText: {
    color: "#666",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#6B4EFF",
    marginTop: 10,
    borderRadius: 8,
  },
});
