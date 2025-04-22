import 'jspdf-autotable';
import jsPDF from 'jspdf';
import type { DidDrawCellParams, ExtendedAutoTableSettings, 
    HistorialReceta, HistorialVacuna, ReciboCli, ServicioHistorial, ProductoBajoStock } from '@/types/client';


export const generateHistorialPDF = async (
    data: HistorialReceta[],
    nombreMascota: string
): Promise<void> => {
    const doc = new jsPDF();
    
    // Título
    doc.setFontSize(16);
    doc.text('Historial de Recetas y Análisis', 20, 20);
    
    // Nombre de la mascota
    doc.setFontSize(14);
    doc.text(`Mascota: ${nombreMascota}`, 20, 30);
    
    // Fecha de generación
    doc.setFontSize(10);
    doc.text(`Fecha de generación: ${new Date().toLocaleString()}`, 20, 40);
    
    // Preparar datos para la tabla
    const headers = [
        ['Tipo Servicio', 'Tipo Registro', 'Medicamento', 'Dosis', 'Indicaciones', 'Fecha']
    ];
    
    const rows = data.map(item => [
        item['Tipo Servicio'],
        item['Tipo Registro'],
        item['Medicamento'],
        item['Dosis'],
        item['Indicaciones'] || '-',
        new Date(item['Fecha Emisión']).toLocaleDateString()
    ]);

    // Generar tabla
    doc.autoTable({
        head: headers,
        body: rows,
        startY: 50,
        theme: 'grid',
        styles: { 
            fontSize: 8,
            cellPadding: 2
        },
        columnStyles: {
            0: { cellWidth: 25 },  // Tipo Servicio
            1: { cellWidth: 25 },  // Tipo Registro
            2: { cellWidth: 30 },  // Medicamento
            3: { cellWidth: 25 },  // Dosis
            4: { cellWidth: 45 },  // Indicaciones
            5: { cellWidth: 25 }   // Fecha
        }
    });

    // Descargar PDF
    doc.save(`historial-${nombreMascota.toLowerCase()}.pdf`);
};

export const generateVacunasPDF = async (
    data: HistorialVacuna[],
    nombreMascota: string
): Promise<void> => {
    const doc = new jsPDF();
    
    // Título
    doc.setFontSize(16);
    doc.text('Historial de Vacunación', 20, 20);
    
    // Nombre de la mascota
    doc.setFontSize(14);
    doc.text(`Mascota: ${nombreMascota}`, 20, 30);
    
    // Fecha de generación
    doc.setFontSize(10);
    doc.text(`Fecha de generación: ${new Date().toLocaleString()}`, 20, 40);
    
    // Preparar datos para la tabla
    const headers = [
        ['Vacuna', 'Tipo', 'Laboratorio', 'Fecha Vacunación', 'Próxima Dosis', 'Estado']
    ];
    
    const rows = data.map(item => [
        item.NombreVacuna,
        item['Tipo Vacuna'],
        item.Laboratorio,
        new Date(item.FechaVacunacion).toLocaleDateString(),
        new Date(item['Próxima Vacunación']).toLocaleDateString(),
        item.Estado
    ]);

    // Configuración de la tabla
    const tableConfig: ExtendedAutoTableSettings = {
        head: headers,
        body: rows,
        startY: 50,
        theme: 'grid',
        styles: { 
            fontSize: 8,
            cellPadding: 2
        },
        columnStyles: {
            0: { cellWidth: 30 },  // Vacuna
            1: { cellWidth: 25 },  // Tipo
            2: { cellWidth: 30 },  // Laboratorio
            3: { cellWidth: 30 },  // Fecha Vacunación
            4: { cellWidth: 30 },  // Próxima Dosis
            5: { cellWidth: 25 }   // Estado
        },
        // Colorear el estado según si está vigente o no
        didDrawCell: (data: DidDrawCellParams) => {
            if (data.section === 'body' && data.column.index === 5) {
                const cell = data.cell;
                const value = cell.text[0];
                if (value === 'Vigente') {
                    cell.styles.textColor = [0, 128, 0]; // Verde
                } else {
                    cell.styles.textColor = [255, 0, 0]; // Rojo
                }
            }
        }
    };

    // Generar tabla
    doc.autoTable(tableConfig);

    // Descargar PDF
    doc.save(`vacunacion-${nombreMascota.toLowerCase()}.pdf`);
};

