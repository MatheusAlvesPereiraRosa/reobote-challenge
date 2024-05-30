import React, { createContext, useReducer, useContext, ReactNode } from 'react';
interface UiState {
    loading: boolean;
    alert: string | Record<string, string[]> | null;
}

type Action =
    | { type: 'SET_LOADING' }
    | { type: 'CLEAR_LOADING' }
    | { type: 'SET_ALERT'; payload: string }
    | { type: 'CLEAR_ALERT' };

const initialState: UiState = {
    loading: false,
    alert: null,
};

const UiContext = createContext<{
    state: UiState;
    dispatch: React.Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => undefined,
});

const uiReducer = (state: UiState, action: Action): UiState => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, loading: true };
        case 'CLEAR_LOADING':
            return { ...state, loading: false };
        case 'SET_ALERT':
            return { ...state, alert: action.payload };
        case 'CLEAR_ALERT':
            return { ...state, alert: null };
        default:
            return state;
    }
};

export const UiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(uiReducer, initialState);
    return (
        <UiContext.Provider value={{ state, dispatch }}>
            {children}
        </UiContext.Provider>
    );
};

export const useUi = () => useContext(UiContext);
