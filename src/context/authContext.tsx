import { createContext, useReducer, useContext, ReactNode } from "react"
import { AuthState } from "./interfaces"

type Action =
    | { type: "LOGIN"; payload: string }
    | { type: "LOGOUT" }

const initialState: AuthState = {
    isAuthenticated: false,
    token: null
}

/** Contexto de autenticação */
const AuthContext = createContext({ state: initialState, dispatch: () => undefined })

/** Reducer */
const authReducer = (state: AuthState, action: Action): AuthState => {
    switch (action.type) {
        case "LOGIN":
            return { isAuthenticated: true, token: action.payload }
        case "LOGOUT":
            return { isAuthenticated: false, token: null }
        default:
            return state
    }
}

interface Props {
    children: ReactNode
}

/** Provider */
export const AuthProvider = ({children}: Props) => {
    const [state, dispatch] = useReducer(authReducer, initialState)

    return (
        <AuthContext.Provider value={{state, dispatch}} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

