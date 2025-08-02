import { API_URH_URL } from "../../../../api/config"
import { deserializerPropuesta } from "../deserializer"

export async function getPropuesta(verbose = false) {
    try {
        const res = await fetch(`${API_URH_URL}/plan-tesis/propuestas/propuestas`)
        if (!res.ok) throw new Error('Error en la respuesta del servidor')
        const tmp = await res.json()
        if (verbose) console.log(tmp)
        const data = deserializerPropuesta(tmp.data[0])
        return data
    }
    catch (err: any) {
        console.error(`Error al obtener los datos: ${err.message}`)
        return null
    }

}