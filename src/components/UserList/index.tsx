import React from "react"
import { UserItem } from "../UserItem"

export const UserList = () => {
    return (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10">
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
            <UserItem />
        </div>
    )
}