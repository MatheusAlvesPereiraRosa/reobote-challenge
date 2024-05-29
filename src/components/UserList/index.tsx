import { UserItem } from "../UserItem"
import { User } from "../../context/interfaces"

interface Props {
    users: User[]
}

export const UserList = ({ users }: Props) => {
    return (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10">
            {users.map((user) => (
                <UserItem key={user.id} user={user} />
            ))}
        </div>
    )
}