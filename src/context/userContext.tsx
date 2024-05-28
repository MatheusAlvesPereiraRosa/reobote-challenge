import { createContext, useReducer, useContext, ReactNode } from "react";

import { UsersState } from "./interfaces";

type Action =
    | { type: "SET_USERS_DATA"; payload: UsersState }
    | { type: "CLEAR_USERS_DATA" };

const initialState: UsersState = {
    number_users: 0,
    users: [],
};

/** Contexto de usuário */
const UserContext = createContext({
    state: initialState,
    dispatch: () => undefined,
});

/** Reducer */
const userReducer = (state: UsersState, action: Action): UsersState => {
    switch (action.type) {
        case "SET_USERS_DATA":
            return { ...action.payload };
        case "CLEAR_USERS_DATA":
            return { ...initialState };
        default:
            return state;
    }
};

interface Props {
    children: ReactNode;
}

/** Provider */
export const UserProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
