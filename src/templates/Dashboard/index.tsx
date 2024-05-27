import React from "react"

import { Navbar } from "../../components/Navbar"
import { UserList } from "../../components/UserList"


export const Dashboard = () => {
    return (
        <>
            <Navbar />
            <main className="flex flex-col px-16 pb-10">
                <h1 className="text-3xl text-white text-center my-14">Usuários cadastrados</h1>

                <UserList />
            </main>
        </>
    )
}