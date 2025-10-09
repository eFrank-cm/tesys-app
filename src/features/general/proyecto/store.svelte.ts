import type { Proyecto } from "./model";
import { createProyecto, type ProyectoCreate } from "./services/createProyecto";
import { deleteProyecto } from "./services/deleteProyecto";
import { editProyectoById, type ProyectoUpdate } from "./services/editProyecto";
import { getProyectoById } from "./services/getProyectoById";
import { getProyectos } from "./services/getProyectos";

interface ProyectoStore {
    get: (proyectoId: string) => Promise<Proyecto | null>
    getAll: () => Promise<Proyecto[]>
    create: (body: ProyectoCreate) => Promise<Proyecto>
    edit: (proyectoId: string, body: ProyectoUpdate) => Promise<Proyecto>
    delete: (proyectoId: string) => Promise<void>
}

export const ProyectoStore = $state<ProyectoStore>({

    async get(proyectoId) {
        const data = await getProyectoById(proyectoId)
        return data
    },

    async getAll() {
        const data = await getProyectos()
        return data
    },

    async create(body) {
        const data = await createProyecto(body)
        return data
    },

    async edit(proyectoId, body) {
        const data = await editProyectoById(proyectoId, body)
        return data
    },

    async delete(proyectoId) {
        await deleteProyecto(proyectoId)
    },
})