import { URL_API } from "$lib/config"
import { deserializerDocumento } from "../model"

export interface DocumentoUpdate {
    replace?: boolean,
    estado?: string
}

export async function editDocumento(documentoId: string, data: DocumentoUpdate, file?: File) {
    const url = `${URL_API}/documentos/${documentoId}`
    console.log(url)

    const formData = new FormData()
    formData.append("form", JSON.stringify(data))
    if (file) formData.append("file", file)

    try {
        const response = await fetch(url, {
            method: "PATCH",
            body: formData
        })

        if (!response.ok) throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`)

        const result = await response.json()
        console.log(result)
        const data = deserializerDocumento(result)
        return data
    }
    catch (err) {
        throw new Error(err instanceof Error ? err.message : 'Error desconocido')
    }
}