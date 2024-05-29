import { ReactNode } from 'react';
import { useAuth } from '../../context/authContext';
import { Navigate } from 'react-router-dom';

interface Props {
    children: ReactNode
}

const AuthGuard = ({ children }: Props) => {
    const { state: authState } = useAuth();

    if (authState.isAuthenticated === false || authState.token === null) {
        console.log("Não está autenticado", authState)
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};

export default AuthGuard;
