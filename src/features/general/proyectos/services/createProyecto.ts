import { API_URL } from "../../../../api/config";
import { deserializerProyecto } from "../model";

export interface ProyectoCreate {
    titulo: string,
    usuario_id: string,
    resumen?: string,
    keywords?: string[]
}

export async function createProyecto(body: ProyectoCreate) {
    const url = `${API_URL}/general/proyectos`

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        })

        if (!response.ok) return null

        const dataResponse = await response.json();
        console.log('createProyecto - backend', dataResponse);
        const data = deserializerProyecto(dataResponse)
        console.log('createProyecto - deserializer', data);
        return data
    } catch (error) {
        throw error;
    }
}