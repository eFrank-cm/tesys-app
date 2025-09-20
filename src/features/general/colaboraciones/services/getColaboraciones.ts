import { API_URL } from "../../../../api/config";
import { deserializerPropuesta } from "../../../planTesis/solicitarAsesoramiento/models";
import { deserializerColaboracion, type Colaboracion } from "../model";

export async function getColaboracionesByUsuarioId(usuarioId: string) {
    const url = `${API_URL}/general/colaboraciones/${usuarioId}`

    try {
        const res = await fetch(url)
        if (!res.ok) {
            const errorText = await res.text(); // leer respuesta del servidor
            throw new Error(`Error del servidor: ${res.status} - ${errorText}`)
        }

        const dataResponse: {
            length: number
            data: any[]
        } = await res.json()

        const data = dataResponse.data.map(e => deserializerColaboracion(e))
        return data

    } catch (err) {
        console.error(err); // para depurar
        throw new Error("Error al obtener los proyectos del usuario")
    }
}

export async function getSolicitudAsesoramiento(proyectoId: string) {
    const url = `${API_URL}/general/colaboraciones/solitud-asesoramiento/?proyecto_id=${proyectoId}`

    try {
        const res = await fetch(url)
        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Error del servidor: ${res.status} - ${errorText}`)
        }

        const dataResponse: { data: Colaboracion | null } = await res.json()
        if (!dataResponse.data) return null

        const data = deserializerColaboracion(dataResponse.data)
        return data

    } catch (err) {
        console.error(err);
        throw new Error("Error al obtener los proyectos del usuario")
    }
}