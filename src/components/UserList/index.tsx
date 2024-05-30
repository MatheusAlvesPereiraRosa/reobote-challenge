import { useState } from 'react';

import { Pagination } from '../Pagination';
import { UserItem } from '../UserItem';

import { User } from "../../context/interfaces"

interface Props {
    users: User[];
}

export const UserList = ({ users }: Props) => {
    /* Paginação dos usuários */
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 12;

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <section>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10">
                {currentUsers.map((user, index) => (
                    <UserItem key={user.id} index={index} user={user} />
                ))}
            </div>
            <Pagination
                usersPerPage={usersPerPage}
                currentPage={currentPage}
                totalUsers={users.length}
                paginate={paginate}
            />
        </section>
    );
};
