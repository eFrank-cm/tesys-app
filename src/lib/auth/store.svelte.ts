import { type AuthUser } from "./models";
import { verifyCredentials } from "./services/verifyCredentials";
import { verifyGoogleCredentials } from "./services/verifyGoogleCredentials";

const TOKEN_VAR_NAME = "token"
const USER_VAR_NAME = "user"

interface AuthStore {
    user: AuthUser | null
    token: string | null
    error: string | null
    loading: boolean

    login: (username?: string, password?: string, token?: string) => Promise<string>
    logout: () => void
    getRedirectPath: () => string
    hasRole: (role: string) => boolean
}

export const authStore = $state<AuthStore>({
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
                loginResponse = await verifyGoogleCredentials({ token })
            }
            else if (username !== '' && password !== '' && token === '') {
                loginResponse = await verifyCredentials({ username, password })
            }

            if (!loginResponse) return ''

            if (typeof window !== 'undefined') {
                localStorage.setItem(TOKEN_VAR_NAME, loginResponse.accessToken.token)
                localStorage.setItem(USER_VAR_NAME, JSON.stringify(loginResponse.user))
            }
            this.token = loginResponse.accessToken.token
            this.user = loginResponse.user
            console.log(`user: ${this.user}`)
            const path = this.getRedirectPath()
            console.log(`path: ${path}`)
            return path
        }
        catch (error) {
            this.error = 'Error de conexion'
            return ''
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
        this.token = null
        this.user = null
    },

    getRedirectPath() {
        if (!this.user) {
            this.logout()
            return '/'
        }

        const tipo = this.user.tipo.toUpperCase()
        if (tipo === 'ADMIN') {
            console.log(`retornar admin`)
            return '/'
        }
        else if (tipo === 'NORMAL') {
            return '/proyectos'
        }
        else {
            this.logout()
            return '/'
        }
    },

    hasRole(role) {
        if (!this.user) return false
        return this.user.tipo === role
    },
});


// Sincroniza al iniciar (solo en navegador)
if (typeof window !== 'undefined') {
    const token = localStorage.getItem(TOKEN_VAR_NAME);
    const user = localStorage.getItem(USER_VAR_NAME);
    if (token) authStore.token = token;
    if (user) {
        try {
            authStore.user = JSON.parse(user);
        } catch (e) {
            console.error("Error parsing user data from localStorage", e);
            authStore.user = null;
        }
    } else {
        authStore.user = null;
    }
}