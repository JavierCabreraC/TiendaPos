import React, { useEffect, useState } from 'react';
import { Categoria } from '@/types/admin';
import { ApiService } from '@/services/api';

export const CategoryList = () => {
    const [categories, setCategories] = useState<Categoria[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await ApiService.getCategorias();
                setCategories(data);
            } catch (err) {
                setError('Error al cargar las categorías');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) return <div>Cargando categorías...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            ID
                        </th>
                        <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Nombre
                        </th>
                        <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Descripción
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                                {category.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                                {category.nombre}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                                {category.descripcion}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}; 