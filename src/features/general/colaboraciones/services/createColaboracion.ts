import { API_URL } from "../../../../api/config";
import { deserializerColaboracion } from "../model";

interface ColaboracionCreate {
    role: string,
    usuario_id: string,
    proyecto_id: string,
}

export async function createColaboracionLikeInvitacion(body: ColaboracionCreate) {
    const url = `${API_URL}/general/colaboraciones/create`
    console.log(url)
    console.log(body)

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        })

        if (!response.ok) return null

        const dataResponse = await response.json();
        const data = deserializerColaboracion(dataResponse)
        return data
    } catch (error) {
        throw error;
    }
}