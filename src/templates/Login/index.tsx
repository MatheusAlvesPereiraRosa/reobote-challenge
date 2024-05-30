import React from "react"

import { useState } from "react"
import axios from "axios"

import { AnimatePresence, motion } from "framer-motion"

import { useNavigate } from "react-router-dom"

import { LoginForm } from "../../interfaces"
import { LoginErrors } from "../../interfaces"

import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";

import { Link } from "react-router-dom"
import { Alert } from "../../components/Alert"
import { useAuth } from "../../context/authContext"
import { useUi } from "../../context/uiContext"

export const Login = () => {

    const { dispatch: authDispatch } = useAuth()
    const { state: UiState, dispatch: uiDispatch } = useUi()

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

    const [errors, setErrors] = useState<LoginErrors>({})
    const [showPassword, setShowPassword] = useState<boolean>(false);

    /** Validação do formulário */
    const validate = () => {
        const newErrors: LoginErrors = {};

        if (!user.email || user.email === "") {
            newErrors.email = "Digite seu nome"
        }

        if (!user.password || user.password === "") {
            newErrors.password = "Digite sua senha"
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return false
        }

        return true
    }

    const registerUser = async () => {
        await axios
            .post("https://teste.reobote.tec.br/api/login", user)
            .then((res) => {
                authDispatch({ type: "LOGIN", payload: res.data.access_token })
                uiDispatch({ type: "SET_ALERT", payload: "Login realizado com sucesso" })
                console.log(res.data)
                setUser(FORM_RESET)
                navigate("/dashboard")
            })
            .catch((err) => {
                //setMessage(err.response.data)
                setUser(FORM_RESET)
                uiDispatch({ type: "SET_ALERT", payload: err.response.data })
                console.log(err.response.data)
            })
            .finally(() => {
                setTimeout(() => {
                    uiDispatch({ type: "CLEAR_ALERT" })
                }, 5000)
            })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let { name, value } = e.target
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }))

        setErrors(prevState => {
            const { [name]: _, ...rest } = prevState;
            return rest;
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!validate()) return

        registerUser()
    }

    return (
        <>
            <Alert message={UiState.alert} />
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
                            placeholder="John Doe"
                        />
                        <AnimatePresence>
                            {
                                errors.email &&
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-md text-pink-600 font-bold mt-1"
                                >
                                    {errors.email}
                                </motion.span>
                            }
                        </AnimatePresence>
                    </div>

                    <div className="mb-4 flex flex-col">
                        <label className="mb-1 text-lg text-white" htmlFor="">Senha</label>
                        <div className="relative">
                            <input
                                className="bg-slate-950 border-slate-800 shadow appearance-none border rounded w-full py-2 px-3 text-white placeholder:text-slate-400 leading-tight focus:outline-none focus:shadow-outline"
                                name="password"
                                onChange={handleChange}
                                value={user.password}
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 px-3 py-2 text-white"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <IoMdEyeOff size={20} /> : <FaEye size={20} />}
                            </button>
                        </div>
                        <AnimatePresence>
                            {
                                errors.password &&
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-md text-pink-600 font-bold mt-1"
                                >
                                    {errors.password}
                                </motion.span>
                            }
                        </AnimatePresence>
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