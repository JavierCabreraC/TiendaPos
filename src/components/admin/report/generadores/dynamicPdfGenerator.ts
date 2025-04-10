import { jsPDF } from 'jspdf';
import { FiltrosServicio, ReporteDinamico } from "@/types/admin";


export const generateDynamicPDF = async (data: ReporteDinamico, filtros: FiltrosServicio) => {
    const doc = new jsPDF();
    
    // Título principal
    doc.setFontSize(16);
    doc.text('Reporte Dinámico de Servicios', 20, 20);
    
    let yPos = 30;
    doc.setFontSize(10);
    
    // Información de filtros
    if (filtros.fechaInicio || filtros.fechaFin) {
        const fechaInicio = filtros.fechaInicio ? new Date(filtros.fechaInicio).toLocaleDateString() : 'No especificada';
        const fechaFin = filtros.fechaFin ? new Date(filtros.fechaFin).toLocaleDateString() : 'No especificada';
        doc.text(`Período: ${fechaInicio} - ${fechaFin}`, 20, yPos);
        yPos += 10;
    }

    if (filtros.tipoServicio?.length) {
        doc.text(`Tipos de servicio: ${filtros.tipoServicio.join(', ')}`, 20, yPos);
        yPos += 10;
    }

    doc.text(`Generado el: ${new Date().toLocaleString()}`, 20, yPos);
    yPos += 15;

    // Procesar cada grupo
    data.grupos.forEach(grupo => {
        doc.setFontSize(12);
        let titulo = '';

        if (grupo.tipo === 'veterinario') {
            titulo = `Veterinario: ${grupo.nombreVeterinario} - Total: ${grupo.cantidad}`;
        } else if (grupo.tipo === 'tipoServicio') {
            titulo = `Tipo de Servicio: ${grupo.TipoServicio} - Total: ${grupo.cantidad}`;
        }

        doc.text(titulo, 20, yPos);
        yPos += 10;

        // Filtrar servicios para este grupo
        const serviciosGrupo = data.servicios.filter(servicio => {
            if (grupo.tipo === 'veterinario') {
                return servicio.NombreVeterinario === grupo.nombreVeterinario;
            } else if (grupo.tipo === 'tipoServicio') {
                return servicio.TipoServicio === grupo.TipoServicio;
            }
            return false;
        });

        // Tabla de servicios
        const headers = [
            ['ID', 'Tipo', 'Inicio', 'Fin', 'Veterinario', 'Mascota', 'Cliente']
        ];

        const formatDateTime = (dateTime: string): string => {
            const date = new Date(dateTime);
            const options: Intl.DateTimeFormatOptions = {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            };
            return date.toLocaleString('es-ES', options);
        };

        const rows = serviciosGrupo.map(servicio => [
            servicio.ServicioID.toString(),
            servicio.TipoServicio,
            formatDateTime(servicio.FechaHoraInicio),
            servicio.FechaHoraFin ? formatDateTime(servicio.FechaHoraFin) : '',
            servicio.NombreVeterinario,
            servicio.NombreMascota,
            servicio.NombreCliente,
        ]);

        doc.autoTable({
            head: headers,
            body: rows,
            startY: yPos,
            theme: 'grid',
            styles: { fontSize: 8 },
            columnStyles: {
                0: { cellWidth: 15 },
                1: { cellWidth: 25 },
                2: { cellWidth: 35 },
                3: { cellWidth: 35 },
                4: { cellWidth: 30 },
                5: { cellWidth: 25 },
                6: { cellWidth: 25 }
            }
        });

        yPos = doc.lastAutoTable.finalY + 15;

        if (yPos > 250) {
            doc.addPage();
            yPos = 20;
        }
    });

    doc.save('reporte-servicios-dinamico.pdf');
};
