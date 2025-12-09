import { URL_API } from "$lib/config";
import { deserializerPropuesta, type Propuesta } from "../model";

export async function getPropuestaByProyectoId(proyectoId: string): Promise<Propuesta | null> {
    const url = `${URL_API}/propuestas/${proyectoId}`;

    try {
        const response = await fetch(url);

        if (response.status === 404) return null

        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Error del servidor: ${response.status} - ${errorText}`);
        }

        const result = await response.json();
        const data = deserializerPropuesta(result)
        return data
    } catch (err) {
        throw new Error(err instanceof Error ? err.message : "Error desconocido");
    }

}
