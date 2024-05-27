import React from "react"
import { FaUser } from "react-icons/fa";

import { motion } from "framer-motion"

import { MdEmail } from "react-icons/md";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { MdVerifiedUser } from "react-icons/md";
import { HiPencilAlt } from "react-icons/hi";
import { HiUserAdd } from "react-icons/hi";

export const UserItem = () => {
    return (
        <motion.div
            initial={{ opacity: 0, translateY: 50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6 bg-cyan-950 rounded-md"
        >
            <div className="flex items-center border-b-2 pb-2 mb-2 border-white">
                <span className="text-white me-1"><FaUser size={15} /></span>
                <h1 className="text-white text-lg">
                    fulano
                </h1>
            </div>

            <div className="flex items-center mb-1">
                <span className="text-white me-1"><AiOutlineFieldNumber size={18} /></span>
                <p className="text-white">ID: 1</p>
            </div>

            <div className="flex items-center mb-1">
                <span className="text-white me-1"><MdEmail size={18} /></span>
                <p className="text-white">Email: example@gmail.com</p>
            </div>

            <div className="flex items-center mb-1">
                <span className="text-white me-1"><MdVerifiedUser size={18} /></span>
                <p className="text-white">Email verficado: Não</p>
            </div>

            <div className="flex items-center mb-1">
                <span className="text-white me-1"><HiUserAdd size={18} /></span>
                <p className="text-white">Criado em: 2024-05-27T19:24:59.000000Z</p>
            </div>
            
            <div className="flex items-center">
                <span className="text-white me-1"><HiPencilAlt size={18} /></span>
                <p className="text-white">Atualizado em: 2024-05-27T19:24:59.000000Z</p>
            </div>
        </motion.div>
    )
}