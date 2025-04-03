import React from "react";
import { View, ScrollView, Image, StyleSheet } from "react-native";
import {
  Text,
  Card,
  Title,
  Paragraph,
  Button,
  Divider,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor="#6B4EFF" />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("../../assets/images/pet1.png")}
            style={styles.headerImage}
          />
          <Title style={styles.headerTitle}>Bem-vindo ao ADOTA PET</Title>
          <Paragraph style={styles.headerSubtitle}>
            Encontre seu novo melhor amigo
          </Paragraph>
        </View>

        <View style={styles.featuredSection}>
          <Title style={styles.sectionTitle}>Destaques da Semana</Title>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.featuredScroll}
          >
            <Card style={styles.featuredCard}>
              <Card.Cover
                source={require("../../assets/images/dog1.png")}
                style={styles.featuredImage}
              />
              <Card.Content>
                <Title style={styles.petName}>Thor</Title>
                <Paragraph style={styles.petInfo}>
                  Labrador • 2 anos • Macho
                </Paragraph>
                <Button
                  mode="contained"
                  onPress={() => navigation.navigate("Formulário")}
                  style={styles.adoptButton}
                >
                  Quero Adotar
                </Button>
              </Card.Content>
            </Card>
            <Card style={styles.featuredCard}>
              <Card.Cover
                source={require("../../assets/images/dog2.png")}
                style={styles.featuredImage}
              />
              <Card.Content>
                <Title style={styles.petName}>Luna</Title>
                <Paragraph style={styles.petInfo}>
                  Vira-lata • 1 ano • Fêmea
                </Paragraph>
                <Button
                  mode="contained"
                  onPress={() => navigation.navigate("Formulário")}
                  style={styles.adoptButton}
                >
                  Quero Adotar
                </Button>
              </Card.Content>
            </Card>
          </ScrollView>
        </View>

        <View style={styles.navigationSection}>
          <Card
            style={styles.navCard}
            onPress={() => navigation.navigate("Catalog")}
          >
            <Card.Content>
              <MaterialCommunityIcons name="paw" size={40} color="#6B4EFF" />
              <Title style={styles.navTitle}>Ver Catálogo</Title>
              <Paragraph style={styles.navText}>
                Conheça todos os pets disponíveis para adoção
              </Paragraph>
            </Card.Content>
          </Card>

          <Card
            style={styles.navCard}
            onPress={() => navigation.navigate("Tips")}
          >
            <Card.Content>
              <MaterialCommunityIcons
                name="book-open-variant"
                size={40}
                color="#6B4EFF"
              />
              <Title style={styles.navTitle}>Dicas e Cuidados</Title>
              <Paragraph style={styles.navText}>
                Aprenda como cuidar do seu novo amigo
              </Paragraph>
            </Card.Content>
          </Card>

          <Card
            style={styles.navCard}
            onPress={() => navigation.navigate("Formulário")}
          >
            <Card.Content>
              <MaterialCommunityIcons name="heart" size={40} color="#6B4EFF" />
              <Title style={styles.navTitle}>Quero Adotar</Title>
              <Paragraph style={styles.navText}>
                Preencha o formulário de adoção
              </Paragraph>
            </Card.Content>
          </Card>
        </View>

        <View style={styles.infoSection}>
          <Title style={styles.sectionTitle}>Por que adotar?</Title>
          <Card style={styles.infoCard}>
            <Card.Content>
              <View style={styles.infoItem}>
                <MaterialCommunityIcons
                  name="heart"
                  size={24}
                  color="#6B4EFF"
                />
                <Paragraph style={styles.infoText}>
                  Amor incondicional e companhia
                </Paragraph>
              </View>
              <View style={styles.infoItem}>
                <MaterialCommunityIcons
                  name="home-heart"
                  size={24}
                  color="#6B4EFF"
                />
                <Paragraph style={styles.infoText}>
                  Um lar amoroso para um pet
                </Paragraph>
              </View>
              <View style={styles.infoItem}>
                <MaterialCommunityIcons
                  name="hand-heart"
                  size={24}
                  color="#6B4EFF"
                />
                <Paragraph style={styles.infoText}>
                  Faça a diferença na vida de um animal
                </Paragraph>
              </View>
            </Card.Content>
          </Card>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.statsSection}>
          <Card style={styles.statsCard}>
            <Card.Content>
              <View style={styles.statItem}>
                <MaterialCommunityIcons name="paw" size={32} color="#6B4EFF" />
                <Title style={styles.statNumber}>500+</Title>
                <Paragraph style={styles.statLabel}>Pets Adotados</Paragraph>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <MaterialCommunityIcons
                  name="home-heart"
                  size={32}
                  color="#6B4EFF"
                />
                <Title style={styles.statNumber}>450+</Title>
                <Paragraph style={styles.statLabel}>Famílias Felizes</Paragraph>
              </View>
            </Card.Content>
          </Card>
        </View>

        <View style={styles.contactSection}>
          <Button
            mode="contained"
            onPress={() => {}}
            style={styles.contactButton}
            icon="phone"
          >
            Fale Conosco
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#6B4EFF",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 4,
  },
  headerImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 75,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
  },
  featuredSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  featuredScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  featuredCard: {
    width: 250,
    marginRight: 15,
    backgroundColor: "#FFFFFF",
  },
  featuredImage: {
    height: 150,
  },
  petName: {
    fontSize: 20,
    color: "#333",
    marginTop: 10,
  },
  petInfo: {
    color: "#666",
    marginBottom: 10,
  },
  adoptButton: {
    backgroundColor: "#6B4EFF",
    borderRadius: 8,
  },
  navigationSection: {
    padding: 20,
  },
  navCard: {
    marginBottom: 15,
    elevation: 4,
    borderRadius: 10,
  },
  navTitle: {
    fontSize: 18,
    color: "#333",
    marginTop: 10,
  },
  navText: {
    color: "#666",
  },
  infoSection: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    margin: 20,
    borderRadius: 15,
  },
  infoCard: {
    margin: 15,
    borderRadius: 10,
    elevation: 4,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  divider: {
    backgroundColor: "#E0E0E0",
    height: 1,
    marginHorizontal: 20,
  },
  statsSection: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    borderRadius: 15,
  },
  statsCard: {
    margin: 15,
    borderRadius: 10,
    elevation: 4,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statDivider: {
    width: 1,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 20,
  },
  statNumber: {
    fontSize: 24,
    color: "#333",
    marginTop: 5,
  },
  statLabel: {
    color: "#666",
    textAlign: "center",
  },
  contactSection: {
    padding: 20,
    alignItems: "center",
  },
  contactButton: {
    backgroundColor: "#6B4EFF",
    width: "100%",
    marginTop: 10,
    marginBottom: 30,
  },
});
