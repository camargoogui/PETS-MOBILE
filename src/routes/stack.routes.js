import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import PetCatalogScreen from "../screens/PetCatalogScreen";
import AdoptionFormScreen from "../screens/AdoptionFormScreen";
import TipsScreen from "../screens/TipsScreen";

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FF6B6B",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "PetAdopt",
        }}
      />
      <Stack.Screen
        name="Catálogo"
        component={PetCatalogScreen}
        options={{
          title: "Nossos Pets",
        }}
      />
      <Stack.Screen
        name="Formulário"
        component={AdoptionFormScreen}
        options={{
          title: "Formulário de Adoção",
        }}
      />
      <Stack.Screen
        name="Dicas"
        component={TipsScreen}
        options={{
          title: "Dicas e Cuidados",
        }}
      />
    </Stack.Navigator>
  );
}
