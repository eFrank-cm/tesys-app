import { URL_API } from "$lib/config";

export async function deleteRevisionById(revisionId: string) {
    const url = `${URL_API}/revisiones/${revisionId}`
    try {
        const response = await fetch(url, {
            method: 'DELETE'
        })

        if (response.status === 404) throw new Error("Propuesta no encontrada");
        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Error del servidor: ${response.status} - ${errorText}`);
        }
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }

}