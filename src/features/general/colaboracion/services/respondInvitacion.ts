import { URL_API } from "$lib/config";
import { deserializerColaboracion, type Colaboracion } from "../model";

export interface ColaboracionRespond {
    respuesta: "ACEPTADO" | "RECHAZADO";
}

export async function respondInvitation(colaboracionId: string, payload: ColaboracionRespond): Promise<Colaboracion> {
    const url = `${URL_API}/general/colaboraciones/responder/${colaboracionId}`;

    try {
        const response = await fetch(url, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || "Error al responder invitación");
        }

        const result = await response.json();
        const data = deserializerColaboracion(result);
        return data
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error de red desconocido");
    }
}
