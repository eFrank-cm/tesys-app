export interface Usuario {
    id: string
    email: string
    username: string
    picture: string
}

export function getEmptyUsuario(): Usuario {
    return {
        id: '',
        username: '',
        email: '',
        picture: ''
    }
}

export function deserializerUsuario(data: any): Usuario {
    const empty = getEmptyUsuario()
    return {
        id: data.id || empty.id,
        username: data.username || empty.username,
        email: data.email || empty.email,
        picture: data.picture || empty.picture,
    }
}
