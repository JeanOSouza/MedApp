import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius } from "../theme";

import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import CadastroScreen from "../screens/CadastroScreen";
import Cadastro2Screen from "../screens/Cadastro2Screen";
import HomeScreen from "../screens/HomeScreen";
import HistoricoScreen from "../screens/HistoricoScreen";
import CadastroMedicamentoScreen from "../screens/CadastroMedicamentoScreen";
import CalendarioScreen from "../screens/CalendarioScreen";
import MedicamentosAtuaisScreen from "../screens/MedicamentosAtuaisScreen";
import HistoricoUso from "../screens/HistoricoUso";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AddButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.addBtn} onPress={onPress}>
      <Ionicons name="add" size={28} color="#fff" />
    </TouchableOpacity>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.textMuted,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Historico"
        component={HistoricoScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AddMed"
        component={CadastroMedicamentoScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="plus" size={size} color={color} />
          ),
          tabBarButton: (props) => <AddButton onPress={props.onPress} />,
        }}
      />
      <Tab.Screen
        name="Calendario"
        component={CalendarioScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={MedicamentosAtuaisScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="Cadastro2" component={Cadastro2Screen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen
          name="MedicamentosTomados"
          component={MedicamentosAtuaisScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#fff",

    height: 70,
    paddingBottom: 8,
    paddingTop: 8,
    elevation: 8,
  },
  addBtn: {
    alignContent: "center",
    width: 52,
    height: 52,
    borderRadius: 30,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
});
