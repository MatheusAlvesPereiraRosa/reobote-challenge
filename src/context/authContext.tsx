import { createContext, useReducer, useContext, ReactNode, Dispatch } from "react";
import { logoutService } from "../services/authServices";
import { AuthState, User } from "./interfaces";

type Action =
    | { type: "LOGIN"; payload: string }
    | { type: "LOGOUT" }
    | { type: "SET_LOGGED_USER"; payload: User };

const getInitialAuthState = (): AuthState => {
    const token = localStorage.getItem("token");
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    return {
        isAuthenticated,
        token,
        loggedUser: null,
    };
};

const initialState: AuthState = getInitialAuthState();

interface AuthContextProps {
    state: AuthState;
    dispatch: Dispatch<Action>;
    logout: () => Promise<void>;
}

/** Creating auth context */
const AuthContext = createContext<AuthContextProps>({
    state: initialState,
    dispatch: () => undefined as unknown as Dispatch<Action>,
    logout: () => Promise.resolve(),
});

/** Reducer */
const authReducer = (state: AuthState, action: Action): AuthState => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("token", action.payload);
            localStorage.setItem("isAuthenticated", "true");
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload,
            };
        case "LOGOUT":
            localStorage.removeItem("token");
            localStorage.setItem("isAuthenticated", "false");
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

/** Auth hook */
export const useAuth = () => useContext(AuthContext);
