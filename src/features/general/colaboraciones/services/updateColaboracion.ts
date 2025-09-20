import { API_URL } from "../../../../api/config";
import { deserializerColaboracion } from "../model";

export async function respondInvitation(colaboracionId: string, respuesta: "ACEPTADO" | "RECHAZADO") {
    const url = `${API_URL}/general/colaboraciones/${colaboracionId}/?respuesta=${respuesta}`;
    try {
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
        }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || "Error al responder invitación");
        }

        const dataResponse = await response.json();
        const data = deserializerColaboracion(dataResponse.data);
        console.log(data, 'data respuesta colaboracion');
        return data; // estructura del return del backend
    } catch (error) {
        console.error("Error en respondInvitation:", error);
        throw error;
    }
}
