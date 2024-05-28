import { createContext, useReducer, useContext, ReactNode, useEffect, Dispatch } from "react";
import { logoutService } from "../services/authServices";

import { AuthState, User } from "./interfaces";

type Action =
    | { type: "LOGIN"; payload: string }
    | { type: "LOGOUT" }
    | { type: "SET_LOGGED_USER"; payload: User };

const initialState: AuthState = {
    isAuthenticated: false,
    token: null,
    loggedUser: null,
};

interface AuthContextProps {
    state: AuthState;
    dispatch: Dispatch<Action>;
    logout: () => Promise<void>;
}

/** Criando contexto de autenticação */
const AuthContext = createContext<AuthContextProps>({
    state: initialState,
    dispatch: () => undefined as unknown as Dispatch<Action>,
    logout: () => Promise.resolve(),
});

/** Reducer */
const authReducer = (state: AuthState, action: Action): AuthState => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload,
            };
        case "LOGOUT":
            return {
                isAuthenticated: false,
                token: null,
                loggedUser: null,
            };
        case "SET_LOGGED_USER":
            return {
                ...state,
                loggedUser: action.payload,
            };
        default:
            return state;
    }
};

interface Props {
    children: ReactNode;
}

/** Provider */
export const AuthProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            dispatch({ type: "LOGIN", payload: storedToken });
        }
    }, []);

    const logout = async () => {
        if (state.loggedUser && state.token) {
            await logoutService(state.loggedUser.email, state.token);
            dispatch({ type: "LOGOUT" });
        }
    };

    return (
        <AuthContext.Provider value={{ state, dispatch, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

/** Hook de autenticação */
export const useAuth = () => useContext(AuthContext);
