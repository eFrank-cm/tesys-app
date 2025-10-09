export interface UsuarioMinimal {
    id: string,
    nombres: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    email: string,
    username: string
}

export interface Usuario extends UsuarioMinimal {
    picture: string
    activo: boolean
    emailReseteo: string
    tipo: string
    fechaNacimiento: string
    genero: "M" | "F"
    celular: string
    aptoAsesor: boolean
    aptoRevisor: boolean
}

export function getEmptyUsuario(): Usuario {
    return {
        id: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        nombres: '',
        email: '',
        username: '',
        picture: '',
        activo: true,
        emailReseteo: '',
        tipo: '',
        fechaNacimiento: '',
        genero: 'M',
        celular: '',
        aptoAsesor: false,
        aptoRevisor: false
    }
}

export function deserializeUsuario(data: any): Usuario {
    const empty = getEmptyUsuario()
    return {
        id: data?.id ?? empty.id,
        apellidoPaterno: data?.apellidoPaterno ?? empty.apellidoPaterno,
        apellidoMaterno: data?.apellidoMaterno ?? empty.apellidoMaterno,
        nombres: data?.nombres ?? empty.nombres,
        email: data?.email ?? empty.email,
        username: data?.username ?? empty.username,
        picture: data?.picture ?? empty.picture,
        activo: data?.activo ?? empty.activo,
        emailReseteo: data?.emailReseteo ?? empty.emailReseteo,
        tipo: data?.tipo ?? empty.tipo,
        fechaNacimiento: data?.fechaNacimiento ?? empty.fechaNacimiento,
        genero: data?.genero ?? empty.genero,
        celular: data?.celular ?? empty.celular,
        aptoAsesor: data?.aptoAsesor ?? empty.aptoAsesor,
        aptoRevisor: data?.aptoRevisor ?? empty.aptoRevisor
    }
}

export function toUsuarioMinimal(u: Usuario): UsuarioMinimal {
    const { id, nombres, apellidoPaterno, apellidoMaterno, email, username } = u;
    return { id, nombres, apellidoPaterno, apellidoMaterno, email, username };
}
