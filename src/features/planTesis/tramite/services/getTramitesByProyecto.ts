import { URL_API } from "$lib/config";
import { deserializerTramite, type Tramite } from "../model";

export async function getTramitesByProyecto(proyectoId: string, tipo?: string): Promise<Tramite[]> {
    let url = `${URL_API}/plan-tesis/tramites/proyecto/${proyectoId}`
    if (tipo) url += `?tipo=${tipo}`

    try {
        const response = await fetch(url)
        if (!response.ok) throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`)
        const result = await response.json()
        const data = result.map((e: any) => deserializerTramite(e))
        return data
    }
    catch (err) {
        throw new Error(err instanceof Error ? err.message : 'Error desconocido')
    }

}