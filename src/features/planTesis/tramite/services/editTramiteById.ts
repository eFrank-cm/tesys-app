import { URL_API } from "$lib/config"
import { deserializerTramite, type Tramite } from "../model"

export interface TramiteUpdate {
    expediente: string
    tipo: string
    estado: string
}

export async function editTramiteById(tramiteId: string, payload: TramiteUpdate): Promise<Tramite> {
    const url = `${URL_API}/tramites/${tramiteId}`

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Error del servidor: ${response.status} - ${errorText}`)
        }
        const result = await response.json()
        const data = deserializerTramite(result)
        return data
    }
    catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Error desconocido')
    }
}