export const generateServiciosHistorialPDF = async (
    data: ServicioHistorial[]
): Promise<void> => {
    const doc = new jsPDF();
    
    // Título
    doc.setFontSize(16);
    doc.text('Historial de Servicios', 20, 20);
    
    // Fecha de generación
    doc.setFontSize(10);
    doc.text(`Fecha de generación: ${new Date().toLocaleString()}`, 20, 30);
    
    // Preparar datos para la tabla
    const headers = [
        ['Servicio', 'Mascota', 'Personal', 'Inicio', 'Fin', 'Duración']
    ];
    
    const rows = data.map(item => [
        item.TipoServicio,
        item.Mascota,
        item.Personal,
        new Date(item.FechaHoraInicio).toLocaleString(),
        new Date(item.FechaHoraFin).toLocaleString(),
        `${item["Duración (Horas)"]} h`
    ]);

    // Configuración de la tabla
    const tableConfig: ExtendedAutoTableSettings = {
        head: headers,
        body: rows,
        startY: 40,
        theme: 'grid',
        styles: { 
            fontSize: 8,
            cellPadding: 2
        },
        columnStyles: {
            0: { cellWidth: 25 },  // Servicio
            1: { cellWidth: 25 },  // Mascota
            2: { cellWidth: 25 },  // Personal
            3: { cellWidth: 35 },  // Inicio
            4: { cellWidth: 35 },  // Fin
            5: { cellWidth: 20 }   // Duración
        }
    };

    // Generar tabla
    doc.autoTable(tableConfig);

    // Descargar PDF
    doc.save(`historial-servicios-${new Date().toISOString().split('T')[0]}.pdf`);
};

export const generateRecibosPDF = async (data: ReciboCli[]): Promise<void> => {
    const doc = new jsPDF();
    
    doc.setFontSize(16);
    doc.text('Historial de Recibos', 20, 20);
    
    doc.setFontSize(10);
    doc.text(`Fecha de generación: ${new Date().toLocaleString()}`, 20, 30);
    
    const headers = [['Recibo #', 'Servicio', 'Fecha Emisión', 'Total']];
    
    const rows = data.map(item => [
        item.ReciboID.toString(),
        item.TipoServicio,
        new Date(item.FechaEmision).toLocaleString(),
        `BOB/. ${parseFloat(item.Total).toFixed(2)}`
    ]);

    doc.autoTable({
        head: headers,
        body: rows,
        startY: 40,
        theme: 'grid',
        styles: { fontSize: 8, cellPadding: 2 },
        columnStyles: {
            0: { cellWidth: 20 },
            1: { cellWidth: 30 },
            2: { cellWidth: 40 },
            3: { cellWidth: 25 }
        }
    });

    doc.save(`historial-recibos-${new Date().toISOString().split('T')[0]}.pdf`);
};

export const generateBajoStockPDF = async (data: ProductoBajoStock[]): Promise<void> => {
    const doc = new jsPDF();
    
    // Título
    doc.setFontSize(16);
    doc.text('Reporte de Productos con Bajo Stock', 20, 20);
    
    // Fecha de generación
    doc.setFontSize(10);
    doc.text(`Fecha de generación: ${new Date().toLocaleString()}`, 20, 30);
    
    // Preparar datos para la tabla
    const headers = [
        ['Producto', 'Categoría', 'Stock Actual', 'Stock Mínimo', 'Diferencia']
    ];
    
    const rows = data.map(item => [
        item.nombre,
        item.categoria,
        item.stock_actual.toString(),
        item.stock_minimo.toString(),
        (item.stock_minimo - item.stock_actual).toString()
    ]);

    // Configuración de la tabla
    const tableConfig: ExtendedAutoTableSettings = {
        head: headers,
        body: rows,
        startY: 40,
        theme: 'grid',
        styles: { 
            fontSize: 8,
            cellPadding: 2
        },
        columnStyles: {
            0: { cellWidth: 40 },  // Producto
            1: { cellWidth: 30 },  // Categoría
            2: { cellWidth: 25 },  // Stock Actual
            3: { cellWidth: 25 },  // Stock Mínimo
            4: { cellWidth: 25 }   // Diferencia
        },
        // Colorear la diferencia según si está por debajo del mínimo
        didDrawCell: (data: DidDrawCellParams) => {
            if (data.section === 'body' && data.column.index === 4) {
                const cell = data.cell;
                const value = parseInt(cell.text[0]);
                if (value > 0) {
                    cell.styles.textColor = [255, 0, 0]; // Rojo
                } else {
                    cell.styles.textColor = [0, 128, 0]; // Verde
                }
            }
        }
    };

    // Generar tabla
    doc.autoTable(tableConfig);

    // Descargar PDF
    doc.save(`reporte-bajo-stock-${new Date().toISOString().split('T')[0]}.pdf`);
};
