import { deserializerUsuario, getEmptyUsuario, type Usuario } from "../../auth/models"
import { deserializerPropuesta, type Propuesta } from "../../planTesis/solicitarAsesoramiento/models"
import { deserializerProyecto, type Proyecto } from "../proyectos/model"

export interface Colaboracion {
    id: string
    role: string
    estado: string
    proyectoId: string
    createdAtISO: string
    updatedAtISO: string
    creatorId: string
    usuario?: Usuario
    proyecto?: Proyecto
    propuesta?: Propuesta
    creator?: Usuario
}

export function getEmptyColaboracion(): Colaboracion {
    return {
        id: '',
        role: '',
        estado: '',
        proyectoId: '',
        createdAtISO: '',
        updatedAtISO: '',
        creatorId: '',
    }
}

export function deserializerColaboracion(data: any): Colaboracion {
    const empty = getEmptyColaboracion()

    return {
        id: data?.id ?? empty.id,
        role: data?.role ?? empty.role,
        estado: data?.estado ?? empty.estado,
        proyectoId: data?.proyectoId ?? empty.proyectoId,
        createdAtISO: data?.createdAt ?? empty.createdAtISO,
        updatedAtISO: data?.updatedAt ?? empty.updatedAtISO,
        creatorId: data?.creatorId ?? empty.creatorId,
        usuario: deserializerUsuario(data.usuario),
        proyecto: deserializerProyecto(data.proyecto),
        propuesta: deserializerPropuesta(data.propuesta),
        creator: deserializerUsuario(data.creator)
    }
}