/** Interfaces dos formulários da aplicação */
interface RegisterForm {
    name: string
    email: string
    password: string
    password_confirmation: string
    persistent: boolean
}

interface RegisterErrors {
    [key: string]: string | undefined;
    name?: string;
    email?: string;
    password?: string;
    password_confirmation?: string;
}

interface LoginForm {
    email: string
    password: string
    persistent: true
}

interface LoginErrors {
    [key: string]: string | undefined;
    email?: string;
    password?: string;
}

interface User {
    name: string
    email: string
}

interface Users {
    users: Users[]
}

export type { RegisterForm, RegisterErrors, LoginForm, LoginErrors, Users, User }