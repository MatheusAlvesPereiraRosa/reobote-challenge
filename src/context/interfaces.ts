interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
}

export type { AuthState }