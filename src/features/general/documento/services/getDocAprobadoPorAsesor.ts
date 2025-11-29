import { URL_API } from "$lib/config";
import { deserializerDocumento, type Documento } from "../model";

export async function getDocAprobadoPorAsesor(proyectoId: string): Promise<Documento | null> {
    const url = `${URL_API}/general/documentos/aprobado-asesor/${proyectoId}`

    try {
        const response = await fetch(url)
        if (response.status === 404) return null
        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Error del servidor: ${response.status} - ${errorText}`);
        }
        const result = await response.json();
        const data = deserializerDocumento(result)
        return data
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
}