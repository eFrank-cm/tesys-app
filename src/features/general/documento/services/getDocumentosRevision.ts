import { URL_API } from "$lib/config";
import { deserializerDocumento, type Documento } from "../model";

export async function getDocumentosWithRevision(proyectoId: string, tipo?: string, creatorId?: string): Promise<Documento[]> {
    let url = `${URL_API}/documentos/${proyectoId}/with-revisiones?`
    if (tipo) url += `tipo=${tipo}&`
    if (creatorId) url += `creator_id=${creatorId}&`
    console.log(url)

    try {
        const response = await fetch(url)
        if (!response.ok) throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`)
        const result = await response.json()
        // console.log(`result: ${result}`)
        const data = result.map((e: any) => deserializerDocumento(e))
        return data
    }
    catch (err) {
        throw new Error(err instanceof Error ? err.message : 'Error desconocido')
    }
}