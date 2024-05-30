import React from "react"

import { useState } from "react"
import axios from "axios"

import { Link, useNavigate } from "react-router-dom"

import { AnimatePresence, motion } from "framer-motion"

import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";

import { RegisterForm } from "../../interfaces"
import { RegisterErrors } from "../../interfaces"

import { useAuth } from "../../context/authContext"
import { useUi } from "../../context/uiContext"

export const Register = () => {

    const { dispatch: authDispatch } = useAuth()
    const { state: UiState, dispatch: uiDispatch } = useUi();

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

    const [errors, setErrors] = useState<RegisterErrors>({})
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState<boolean>(false);

    /** Validação do formulário */
    const validate = () => {
        const newErrors: RegisterErrors = {};

        if (!user.name || user.name === "") {
            newErrors.name = "Digite um nome"

        }

        if (!user.email || user.email === "") {
            newErrors.email = "Digite um nome"
        }

        if (!user.password || user.password === "") {
            newErrors.password = "Digite uma senha"
        }

        if (user.password.length < 8) {
            newErrors.password = "Digite com mais de 8 caracteres"
        }

        if (!user.password_confirmation || user.password_confirmation === "") {
            newErrors.password_confirmation = "Digite a senha novamente"
        }

        if (user.password !== user.password_confirmation) {
            newErrors.password_confirmation = "A senha e a confirmação de senha tem que ser iguais!"
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return false
        }

        return true
    }

    /** Registro do usuário */
    const registerUser = async () => {

        if (!validate()) return

        await axios
            .post("https://teste.reobote.tec.br/api/register", user)
            .then((res) => {
                authDispatch({ type: "LOGIN", payload: res.data.access_token })
                uiDispatch({ type: "SET_ALERT", payload: "Registro realizado com sucesso" })
                console.log(res.data)
                setUser(FORM_RESET)
                navigate("/dashboard")
            })
            .catch((err) => {
                setUser(FORM_RESET)
                uiDispatch({ type: "SET_ALERT", payload: err.response.data })
                console.log(err.response.data)
            })
            .finally(() => {
                uiDispatch({ type: "CLEAR_ALERT" })
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

        registerUser()
    }

    return (
        <main className="flex items-center justify-center min-h-screen py-10 bg-gradient-to-b from-slate-700 to-pink-800">
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
                        placeholder="John Doe"
                    />
                    <AnimatePresence>
                        {
                            errors.name &&
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="text-md text-pink-600 font-bold mt-1">
                                {errors.name}
                            </motion.span>
                        }
                    </AnimatePresence>
                </div>

                <div className="mb-4 flex flex-col">
                    <label className="mb-1 text-lg text-white" htmlFor="">Email</label>
                    <input
                        className="bg-slate-950 border-slate-800 shadow appearance-none border rounded w-full py-2 px-3 text-white placeholder:text-slate-400 leading-tight focus:outline-none focus:shadow-outline"
                        name="email"
                        onChange={handleChange}
                        value={user.email}
                        type="text"
                        placeholder="JohnDoe@gmail.com"
                    />
                    <AnimatePresence>
                        {
                            errors.email &&
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
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
                                transition={{ duration: 0.3 }}
                                className="text-md text-pink-600 font-bold mt-1">{errors.password}</motion.span>
                        }
                    </AnimatePresence>
                </div>

                <div className="mb-4 flex flex-col">
                    <label className="mb-1 text-lg text-white" htmlFor="">Confirme sua senha</label>
                    <div className="relative">
                        <input
                            className="bg-slate-950 border-slate-800 shadow appearance-none border rounded w-full py-2 px-3 text-white placeholder:text-slate-400 leading-tight focus:outline-none focus:shadow-outline"
                            name="password_confirmation"
                            onChange={handleChange}
                            value={user.password_confirmation}
                            type={showPasswordConfirmation ? "text" : "password"}
                            placeholder="Password confirmation"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 px-3 py-2 text-white"
                            onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                        >
                            {showPasswordConfirmation ? <IoMdEyeOff size={20} /> : <FaEye size={20} />}
                        </button>
                    </div>
                    <AnimatePresence>
                        {
                            errors.password_confirmation &&
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, size: 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-md text-pink-600 font-bold mt-1">{errors.password_confirmation}
                            </motion.span>
                        }
                    </AnimatePresence>
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