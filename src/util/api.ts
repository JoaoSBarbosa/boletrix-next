import axios from "axios";

// Função para obter o URL da conexão com base na localização atual
export function getUrlConnection(currentLocation: string) {
    let url = "http://localhost";
    let porta: string = "8080";

    if (currentLocation.includes('45.231.133.225')) url = "http://45.231.133.225";
    if (currentLocation.includes('191.252.221.124')) url = "http://191.252.221.124";

    return url + ":" + porta;
}

// Função para obter o URL da conexão NFC com base na localização atual
export function getUrlConnectionNfc(currentLocation: string) {
    let url = "http://localhost";
    let porta: string = "8080";

    if (currentLocation.includes('45.231.133.225')) url = "http://45.231.133.225";
    if (currentLocation.includes('191.252.221.124')) url = "http://191.252.221.124";

    return url + ":" + porta;
}

// Função para criar a conexão com a API, considerando a localização e o token no localStorage
export default function ApiConnection(currentLocation: string) {

    const api = axios.create({
        baseURL: getUrlConnection(currentLocation),  // Base URL com base na localização
        timeout: 30 * 1000,  // Timeout de 30 segundos
        timeoutErrorMessage: "Servidor indisponível no momento",  // Mensagem de erro no timeout
    });

    // Interceptador para adicionar o token do localStorage no cabeçalho Authorization
    api.interceptors.request.use((config) => {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    return api;
}
