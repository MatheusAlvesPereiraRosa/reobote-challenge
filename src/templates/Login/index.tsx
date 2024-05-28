import React from "react"

import { useState } from "react"
import axios from "axios"

import { motion } from "framer-motion"

import { useNavigate } from "react-router-dom"

import { LoginForm } from "../../interfaces"
import { Link } from "react-router-dom"
import { Alert } from "../../components/Alert"
import { useAuth } from "../../context/authContext"

export const Login = () => {

    const { dispatch: authDispatch } = useAuth()

    const navigate = useNavigate()

    const FORM_RESET: LoginForm = {
        email: "",
        password: "",
        persistent: true,
    }

    const [user, setUser] = useState<LoginForm>({
        email: "",
        password: "",
        persistent: true
    })

    const registerUser = async () => {
        await axios
            .post("https://teste.reobote.tec.br/api/login", user)
            .then((res) => {
                authDispatch({ type: "LOGIN", payload: res.data.access_token })
                console.log(res.data)
                setUser(FORM_RESET)
                navigate("/dashboard")
            })
            .catch((err) => {
                //setMessage(err.response.data)
                setUser(FORM_RESET)
                console.log(err.response.data)
            })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let { name, value } = e.target
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log(user)

        registerUser()
    }

    return (
        <>
            <Alert />
            <main className="flex items-center justify-center h-screen bg-gradient-to-b from-slate-700 to-pink-800">
                <motion.form
                    initial={{ opacity: 0, translateY: 50 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit}
                    className="p-6 bg-slate-800 rounded-md min-w-[450px]"
                >
                    <div className="mb-4 flex flex-col">
                        <label className="mb-1 text-lg text-white" htmlFor="">Email</label>
                        <input
                            className="bg-slate-950 border-slate-800 shadow appearance-none border rounded w-full py-2 px-3 text-white placeholder:text-slate-400 leading-tight focus:outline-none focus:shadow-outline"
                            name="email"
                            onChange={handleChange}
                            value={user.email}
                            type="text"
                        />
                    </div>

                    <div className="mb-4 flex flex-col">
                        <label className="mb-1 text-lg text-white" htmlFor="">Senha</label>
                        <input
                            className="bg-slate-950 border-slate-800 shadow appearance-none border rounded w-full py-2 px-3 text-white placeholder:text-slate-400 leading-tight focus:outline-none focus:shadow-outline"
                            name="password"
                            onChange={handleChange}
                            value={user.password}
                            type="password"
                        />
                    </div>

                    <div className="flex justify-end">
                        <Link className="text-white" to="/register">Não possui conta ainda?</Link>
                    </div>

                    <button
                        className="w-full px-6 py-4 mt-4 text-lg rounded-md text-white bg-pink-800 hover:bg-white hover:text-pink-800 transition"
                    >
                        Logar
                    </button>
                </motion.form>
            </main>
        </>
    )
}