import { useState } from "react"
import axios from "axios"

export const Home = () => {

    const FORM_RESET: UserForm = {
        name: "",
        email: "",
        password: "",
        password_confirm: "",
        persistent: true,
    }

    const [user, setUser] = useState<UserForm>({
        name: "",
        email: "",
        password: "",
        password_confirm: "",
        persistent: true,
    })

    const registerUser = async () => {
        await axios
            .post("https://teste.reobote.tec.br/api/register", user)
            .then((res) => {
                setMessage(res.data)
                console.log(res.data)
                setUser(FORM_RESET)
            })
            .catch((err) => {
                setMessage(err.response.data)
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

        registerUser()
    }

    return (
        <main className="flex items-center justify-center h-screen bg-slate-600">
            <form onSubmit={handleSubmit} className="p-6 bg-slate-800 rounded-md min-w-[400px]">
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
                        value={user.name}
                        type="text"
                    />
                </div>

                <div className="mb-4 flex flex-col">
                    <label className="mb-1 text-lg text-white" htmlFor="">Senha</label>
                    <input
                        className="bg-slate-950 border-slate-800 shadow appearance-none border rounded w-full py-2 px-3 text-white placeholder:text-slate-400 leading-tight focus:outline-none focus:shadow-outline"
                        name="password"
                        onChange={handleChange}
                        value={user.name}
                        type="password"
                    />
                </div>

                <div className="mb-4 flex flex-col">
                    <label className="mb-1 text-lg text-white" htmlFor="">Confirme sua senha</label>
                    <input
                        className="bg-slate-950 border-slate-800 shadow appearance-none border rounded w-full py-2 px-3 text-white placeholder:text-slate-400 leading-tight focus:outline-none focus:shadow-outline"
                        name="password_confirm"
                        onChange={handleChange}
                        value={user.name}
                        type="password"
                    />
                </div>

                <button
                    className="w-full px-6 py-4 mt-4 text-lg rounded-md text-white bg-pink-800 hover:bg-white hover:text-pink-800 transition"
                >
                    Cadastrar
                </button>
            </form>
        </main>
    )
}