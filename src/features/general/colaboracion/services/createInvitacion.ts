import { decamelize } from "$lib";
import { URL_API } from "$lib/config";
import { deserializerColaboracion, type Colaboracion } from "../model";

export interface ColaboracionCreate {
    usuarioFrom: string,
    usuarioTo: string,
    proyectoId: string
    role: string
}

export async function createInvitacion(payload: ColaboracionCreate): Promise<Colaboracion> {
    const url = `${URL_API}/colaboraciones/invitar`

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(decamelize(payload)),
        })

        if (!response.ok) throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`)
        const result = await response.json()
        const data = deserializerColaboracion(result)
        return data
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error de red desconocido")
    }
}