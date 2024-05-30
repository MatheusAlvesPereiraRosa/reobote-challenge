/** Interfaces gerais dos contextos e dos usuários */
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

interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    loggedUser: User | null;
}

interface UiState {
    loading: boolean;
    alert: string | Record<string, string[]> | null;
}

export type { AuthState, User, UsersState, UiState }