import { URL_API } from "$lib/config";
import { deserializerDocumento, type Documento } from "../model";

export async function getDocumentosWithRevision(proyectoId: string, tipo?: string): Promise<Documento[]> {
    let url = `${URL_API}/general/documentos/proyecto/${proyectoId}/revisiones`
    if (tipo) url += `?tipo=${tipo}`

    try {
        const response = await fetch(url)
        if (!response.ok) throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`)
        const result = await response.json()
        const data = result.map((e: any) => deserializerDocumento(e))
        return data
    }
    catch (err) {
        throw new Error(err instanceof Error ? err.message : 'Error desconocido')
    }
}