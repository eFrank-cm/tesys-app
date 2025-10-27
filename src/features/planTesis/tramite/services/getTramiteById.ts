import { URL_API } from "$lib/config";
import { deserializerTramite, type Tramite } from "../model";

export async function getTramiteById(tramiteId: string): Promise<Tramite | null> {
    const url = `${URL_API}/plan-tesis/tramites/${tramiteId}`

    try {
        const response = await fetch(url)
        if (response.status === 404) return null
        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Error del servidor: ${response.status} - ${errorText}`);
        }
        const result = await response.json();
        const data = deserializerTramite(result)
        return data
    }
    catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
}