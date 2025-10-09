import { URL_API } from "$lib/config";
import { deserializerDocumento } from "../model";

export async function getCartaDeAceptacionByProyectoID(proyectoId: string) {
    const url = `${URL_API}/general/documentos/proyecto/carta-aceptacion/${proyectoId}`

    try {
        const response = await fetch(url)
        if (response.status === 404) return null

        if (!response.ok) throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`)
        const result = await response.json()
        const data = deserializerDocumento(result)
        return data
    }
    catch (err) {
        throw new Error(err instanceof Error ? err.message : 'Error desconocido')
    }
}