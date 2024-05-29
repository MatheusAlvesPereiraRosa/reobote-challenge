import { createContext, useReducer, useContext, ReactNode, Dispatch } from "react";
import { UsersState } from "./interfaces";

type Action =
    | { type: "SET_USERS_DATA"; payload: UsersState }
    | { type: "CLEAR_USERS_DATA" };

const initialState: UsersState = {
    number_users: 0,
    users: [],
};

interface UsersContextProps {
    state: UsersState;
    dispatch: Dispatch<Action>;
}

/** Contexto de usuários */
const UsersContext = createContext<UsersContextProps>({
    state: initialState,
    dispatch: () => undefined as unknown as Dispatch<Action>,
});

/** Reducer */
const usersReducer = (state: UsersState, action: Action): UsersState => {
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
export const UsersProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(usersReducer, initialState);

    return (
        <UsersContext.Provider value={{ state, dispatch }}>
            {children}
        </UsersContext.Provider>
    );
};

export const useUsers = () => useContext(UsersContext);
