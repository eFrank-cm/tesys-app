import { deserializerUsuario, type Usuario } from "../../auth/models"
import { deserializerProyecto, getEmptyProyecto, type Proyecto } from "../proyectos/model"

export interface Colaboracion {
    id: string
    role: string
    estado: string
    proyectoId: string
    proyecto: Proyecto
    usuario?: Usuario
}

export function getEmptyColaboracion(): Colaboracion {
    return {
        id: '',
        role: '',
        estado: '',
        proyectoId: '',
        proyecto: getEmptyProyecto(),
    }
}

export function deserializerColaboracion(data: any): Colaboracion {
    const empty = getEmptyColaboracion()

    return {
        id: data?.id ?? empty.id,
        role: data?.role ?? empty.role,
        estado: data?.estado ?? empty.estado,
        proyectoId: data?.proyectoId ?? empty.proyectoId,
        proyecto: data?.proyecto ? deserializerProyecto(data.proyecto) : empty.proyecto,
        usuario: data?.usuario ? deserializerUsuario(data.usuario) : undefined
    }
}