import { deserializerProyecto, type Proyecto } from "../proyecto/model"
import { deserializeUsuario, type UsuarioMinimal } from "../usuario/model"

export interface Colaboracion {
    id: string
    role: string
    estado: string
    createdAt: string
    updatedAt: string
    usuarioId: string
    proyectoId: string
    creatorId: string
    usuario?: UsuarioMinimal
    creator?: UsuarioMinimal
    proyecto?: Proyecto
}

export function getEmptyColaboracion(): Colaboracion {
    return {
        id: '',
        role: '',
        estado: '',
        proyectoId: '',
        createdAt: '',
        updatedAt: '',
        usuarioId: '',
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
        createdAt: data?.createdAt ?? empty.createdAt,
        updatedAt: data?.updatedAt ?? empty.updatedAt,
        usuarioId: data?.usuarioId ?? empty.usuarioId,
        creatorId: data?.creatorId ?? empty.creatorId,
        usuario: data?.usuario ? deserializeUsuario(data.usuario) : undefined,
        proyecto: data?.proyecto ? deserializerProyecto(data.proyecto) : undefined,
        creator: data?.creator ? deserializeUsuario(data.creator) : undefined
    }
}