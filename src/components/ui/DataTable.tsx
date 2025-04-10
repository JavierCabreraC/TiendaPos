import { ReactNode, useState } from 'react';
import { Button } from '@/components/ui/index.ui';


export interface Column<T> {
    key: keyof T | string;
    header: string;
    render?: (item: T) => ReactNode;
}

export interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    renderMobileCard: (item: T) => ReactNode;
    itemsPerPage?: number;
}

export function DataTable<T>({ 
    data, 
    columns, 
    renderMobileCard,
    itemsPerPage = 5 
}: DataTableProps<T>) {
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const renderPagination = () => {
        const maxButtons = 5; // Número máximo de botones a mostrar
        let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
        const endPage = Math.min(totalPages, startPage + maxButtons - 1);
        
        // Ajustar startPage si estamos cerca del final
        if (endPage - startPage + 1 < maxButtons) {
            startPage = Math.max(1, endPage - maxButtons + 1);
        }

        return (
            <div className="flex flex-wrap justify-center mt-4 gap-1">
                {startPage > 1 && (
                    <Button
                        onClick={() => setCurrentPage(1)}
                        variant="outline"
                        className="w-8 h-8 p-0 sm:w-10 sm:h-10"
                    >
                        1
                    </Button>
                )}

                {startPage > 2 && (
                    <span className="mx-1 self-center">...</span>
                )}

                {Array.from(
                    { length: endPage - startPage + 1 },
                    (_, i) => startPage + i
                ).map((page) => (
                    <Button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        variant={currentPage === page ? "default" : "outline"}
                        className="w-8 h-8 p-0 sm:w-10 sm:h-10"
                    >
                        {page}
                    </Button>
                ))}

                {endPage < totalPages - 1 && (
                    <span className="mx-1 self-center">...</span>
                )}

                {endPage < totalPages && (
                    <Button
                        onClick={() => setCurrentPage(totalPages)}
                        variant="outline"
                        className="w-8 h-8 p-0 sm:w-10 sm:h-10"
                    >
                        {totalPages}
                    </Button>
                )}
            </div>
        );
    };

    return (
        <div className="bg-white rounded-lg shadow p-4">
            {/* Vista móvil */}
            <div className="md:hidden">
                {currentItems.map((item) => renderMobileCard(item))}
            </div>

            {/* Vista desktop */}
            <div className="hidden md:block">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr>
                                {columns.map((column) => (
                                    <th 
                                        key={column.key.toString()} 
                                        className="p-3 bg-gray-100 text-left font-semibold"
                                    >
                                        {column.header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    {columns.map((column) => (
                                        <td 
                                            key={column.key.toString()} 
                                            className="p-3 border-b"
                                        >
                                            {column.render 
                                                ? column.render(item)
                                                : String(item[column.key as keyof T])}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {totalPages > 1 && renderPagination()}

            {data.length > 0 && (
                <div className="text-sm text-gray-500 text-center mt-4">
                    Mostrando {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, data.length)} de {data.length}
                </div>
            )}
        </div>
    );
}
