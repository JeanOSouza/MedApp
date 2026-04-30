import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// O Expo lê automaticamente variáveis que começam com EXPO_PUBLIC_
const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

api.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.log("AsyncStorage não disponível");
  }
  return config;
});

export default api;
