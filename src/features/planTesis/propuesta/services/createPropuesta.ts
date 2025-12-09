import { decamelize } from "$lib"
import { URL_API } from "$lib/config"
import { deserializerPropuesta, type Propuesta } from "../model"

export interface PropuestaCreate {
    titulo: string
    resumen: string
    proyectoId: string
    usuarioId: string
}

export async function createPropuesta(payload: PropuestaCreate): Promise<Propuesta> {
    const url = `${URL_API}/propuestas/`


    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(decamelize(payload))
        })

        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Error del servidor: ${response.status} - ${errorText}`);
        }
        const result = await response.json();
        const data = deserializerPropuesta(result)
        return data
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
}