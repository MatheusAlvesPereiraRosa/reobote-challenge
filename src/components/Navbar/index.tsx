import { Link } from "react-router-dom"

import { motion } from "framer-motion"

import { GrLogout } from "react-icons/gr";
import { FaUserCircle } from "react-icons/fa";
import { User } from "../../context/interfaces";

interface Props {
    handleLogout: () => {}
    logged_user: User | null
    loading: boolean
}

export const Navbar = ({ handleLogout, logged_user, loading }: Props) => {
    return (
        <nav className="bg-pink-800">
            <ul className="flex justify-between">
                <motion.div>
                    <motion.li
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.1 }}
                        className="p-6 hover:text-white"
                    >
                        <Link className="font-bold text-lg " to="/dashboard">
                            Dashboard
                        </Link>
                    </motion.li>
                </motion.div>
                <motion.div className="flex flex-row items-center me-3">
                    <motion.li className="flex flex-row items-center py-2 px-3 bg-slate-900 rounded-full text-pink-600">
                        <span className="me-2"><FaUserCircle size={28} /></span>
                        {loading === true ?
                            <div className="skeleton h-6 w-24 rounded-md bg-pink-600"></div>
                            :
                            <p className="m-0">{logged_user?.name}</p>
                        }
                        <motion.div
                            whileTap={{ scale: 0.9 }}
                            whileHover={{ scale: 1.2 }}
                            className="flex items-center ms-3"
                        >
                            <div onClick={handleLogout} className="hover:text-white transition">
                                <span><GrLogout size={24} /></span>
                            </div>
                        </motion.div>
                    </motion.li>
                </motion.div>
            </ul>
        </nav>
    )
}