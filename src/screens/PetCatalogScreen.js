import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import {
  Searchbar,
  Card,
  Title,
  Paragraph,
  Chip,
  Button,
  Text,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getPets, getAnimalTypes } from "../services/petfinderApi";

export default function PetCatalogScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("Todos");
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [animalTypes, setAnimalTypes] = useState(["Todos", "Cachorro", "Gato"]);

  // Função para buscar animais da API
  const fetchPets = async (type = null) => {
    try {
      setLoading(true);
      setError(null);

      // Parâmetros para a API
      const params = {
        limit: 20,
        page: 1,
        sort: "recent",
        status: "adoptable",
      };

      // Adicionar tipo de animal se selecionado
      if (type && type !== "Todos") {
        params.type = type.toLowerCase();
      }

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
          url: pet.url,
        }));

      setPets(formattedPets);
    } catch (err) {
      console.error("Erro ao buscar animais:", err);
      setError("Não foi possível carregar os animais da API.");
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar tipos de animais da API
  const fetchAnimalTypes = async () => {
    try {
      const response = await getAnimalTypes();
      const types = ["Todos", ...response.types.map((type) => type.name)];
      setAnimalTypes(types);
    } catch (err) {
      console.error("Erro ao buscar tipos de animais:", err);
    }
  };

  // Função para atualizar os dados (pull-to-refresh)
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPets(selectedType !== "Todos" ? selectedType : null);
    setRefreshing(false);
  };

  // Carregar dados iniciais
  useEffect(() => {
    fetchAnimalTypes();
    fetchPets();
  }, []);

  // Atualizar animais quando o tipo selecionado mudar
  useEffect(() => {
    if (animalTypes.length > 0) {
      fetchPets(selectedType !== "Todos" ? selectedType : null);
    }
  }, [selectedType]);

  const onChangeSearch = (query) => setSearchQuery(query);

  // Filtrar animais com base na pesquisa
  const filteredPets = pets.filter((pet) => {
    return (
      pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Renderizar o conteúdo com base no estado de carregamento
  const renderContent = () => {
    if (loading && !refreshing) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6B4EFF" />
          <Text style={styles.loadingText}>Carregando animais...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <MaterialCommunityIcons
            name="alert-circle"
            size={50}
            color="#FF6B6B"
          />
          <Text style={styles.errorText}>{error}</Text>
          <Button
            mode="contained"
            onPress={() =>
              fetchPets(selectedType !== "Todos" ? selectedType : null)
            }
            style={styles.retryButton}
          >
            Tentar Novamente
          </Button>
        </View>
      );
    }

    if (filteredPets.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="paw-off" size={50} color="#6B4EFF" />
          <Text style={styles.emptyText}>
            Nenhum animal encontrado. Tente outra busca.
          </Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.petList}>
        {filteredPets.map((pet) => (
          <Card key={pet.id} style={styles.petCard}>
            <Card.Cover source={pet.image} style={styles.petImage} />
            <Card.Content>
              <Title style={styles.petName}>{pet.name}</Title>
              <View style={styles.petInfo}>
                <MaterialCommunityIcons name="paw" size={20} color="#6B4EFF" />
                <Paragraph style={styles.infoText}>
                  {pet.breed} • {pet.age}
                </Paragraph>
              </View>
              <View style={styles.petInfo}>
                <MaterialCommunityIcons
                  name={
                    pet.gender === "Macho" ? "gender-male" : "gender-female"
                  }
                  size={20}
                  color="#6B4EFF"
                />
                <Paragraph style={styles.infoText}>{pet.gender}</Paragraph>
              </View>
              <View style={styles.petInfo}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={20}
                  color="#6B4EFF"
                />
                <Paragraph style={styles.infoText}>{pet.location}</Paragraph>
              </View>
              <Paragraph style={styles.description} numberOfLines={3}>
                {pet.description}
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
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Searchbar
          placeholder="Buscar pets..."
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
          iconColor="#6B4EFF"
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
        >
          {animalTypes.map((type) => (
            <Chip
              key={type}
              selected={selectedType === type}
              onPress={() => setSelectedType(type)}
              style={[
                styles.filterChip,
                selectedType === type && styles.selectedChip,
              ]}
              textStyle={[
                styles.chipText,
                selectedType === type && styles.selectedChipText,
              ]}
            >
              {type}
            </Chip>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {renderContent()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    elevation: 4,
  },
  searchBar: {
    marginBottom: 10,
    elevation: 0,
    backgroundColor: "#F5F5F5",
  },
  filterContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  filterChip: {
    marginRight: 8,
    backgroundColor: "#F5F5F5",
  },
  selectedChip: {
    backgroundColor: "#6B4EFF",
  },
  chipText: {
    color: "#666",
  },
  selectedChipText: {
    color: "#FFFFFF",
  },
  contentContainer: {
    flex: 1,
  },
  petList: {
    padding: 16,
  },
  petCard: {
    marginBottom: 16,
    elevation: 4,
    borderRadius: 10,
  },
  petImage: {
    height: 200,
  },
  petName: {
    fontSize: 20,
    marginTop: 10,
  },
  petInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  infoText: {
    marginLeft: 8,
    color: "#666",
  },
  description: {
    marginTop: 10,
    color: "#666",
  },
  adoptButton: {
    marginTop: 15,
    backgroundColor: "#6B4EFF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: "#FF6B6B",
    textAlign: "center",
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: "#6B4EFF",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});
