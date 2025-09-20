import { decamelize } from "$lib";
import { API_URL } from "../../../../api/config";
import { deserializerColaboracion } from "../model";

export interface SolicitudAsesoramiento {
    usuarioId: string,
    proyectoId: string,
    titulo: string,
    resumen: string,
    creatorId: string
}

export async function createColaboracionSolicitarAsesor(body: SolicitudAsesoramiento) {
    const url = `${API_URL}/general/colaboraciones/solicitar-asesor`

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(decamelize(body)),
        })

        if (!response.ok) return null

        const dataResponse = await response.json();
        console.log(dataResponse, 'data de servidor')
        const data = deserializerColaboracion(dataResponse.data)
        return data
    } catch (error) {
        throw error;
    }
}