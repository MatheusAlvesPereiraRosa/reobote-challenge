import { motion } from "framer-motion"

interface Props {
    usersPerPage: number;
    currentPage: number;
    totalUsers: number;
    paginate: (pageNumber: number) => void;
}

export const Pagination = ({ usersPerPage, totalUsers, currentPage, paginate }: Props) => {
    /* Cálculando número de páginas */
    const pageNumbers = [];
    const totalPages = Math.ceil(totalUsers / usersPerPage);

    /* Cálculando página inicial e final*/
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) {
            pageNumbers.push(-1);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            pageNumbers.push(-1);
        }
        pageNumbers.push(totalPages);
    }

    return (
        <nav className='border-t-4 pb-2 mt-12 border-pink-600'>
            <ul className="flex justify-center mt-8 mb-6">
                {pageNumbers.map((number, index) => (
                    <li key={index} className="mx-3">
                        {number === -1 ? (
                            <span className="text-pink-600 font-bold">. . .</span>
                        ) : (
                            <motion.button
                                whileTap={{ scale: 0.8 }}
                                transition={{ duration: 0.1 }}
                                onClick={() => paginate(number)}
                                className={`bg-pink-600 text-white text-md min-w-[2.25rem] min-h-[2.25rem] rounded-full cursor-pointer hover:bg-purple-900 transition-colors ${currentPage === number ? 'bg-purple-900' : ''}`}
                            >
                                {number}
                            </motion.button>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};