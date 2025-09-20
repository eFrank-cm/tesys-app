import { API_URL } from "../../../../api/config";

export async function eliminarColaboracion(colaboracionId: string) {
    const url = `${API_URL}/general/colaboraciones/${colaboracionId}`

    try {
        const response = await fetch(url, {
            method: "DELETE",
        });

        const res = await response.json();
        return res
    } catch (error) {
        throw error;
    }
}