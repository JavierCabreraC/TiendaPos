import React, { useState, useEffect } from 'react';
import { Producto, Categoria } from '@/types/admin';
import { ApiService } from '@/services/api';



const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Producto[]>([]);
    const [categories, setCategories] = useState<Categoria[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingProduct, setEditingProduct] = useState<Producto | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [newProduct, setNewProduct] = useState({
        nombre: '',
        precio: '0',
        stock_actual: 0,
        stock_minimo: 0,
        categoria: 0,
        imagen_url: '',
        activo: true
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [productsData, categoriesData] = await Promise.all([
                ApiService.getProductos(),
                ApiService.getCategorias()
            ]);
            setProducts(productsData);
            setCategories(categoriesData);
            setError(null);
        } catch (err) {
            setError('Error al cargar los datos');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (product: Producto) => {
        setEditingProduct(product);
    };

    const handleSave = async () => {
        try {
            if (editingProduct) {
                // Aquí iría la lógica para actualizar el producto
                // await ApiService.updateProducto(editingProduct);
                setEditingProduct(null);
                fetchData();
            }
        } catch (err) {
            setError('Error al guardar el producto');
            console.error(err);
        }
    };

    const handleCreate = async () => {
        try {
            await ApiService.createProducto(newProduct);
            setIsCreating(false);
            setNewProduct({
                nombre: '',
                precio: '0',
                stock_actual: 0,
                stock_minimo: 0,
                categoria: 0,
                imagen_url: '',
                activo: true
            });
            fetchData();
        } catch (err) {
            setError('Error al crear el producto');
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="p-6">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Productos</h2>
                <button 
                    onClick={() => setIsCreating(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Agregar Producto
                </button>
            </div>

            {isCreating && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h3 className="text-xl font-bold mb-4">Nuevo Producto</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                                <input
                                    type="text"
                                    value={newProduct.nombre}
                                    onChange={(e) => setNewProduct({...newProduct, nombre: e.target.value})}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Precio</label>
                                <input
                                    type="number"
                                    value={newProduct.precio}
                                    onChange={(e) => setNewProduct({...newProduct, precio: e.target.value})}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Stock Actual</label>
                                <input
                                    type="number"
                                    value={newProduct.stock_actual}
                                    onChange={(e) => setNewProduct({...newProduct, stock_actual: parseInt(e.target.value)})}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Stock Mínimo</label>
                                <input
                                    type="number"
                                    value={newProduct.stock_minimo}
                                    onChange={(e) => setNewProduct({...newProduct, stock_minimo: parseInt(e.target.value)})}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Categoría</label>
                                <select
                                    value={newProduct.categoria}
                                    onChange={(e) => setNewProduct({...newProduct, categoria: parseInt(e.target.value)})}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <option value={0}>Seleccione una categoría</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">URL de la Imagen (Opcional)</label>
                                <input
                                    type="text"
                                    value={newProduct.imagen_url}
                                    onChange={(e) => setNewProduct({...newProduct, imagen_url: e.target.value})}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() => setIsCreating(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleCreate}
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                                >
                                    Crear
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {editingProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h3 className="text-xl font-bold mb-4">Editar Producto</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                                <input
                                    type="text"
                                    value={editingProduct.nombre}
                                    onChange={(e) => setEditingProduct({...editingProduct, nombre: e.target.value})}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Precio</label>
                                <input
                                    type="number"
                                    value={editingProduct.precio}
                                    onChange={(e) => setEditingProduct({...editingProduct, precio: Number(e.target.value).toString()})}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Stock</label>
                                <input
                                    type="number"
                                    value={editingProduct.stock_actual}
                                    onChange={(e) => setEditingProduct({...editingProduct, stock_actual: Number(e.target.value)})}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() => setEditingProduct(null)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                                >
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nombre
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Precio
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Stock
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Categoría
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Estado
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {product.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {product.nombre}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    ${parseFloat(product.precio).toFixed(2)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {product.stock_actual}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {product.categoria}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        product.activo
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {product.activo ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button 
                                        onClick={() => handleEdit(product)}
                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                    >
                                        Editar
                                    </button>
                                    <button className="text-red-600 hover:text-red-900">
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductList; 