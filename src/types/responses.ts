export interface BaseResponse {
    message: string;
}

export interface ClienteResponse extends BaseResponse {
    ClienteID: number;
    UsuarioID: number;
}

export interface MascotaResponse extends BaseResponse {
    mascotaID: number;
    propietarioID: number;
}

export interface PersonalResponse extends BaseResponse {
    PersonalID: number;
    UsuarioID?: number;
}

export interface ReservacionResponse {
    Respuesta: string;
    ReservaID: number;
}
  
export type ApiResponse = ClienteResponse | MascotaResponse | PersonalResponse | ReservacionResponse;
