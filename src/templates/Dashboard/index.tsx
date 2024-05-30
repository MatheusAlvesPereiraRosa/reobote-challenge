import { useState, useEffect } from "react"

import { Navbar } from "../../components/Navbar"
import { UserList } from "../../components/UserList"
import { Loading } from "../../components/Loading"

import { useAuth } from "../../context/authContext"
import { useUsers } from "../../context/userContext"
import { useUi } from "../../context/uiContext"

import { logoutService } from "../../services/authServices"

import axios from "axios"

import { useNavigate } from "react-router-dom"
import { Alert } from "../../components/Alert"
import { RefreshButton } from "../../components/Reload"

export const Dashboard = () => {
    const { state: usersState, dispatch: userDispatch } = useUsers();
    const { state: authState, dispatch: authDispatch } = useAuth();
    const { state: UiState, dispatch: uiDispatch } = useUi()

    const [animatedCount, setAnimatedCount] = useState(0);

    const navigate = useNavigate();

    const setupDashboard = async () => {
        uiDispatch({ type: "SET_LOADING" })
        await axios
            .get("https://teste.reobote.tec.br/api/dashboard", {
                headers: {
                    "Authorization": `Bearer ${authState.token}`
                }
            })
            .then((res) => {
                authDispatch({ type: "SET_LOGGED_USER", payload: res.data.logged_user })
                userDispatch({ type: "SET_USERS_DATA", payload: res.data })
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err.response.data)
            })
            .finally(() => {
                uiDispatch({ type: "CLEAR_LOADING" })
            })
    }

    const handleLogout = async () => {
        if (authState.loggedUser && authState.token) {

            await logoutService(authState.loggedUser.email, authState.token);

            authDispatch({ type: "LOGOUT" });

            uiDispatch({ type: "SET_ALERT", payload: "Logout successful!" })

            setTimeout(() => {
                uiDispatch({ type: "CLEAR_ALERT" })
            }, 3000)

            navigate('/');
        }
    };


    useEffect(() => {
        setupDashboard()
    }, []);

    /** Contador de usuários */
    useEffect(() => {
        let start = 0;
        const end = usersState.number_users;
        if (start === end) return;

        const duration = 2000; // 2 seconds
        const totalFrames = Math.round(duration / 16); // 60fps
        let frame = 0;

        const timer = setInterval(() => {
            frame += 1;

            const progress = frame / totalFrames;
            const increment = Math.pow(progress, 2) * end; // efeito de aceleração

            start = Math.min(end, start + Math.ceil(increment / totalFrames));
            setAnimatedCount(start);

            if (start >= end) clearInterval(timer);
        }, 16); // ~60fps

        return () => clearInterval(timer);
    }, [usersState.number_users]);

    return (
        <>
            <Alert message={UiState.alert} />
            <Navbar handleLogout={handleLogout} logged_user={authState.loggedUser} loading={UiState.loading} />
            {!UiState.loading !== true ?
                <Loading />
                :
                <main className="flex flex-col px-16 pb-10">
                    <h1 className="text-3xl text-white text-center my-14">Usuários cadastrados: {animatedCount}</h1>

                    <UserList users={usersState.users} />
                </main>
            }
            <RefreshButton refresh={setupDashboard} />
        </>
    )
}