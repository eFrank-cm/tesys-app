import { URL_API } from "$lib/config";
import { deserializeUsuario, type Usuario } from "../model";

export interface UsuarioUpdate {
    email: string
    activo?: boolean
    emailReseteo?: string
    tipo: string;
    username: string;
    apellidoPaterno?: string
    apellidoMaterno?: string
    nombres: string;
    fechaNacimiento?: string
    genero?: string | null;
    celular?: string | null;
    aptoAsesor?: boolean;
    aptoRevisor?: boolean;
}


export async function editUsuarioById(usuarioId: string, payload: UsuarioUpdate): Promise<Usuario> {
    const url = `${URL_API}/usuarios/${usuarioId}`;

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        })


        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || "Error al responder invitación");
        }

        const result = await response.json();
        const data = deserializeUsuario(result);
        return data
    }
    catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error de red desconocido");
    }
}