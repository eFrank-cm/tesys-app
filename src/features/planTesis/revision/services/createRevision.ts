import { decamelize } from "$lib"
import { URL_API } from "$lib/config"
import { deserializerRevision } from "../model"

export interface RevisionCreate {
    comentario: string
    estado: string,
    createdById: string
    documentoId: string
}

export async function createRevision(payload: RevisionCreate) {
    const url = `${URL_API}/revisiones/create`
    const b = decamelize(payload)
    console.log(b)


    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(b)
        })

        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Error del servidor: ${response.status} - ${errorText}`);
        }
        const result = await response.json();
        const data = deserializerRevision(result)
        return data

    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
}