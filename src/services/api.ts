import { API_CONFIG } from "./index.services";


export class ApiService {
    private static getHeaders() {
        const token = localStorage.getItem('token');
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    }

    static async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
        const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
            ...options,
            headers: this.getHeaders()
        });
        
        if (!response.ok) {
            throw new Error(await response.text());
        }
        
        return response.json();
    }
}
