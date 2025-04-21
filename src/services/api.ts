import { API_CONFIG } from "./index.services";
import { Categoria, Producto } from '@/types/admin';
import axios from "axios";



const api = axios.create({
    baseURL: API_CONFIG.BASE_URL_LOCAL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para agregar el token a las peticiones
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const ApiService = {
    getHeaders() {
        const token = localStorage.getItem('token');
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    },

    async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
        const response = await fetch(`${API_CONFIG.BASE_URL_LOCAL}${endpoint}`, {
            ...options,
            headers: this.getHeaders()
        });
        
        if (!response.ok) {
            throw new Error(await response.text());
        }
        
        return response.json();
    },

    async getCategorias(): Promise<Categoria[]> {
        const response = await api.get(API_CONFIG.ENDPOINTS.CATEGORIAS);
        return response.data;
    },

    async getProductos(): Promise<Producto[]> {
        const response = await api.get(API_CONFIG.ENDPOINTS.PRODUCTOS);
        return response.data;
    },

    createCategoria: async (categoria: { nombre: string; descripcion: string }) => {
        const response = await api.post(`${API_CONFIG.ENDPOINTS.CATEGORIAS}/crear/`, categoria);
        return response.data;
    },

    createProducto: async (producto: {
        nombre: string;
        precio: number;
        stock_actual: number;
        stock_minimo: number;
        categoria: number;
        imagen_url?: string;
    }) => {
        const response = await api.post(`${API_CONFIG.ENDPOINTS.PRODUCTOS}/crear/`, producto);
        return response.data;
    },
};
