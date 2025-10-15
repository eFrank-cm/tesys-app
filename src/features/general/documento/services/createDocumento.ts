import { URL_API } from "$lib/config"
import { deserializerDocumento } from "../model"

export interface DocumentoCreate {
    tipo: string,
    docUrl: string,
    proyectoId: string,
    usuarioId: string
}

export async function createDocumento(data: DocumentoCreate, file?: File) {
    const url = `${URL_API}/general/documentos/create`

    const formData = new FormData()
    formData.append("form", JSON.stringify(data))
    if (file) formData.append("file", file)

    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData
        })

        if (!response.ok) throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`)

        const result = await response.json()
        const data = deserializerDocumento(result)
        return data
    }
    catch (err) {
        throw new Error(err instanceof Error ? err.message : 'Error desconocido')
    }
}