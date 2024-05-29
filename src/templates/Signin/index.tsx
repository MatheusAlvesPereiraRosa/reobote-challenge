import React from "react"

import { useState } from "react"
import axios from "axios"

import { Link, useNavigate } from "react-router-dom"

import { motion } from "framer-motion"

import { RegisterForm } from "../../interfaces"
import { useAuth } from "../../context/authContext"

export const Register = () => {

    const { dispatch: authDispatch } = useAuth()

    const navigate = useNavigate()

    const FORM_RESET: RegisterForm = {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        persistent: true,
    }

    const [user, setUser] = useState<RegisterForm>({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        persistent: true,
    })

    const registerUser = async () => {
        await axios
            .post("https://teste.reobote.tec.br/api/register", user)
            .then((res) => {
                authDispatch({ type: "LOGIN", payload: res.data.access_token })
                console.log(res.data)
                setUser(FORM_RESET)
                navigate("/dashboard")
            })
            .catch((err) => {
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
        <main className="flex items-center justify-center h-screen bg-gradient-to-b from-slate-700 to-pink-800">
            <motion.form
                initial={{ opacity: 0, translateY: 50 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="p-6 bg-slate-800 rounded-md min-w-[450px]"
            >
                <div className="mb-4 flex flex-col">
                    <label className="mb-1 text-lg text-white" htmlFor="">Nome</label>
                    <input
                        className="bg-slate-950 border-slate-800 shadow appearance-none border rounded w-full py-2 px-3 text-white placeholder:text-slate-400 leading-tight focus:outline-none focus:shadow-outline"
                        name="name"
                        onChange={handleChange}
                        value={user.name}
                        type="text"
                    />
                </div>

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

                <div className="mb-4 flex flex-col">
                    <label className="mb-1 text-lg text-white" htmlFor="">Confirme sua senha</label>
                    <input
                        className="bg-slate-950 border-slate-800 shadow appearance-none border rounded w-full py-2 px-3 text-white placeholder:text-slate-400 leading-tight focus:outline-none focus:shadow-outline"
                        name="password_confirmation"
                        onChange={handleChange}
                        value={user.password_confirmation}
                        type="password"
                    />
                </div>

                <div className="flex justify-end">
                    <Link className="text-white" to="/">Já possui uma conta</Link>
                </div>

                <button
                    className="w-full px-6 py-4 mt-4 text-lg rounded-md text-white bg-pink-800 hover:bg-white hover:text-pink-800 transition"
                >
                    Cadastrar
                </button>
            </motion.form>
        </main>
    )
}