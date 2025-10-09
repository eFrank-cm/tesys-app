import { URL_API } from "$lib/config"
import { deserializerPropuesta, type Propuesta } from "../model"


export interface PropuestaUpdate {
    titulo?: string
    resumen?: string
}

export async function editPropuestaById(propuestaId: string, payload: PropuestaUpdate): Promise<Propuesta> {
    const url = `${URL_API}/plan-tesis/propuestas/${propuestaId}`

    try {
        const response = await fetch(url, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })

        if (response.status === 404) throw new Error("Propuesta no encontrada");
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