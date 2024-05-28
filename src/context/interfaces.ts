/** AuthContext interfaces */
interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    loggedUser: User | null;
}

/** Interfaces gerais dos contextos */
interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

interface UsersState {
    number_users: number;
    users: User[];
}

export type { AuthState, User, UsersState }