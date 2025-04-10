import { AutoTableSettings } from "./admin";


export type ViewStateCliente = 
    // Mascotas
    | 'list-mascotas'
    // Reservaciones
    | 'create-reservacion' | 'list-reservaciones'
    // Servicios
    | 'history-reservaciones' | 'history-servicios' | 'history-recibos';;

export interface MascotaCli {
    ID: number;
    Nombre: string;
    Sexo: string;
    Fecha_De_Nacimiento: string;
    Años: string;
    Meses: string;
    Especie: string;
    Raza: string;
}

export interface Reservation {
    ReservacionID: number;
    Motivo: string;
    FechaHoraReservada: string;
    Estado: 'Pendiente' | 'Cancelada' | 'Realizada';
    UsuarioID: number;
}

export interface ReservationRequest {
    Motivo: string;
    FechaHoraReservada: string;
}

export interface TimeSlot {
    id: number;
    start: string;
    end: string;
    periodo: 'AM' | 'PM';
}

export interface ReservedTimeSlot {
    Fecha_Hora: string;
    Estado: 'Pendiente' | 'Cancelada' | 'Realizada';
}

export interface User {
    UsuarioID: number;
    Rol: 'Administrador' | 'Veterinario' | 'Cliente';
    Estado: 'Activo' | 'Inactivo';
}

export interface PendingReservation {
    ReservacionID: number;
    Motivo: string;
    Fecha_Hora: string;
    Estado: 'Pendiente';
}

export interface CancelReservationRequest {
    ReservacionID: number;
}

export interface HistorialReceta {
    "Mascota": string;
    "Tipo Servicio": string;
    "Tipo Registro": "Receta" | "Análisis";
    "Medicamento": string;
    "Dosis": string;
    "Indicaciones": string | null;
    "Fecha Emisión": string;
}

export interface HistorialVacuna {
    "Mascota": string;
    "NombreVacuna": string;
    "Tipo Vacuna": string;
    "Laboratorio": string;
    "FechaVacunacion": string;
    "Próxima Vacunación": string;
    "Estado": "Vigente" | "Vencida";
}

export interface ServicioHistorial {
    TipoServicio: string;
    Mascota: string;
    Personal: string;
    FechaHoraInicio: string;
    FechaHoraFin: string;
    "Duración (Horas)": string;
}

export interface AutoTableCell {
    text: string[];
    styles: {
        textColor?: number[];
        // ... otros estilos que puedas necesitar
    };
}

export interface DidDrawCellParams {
    cell: AutoTableCell;
    section: 'head' | 'body';
    column: {
        index: number;
    };
    row: {
        index: number;
    };
}

export interface ExtendedAutoTableSettings extends AutoTableSettings {
    didDrawCell?: (data: DidDrawCellParams) => void;
}

export interface ReciboCli {
    ReciboID: number;
    FechaEmision: string;
    Total: string;
    ServicioID: number;
    TipoServicio: string;
}

export interface HistorialReservacion {
    ReservacionID: number;
    Motivo: string;
    Fecha_y_Hora: string;
    Estado: string;
    Cliente: string;
}
