import { auth } from "../../auth/store.svelte";
import type { Propuesta } from "../../planTesis/solicitarAsesoramiento/models";
import { ProyectoSt } from "../proyectos/store.svelte";
import type { Colaboracion } from "./model";
import { createColaboracionSolicitarAsesor, type SolicitudAsesoramiento } from "./services/createColaboracion";
import { eliminarColaboracion } from "./services/deleteColaboracion";
import { getColaboracionesByUsuarioId, getSolicitudAsesoramiento } from "./services/getColaboraciones";
import { respondInvitation } from "./services/updateColaboracion";

interface ColaboracionSt {
    colaboraciones: Colaboracion[],

    load: (usuarioId: string) => Promise<void>
    reset: () => void
    getSolicitudProyectoActual: () => Promise<Colaboracion | null>
    invitarAsesor: (titulo: string, resumen: string, usuarioId: string) => Promise<Colaboracion | null>
    responderSolicitudAsesor: (colaboracionId: string, aceptar: 'ACEPTADO' | 'RECHAZADO') => Promise<Colaboracion | null>
    cancelarInvitacion: (colaboracionId: string) => Promise<void>
}

export const ColaboracionSt = $state<ColaboracionSt>({
    colaboraciones: [],

    load: async (usuarioId) => {
        const data = await getColaboracionesByUsuarioId(usuarioId)
        ColaboracionSt.colaboraciones = data
    },

    reset: () => {
        ColaboracionSt.colaboraciones = []
    },

    async getSolicitudProyectoActual() {
        if (!ProyectoSt.current) return null
        return await getSolicitudAsesoramiento(ProyectoSt.current.id)
    },

    async invitarAsesor(titulo, resumen, usuarioId) {
        if (!ProyectoSt.current || !auth.user) return null
        const data = await createColaboracionSolicitarAsesor({
            usuarioId, titulo, resumen,
            proyectoId: ProyectoSt.current.id,
            creatorId: auth.user.id
        })
        console.log(data, 'data nueva colaboracion')
        await ProyectoSt.refresh()
        return data
    },

    async responderSolicitudAsesor(colaboracionId, aceptar) {
        if (!ProyectoSt.current) return null
        const data = await respondInvitation(colaboracionId, aceptar)
        return data
    },

    async cancelarInvitacion(colaboracionId) {
        await eliminarColaboracion(colaboracionId)
        await ProyectoSt.refresh()
    },

})