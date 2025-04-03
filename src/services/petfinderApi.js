import axios from "axios";
import {
  PETFINDER_API_KEY,
  PETFINDER_API_SECRET,
  PETFINDER_BASE_URL,
} from "../config/api";

// Criar uma instância do Axios com as configurações básicas
const api = axios.create({
  baseURL: PETFINDER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Função para obter o token de acesso
const getAccessToken = async () => {
  try {
    // Usar o formato correto para a autenticação OAuth2
    const response = await axios.post(
      "https://api.petfinder.com/v2/oauth2/token",
      {
        grant_type: "client_credentials",
        client_id: PETFINDER_API_KEY,
        client_secret: PETFINDER_API_SECRET,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Token obtido com sucesso:", response.data);
    return response.data.access_token;
  } catch (error) {
    console.error(
      "Erro detalhado ao obter token:",
      error.response ? error.response.data : error
    );
    throw error;
  }
};

// Função para buscar animais disponíveis para adoção
export const getPets = async (params = {}) => {
  try {
    // Obter token de acesso
    const token = await getAccessToken();

    // Configurar cabeçalhos com o token
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    console.log("Buscando animais com token:", token.substring(0, 10) + "...");

    // Fazer a requisição para buscar animais
    const response = await axios.get(`${PETFINDER_BASE_URL}/animals`, {
      params,
      headers,
    });

    return response.data;
  } catch (error) {
    console.error(
      "Erro detalhado ao buscar animais:",
      error.response ? error.response.data : error
    );
    throw error;
  }
};

// Função para buscar um animal específico por ID
export const getPetById = async (id) => {
  try {
    // Obter token de acesso
    const token = await getAccessToken();

    // Configurar cabeçalhos com o token
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    // Fazer a requisição para buscar o animal específico
    const response = await axios.get(`${PETFINDER_BASE_URL}/animals/${id}`, {
      headers,
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar animal por ID:", error);
    throw error;
  }
};

// Função para buscar tipos de animais disponíveis
export const getAnimalTypes = async () => {
  try {
    // Obter token de acesso
    const token = await getAccessToken();

    // Configurar cabeçalhos com o token
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    // Fazer a requisição para buscar tipos de animais
    const response = await axios.get(`${PETFINDER_BASE_URL}/types`, {
      headers,
    });

    return response.data;
  } catch (error) {
    console.error(
      "Erro detalhado ao buscar tipos de animais:",
      error.response ? error.response.data : error
    );
    throw error;
  }
};

// Função para buscar raças de um tipo específico de animal
export const getBreeds = async (type) => {
  try {
    // Obter token de acesso
    const token = await getAccessToken();

    // Configurar cabeçalhos com o token
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    // Fazer a requisição para buscar raças
    const response = await axios.get(
      `${PETFINDER_BASE_URL}/types/${type}/breeds`,
      { headers }
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar raças:", error);
    throw error;
  }
};
