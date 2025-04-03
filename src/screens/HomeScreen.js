import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
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
import { getPets } from "../services/petfinderApi";

export default function HomeScreen({ navigation }) {
  const [featuredPets, setFeaturedPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar animais em destaque da API
  const fetchFeaturedPets = async () => {
    try {
      setLoading(true);
      setError(null);

      // Parâmetros para a API - limitando a 3 animais para a seção de destaques
      const params = {
        limit: 3,
        page: 1,
        sort: "recent",
        status: "adoptable",
      };

      // Buscar animais da API
      const response = await getPets(params);

      // Mapear os dados da API para o formato do nosso app
      const formattedPets = response.animals
        .filter((pet) => pet.photos && pet.photos.length > 0) // Filtrar apenas pets com fotos
        .map((pet) => ({
          id: pet.id,
          name: pet.name,
          type: pet.type,
          breed: pet.breeds.primary || "Misturado",
          age: pet.age,
          gender: pet.gender === "male" ? "Macho" : "Fêmea",
          image: { uri: pet.photos[0].medium },
          description: pet.description || "Sem descrição disponível.",
          location: pet.contact.address.city + ", " + pet.contact.address.state,
        }));

      setFeaturedPets(formattedPets);
    } catch (err) {
      console.error("Erro ao buscar animais em destaque:", err);
      setError("Não foi possível carregar os animais em destaque.");
    } finally {
      setLoading(false);
    }
  };

  // Carregar dados iniciais
  useEffect(() => {
    fetchFeaturedPets();
  }, []);

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
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#6B4EFF" />
              <Text style={styles.loadingText}>Carregando destaques...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <MaterialCommunityIcons
                name="alert-circle"
                size={50}
                color="#FF6B6B"
              />
              <Text style={styles.errorText}>{error}</Text>
              <Button
                mode="contained"
                onPress={fetchFeaturedPets}
                style={styles.retryButton}
              >
                Tentar Novamente
              </Button>
            </View>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.featuredScroll}
            >
              {featuredPets.map((pet) => (
                <Card key={pet.id} style={styles.featuredCard}>
                  <Card.Cover source={pet.image} style={styles.featuredImage} />
                  <Card.Content>
                    <Title style={styles.petName}>{pet.name}</Title>
                    <Paragraph style={styles.petInfo}>
                      {pet.breed} • {pet.age} • {pet.gender}
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
              ))}
            </ScrollView>
          )}
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
        </View>

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

          <Button
            mode="outlined"
            onPress={() => navigation.navigate("Team")}
            style={styles.teamButton}
            icon="account-group"
          >
            Nossa Equipe
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
    marginBottom: 10,
  },
  teamButton: {
    borderColor: "#6B4EFF",
    width: "100%",
    marginBottom: 30,
  },
  loadingContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    color: "#6B4EFF",
    marginTop: 10,
  },
  errorContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF5F5",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#FF6B6B",
    marginBottom: 20,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#6B4EFF",
    borderRadius: 8,
  },
});
