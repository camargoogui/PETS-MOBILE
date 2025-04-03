import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Card, Title, Paragraph, Button, Chip } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function PetCard({ pet, onAdopt }) {
  return (
    <Card style={styles.card}>
      {pet.image ? (
        <Card.Cover source={pet.image} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <MaterialCommunityIcons name="paw" size={50} color="#6B4EFF" />
          <Paragraph style={styles.noImageText}>Sem foto disponível</Paragraph>
        </View>
      )}
      <Card.Content style={styles.content}>
        <Title style={styles.name}>{pet.name}</Title>
        <View style={styles.chipContainer}>
          <Chip icon="paw" style={styles.chip}>
            {pet.breed}
          </Chip>
          <Chip icon="clock" style={styles.chip}>
            {pet.age}
          </Chip>
        </View>
        <Paragraph style={styles.description}>{pet.description}</Paragraph>
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons
              name="gender-male-female"
              size={20}
              color="#666"
            />
            <Paragraph style={styles.infoText}>{pet.gender}</Paragraph>
          </View>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="scale" size={20} color="#666" />
            <Paragraph style={styles.infoText}>{pet.weight}</Paragraph>
          </View>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="needle" size={20} color="#666" />
            <Paragraph style={styles.infoText}>
              {pet.vaccinated ? "Vacinado" : "Não vacinado"}
            </Paragraph>
          </View>
        </View>
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <Button
          mode="contained"
          onPress={onAdopt}
          style={styles.adoptButton}
          icon="heart"
        >
          Quero Adotar
        </Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    borderRadius: 15,
    elevation: 4,
  },
  image: {
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  content: {
    padding: 15,
  },
  name: {
    fontSize: 24,
    marginBottom: 10,
  },
  chipContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  chip: {
    marginRight: 10,
    backgroundColor: "#F0F0F0",
  },
  description: {
    marginBottom: 15,
    color: "#666",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    marginLeft: 5,
    color: "#666",
  },
  actions: {
    padding: 15,
  },
  adoptButton: {
    flex: 1,
    backgroundColor: "#FF6B6B",
  },
  imagePlaceholder: {
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  noImageText: {
    color: "#666",
  },
});
