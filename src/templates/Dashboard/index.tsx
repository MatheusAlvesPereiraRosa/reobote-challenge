import { useEffect } from "react"

import { Navbar } from "../../components/Navbar"
import { UserList } from "../../components/UserList"

import { useAuth } from "../../context/authContext"
import { useUsers } from "../../context/userContext"

import { logoutService } from "../../services/authServices"

import axios from "axios"

import { useNavigate } from "react-router-dom"

export const Dashboard = () => {
    const { state: usersState, dispatch: userDispatch } = useUsers();
    const { state: authState, dispatch: authDispatch } = useAuth();

    const navigate = useNavigate();

    const setupDashboard = async () => {
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
    }

    const handleLogout = async () => {
        if (authState.loggedUser && authState.token) {
            await logoutService(authState.loggedUser.email, authState.token);
            authDispatch({ type: "LOGOUT" });
            navigate('/');
        }
    };


    useEffect(() => {
        setupDashboard()
    }, []);


    return (
        <>
            <Navbar handleLogout={handleLogout} logged_user={authState.loggedUser}/>
            <main className="flex flex-col px-16 pb-10">
                <h1 className="text-3xl text-white text-center my-14">Usuários cadastrados</h1>

                <UserList users={usersState.users} />
            </main>
        </>
    )
}