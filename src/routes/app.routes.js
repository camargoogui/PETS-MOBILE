import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabRoutes from "./index";
import AdoptionFormScreen from "../screens/AdoptionFormScreen";

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#6B4EFF",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 22,
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={TabRoutes}
        options={{
          title: "ADOTA PET",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Formulário"
        component={AdoptionFormScreen}
        options={{
          title: "Formulário de Adoção",
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}
