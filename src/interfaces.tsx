/** Interfaces da aplicação */
interface RegisterForm {
    name: string
    email: string
    password: string
    password_confirmation: string
    persistent: boolean
}

interface LoginForm {
    email: string
    password: string
    persistent: true
}

interface User {
    name: string
    email: string
}

interface Users {
    users: Users[]
}

export type { RegisterForm, LoginForm, Users, User }