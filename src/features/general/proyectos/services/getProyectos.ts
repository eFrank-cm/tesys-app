
import { API_URL } from "../../../../api/config";
import { deserializerProyecto } from "../model";

export async function getProyectoById(proyectoId: string) {
    const url = `${API_URL}/general/proyectos/${proyectoId}`;

    try {
        const res = await fetch(url);

        if (!res.ok) {
            const errorText = await res.text(); // opcional: leer respuesta del servidor
            throw new Error(`Error del servidor: ${res.status} - ${errorText}`);
        }

        const dataResponse: { data: any } = await res.json();
        const data = deserializerProyecto(dataResponse.data)
        return data
    } catch (err) {
        console.error(err); // opcional: para depurar
        throw new Error("Error al obtener los proyectos del usuario");
    }

}
