import { URL_API } from "$lib/config";
import { deserializerDocumento, type Documento } from "../model";

export async function getByProyectoIdAndTipoList(proyectoId: string, tipo: string): Promise<Documento[]> {
    const url = `${URL_API}/documentos/${proyectoId}/${tipo}/list-with-revision`

    try {
        const response = await fetch(url)
        if (response.status === 404) return []
        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Error del servidor: ${response.status} - ${errorText}`);
        }
        const result = await response.json();
        const data = result.map((e: any) => deserializerDocumento(e))
        return data
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
}