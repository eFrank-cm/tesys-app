export interface Propuesta {
    id: string
    titulo: string
    resumen: string
    keywords: string[]
    createAt: Date
    updateAt: Date
}

export const emptyPropuesta: Propuesta = {
    id: '',
    titulo: '',
    resumen: '',
    keywords: [],
    createAt: new Date(),
    updateAt: new Date()
}