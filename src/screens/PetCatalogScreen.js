import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  Searchbar,
  Card,
  Title,
  Paragraph,
  Chip,
  Button,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const pets = [
  {
    id: 1,
    name: "Thor",
    type: "Cachorro",
    breed: "Labrador",
    age: "2 anos",
    gender: "Macho",
    image: require("../../assets/images/dog1.png"),
  },
  {
    id: 2,
    name: "Luna",
    type: "Cachorro",
    breed: "Vira-lata",
    age: "1 ano",
    gender: "Fêmea",
    image: require("../../assets/images/dog2.png"),
  },
  // Adicione mais pets conforme necessário
];

export default function PetCatalogScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("Todos");

  const onChangeSearch = (query) => setSearchQuery(query);

  const filteredPets = pets.filter((pet) => {
    const matchesSearch =
      pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "Todos" || pet.type === selectedType;
    return matchesSearch && matchesType;
  });

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
          {["Todos", "Cachorro", "Gato"].map((type) => (
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
                  name="gender-male-female"
                  size={20}
                  color="#6B4EFF"
                />
                <Paragraph style={styles.infoText}>{pet.gender}</Paragraph>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button
                mode="contained"
                onPress={() => navigation.navigate("Formulário")}
                style={styles.adoptButton}
              >
                Quero Adotar
              </Button>
            </Card.Actions>
          </Card>
        ))}
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
    padding: 15,
    backgroundColor: "#FFFFFF",
    elevation: 4,
  },
  searchBar: {
    backgroundColor: "#F8F7FF",
    elevation: 0,
    borderColor: "#6B4EFF",
    borderWidth: 1,
  },
  filterContainer: {
    marginTop: 10,
  },
  filterChip: {
    marginRight: 8,
    backgroundColor: "#F8F7FF",
  },
  selectedChip: {
    backgroundColor: "#6B4EFF",
  },
  chipText: {
    color: "#6B4EFF",
  },
  selectedChipText: {
    color: "#FFFFFF",
  },
  petList: {
    padding: 15,
  },
  petCard: {
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
    elevation: 4,
    borderRadius: 10,
  },
  petImage: {
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  petName: {
    fontSize: 24,
    marginTop: 10,
    color: "#333",
  },
  petInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#666",
  },
  adoptButton: {
    flex: 1,
    marginTop: 10,
    backgroundColor: "#6B4EFF",
    borderRadius: 8,
  },
});
