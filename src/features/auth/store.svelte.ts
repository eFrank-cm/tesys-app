import { ColaboracionSt } from "../general/colaboraciones/store.svelte"
import { ProyectoSt } from "../general/proyectos/store.svelte"
import { type Usuario } from "./models";
import { getUsuarios } from "./services/getUsuarios";
import { verifyCredentials, verifyGoogleCredentials } from "./services/verifyCredentials";

const TOKEN_VAR_NAME = "token"
const USER_VAR_NAME = "user"

interface AuthState {
    user: Usuario | null
    token: string | null
    error: string | null
    loading: boolean

    login: (username?: string, password?: string, token?: string) => Promise<void>
    logout: () => void
    getUsers: () => Promise<Usuario[]>
}

export const auth = $state<AuthState>({
    user: null,
    token: null,
    error: null,
    loading: false,

    async login(username = '', password = '', token = '') {
        this.error = null
        this.loading = true

        try {
            let loginResponse = null
            if (token !== '' && password === '' && username === '') {
                loginResponse = await verifyGoogleCredentials(token)
            }
            else if (username !== '' && password !== '' && token === '') {
                loginResponse = await verifyCredentials({ username, password })
            }

            if (!loginResponse) return

            if (typeof window !== 'undefined') {
                localStorage.setItem(TOKEN_VAR_NAME, loginResponse.accessToken.token)
                localStorage.setItem(USER_VAR_NAME, JSON.stringify(loginResponse.user))
            }
            auth.token = loginResponse.accessToken.token
            console.log(loginResponse.user)
            auth.user = loginResponse.user
        }
        catch (error) {
            this.error = 'Error de conexion'
        }
        finally {
            this.loading = false
        }
    },

    logout() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(TOKEN_VAR_NAME)
            localStorage.removeItem(USER_VAR_NAME)
        }
        auth.token = null
        auth.user = null

        ProyectoSt.reset()
        ColaboracionSt.reset()
    },

    async getUsers() {
        const data = await getUsuarios()
        return data
    },
});


// Sincroniza al iniciar (solo en navegador)
if (typeof window !== 'undefined') {
    const token = localStorage.getItem(TOKEN_VAR_NAME);
    const user = localStorage.getItem(USER_VAR_NAME);
    if (token) auth.token = token;
    if (user) {
        try {
            auth.user = JSON.parse(user);
        } catch (e) {
            console.error("Error parsing user data from localStorage", e);
            auth.user = null;
        }
    } else {
        auth.user = null;
    }
}