import { URL_API } from "$lib/config"
import { deserializerTramite, type Tramite } from "../model"

export interface TramiteCreate {
    expediente: string
    tipo: string
    estado: string
    proyectoId: string
}

export async function createTramite(payload: TramiteCreate): Promise<Tramite> {
    const url = `${URL_API}/plan-tesis/tramites/create`
    console.log(url)
    console.log(payload)

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
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