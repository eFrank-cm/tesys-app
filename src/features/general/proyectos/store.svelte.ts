import { auth } from "../../auth/store.svelte";
import { ColaboracionSt } from "../colaboraciones/store.svelte";
import type { Proyecto } from "./model";
import { createProyecto, type ProyectoCreate } from "./services/createProyecto";
import { deleteProyecto } from "./services/deleteProyecto";
import { editProyectoById, type ProyectoUpdate } from "./services/editProyecto";
import { getProyectoById } from "./services/getProyectos";

interface ProyectoSt {
    current: Proyecto | null,

    load: (proyectoId: string) => Promise<void>
    create: (body: ProyectoCreate) => Promise<Proyecto | null>
    edit: (proyectoId: string, body: ProyectoUpdate) => Promise<Proyecto | null>
    delete: (proyectoId: string) => Promise<void>
    reset: () => void
    refresh: () => Promise<void>
}

export const ProyectoSt = $state<ProyectoSt>({
    current: null,

    async load(proyectoId) {
        const data = await getProyectoById(proyectoId)
        this.current = data
    },

    async create(body) {
        const data = await createProyecto(body)
        this.current = data
        return data
    },

    async edit(proyectoId, body) {
        const data = await editProyectoById(proyectoId, body)
        this.current = data
        return data
    },

    async delete(proyectoId) {
        if (!auth.user?.id) return
        await deleteProyecto(proyectoId)
        ColaboracionSt.load(auth.user.id)
    },

    reset() {
        ProyectoSt.current = null
    },

    async refresh() {
        if (this.current) await this.load(this.current?.id)
    },
})