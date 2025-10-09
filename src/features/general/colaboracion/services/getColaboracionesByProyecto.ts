import { URL_API } from "$lib/config";
import { deserializerColaboracion, type Colaboracion } from "../model";

export async function getColaboracionesByProyectoId(proyectoId: string): Promise<Colaboracion[]> {
    const url = `${URL_API}/general/colaboraciones/proyecto/${proyectoId}`

    try {
        const response = await fetch(url)
        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Error del servidor: ${response.status} - ${errorText}`)
        }
        const result = await response.json()
        const data = result.map((e: any) => deserializerColaboracion(e))
        return data

    } catch (err) {
        throw new Error(err instanceof Error ? err.message : 'Error desconocido')
    }
}