export interface AuthUser {
    id: string
    email: string
    apellidoPaterno: string
    apellidoMaterno: string
    nombres: string
    username: string
    picture: string
}


export interface LoginResponse {
    detail: string
    user: AuthUser
    accessToken: {
        token: string
        tokenType: string
    }
}

export function getEmptyAuthUser(): AuthUser {
    return {
        id: '',
        username: '',
        email: '',
        picture: '',
        nombres: '',
        apellidoMaterno: '',
        apellidoPaterno: ''
    }
}

export function deserializerAuthUser(data: any): AuthUser {
    const empty = getEmptyAuthUser()
    return {
        id: data?.id ?? empty.id,
        username: data?.username ?? empty.username,
        email: data?.email ?? empty.email,
        picture: data?.picture ?? empty.picture,
        nombres: data?.nombres ?? empty.nombres,
        apellidoMaterno: data?.apellidoMaterno ?? empty.apellidoMaterno,
        apellidoPaterno: data?.apellidoPaterno ?? empty.apellidoPaterno
    }
}


