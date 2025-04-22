import { API_CONFIG } from "./index.services";
import { Categoria, Producto } from '@/types/admin';


export class ApiService {
    private static getHeaders() {
        const token = localStorage.getItem('token');
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    }

    static async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
        const response = await fetch(`${API_CONFIG.BASE_URL_LOCAL}${endpoint}`, {
            ...options,
            headers: this.getHeaders()
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        return response.json();
    }

    static async getCategorias(): Promise<Categoria[]> {
        return this.fetch<Categoria[]>(API_CONFIG.ENDPOINTS.CATEGORIAS);
    }

    static async getProductos(): Promise<Producto[]> {
        return this.fetch<Producto[]>(API_CONFIG.ENDPOINTS.PRODUCTOS);
    }

    static async createCategoria(categoria: Omit<Categoria, 'id'>): Promise<Categoria> {
        return this.fetch<Categoria>(API_CONFIG.ENDPOINTS.CATEGORIAS, {
            method: 'POST',
            body: JSON.stringify(categoria)
        });
    }

    static async createProducto(producto: Omit<Producto, 'id'>): Promise<Producto> {
        return this.fetch<Producto>(API_CONFIG.ENDPOINTS.PRODUCTOS, {
            method: 'POST',
            body: JSON.stringify(producto)
        });
    }
}
