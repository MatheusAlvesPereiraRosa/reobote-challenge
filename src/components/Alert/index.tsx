import React from "react"
import { motion } from "framer-motion"

export const Alert = () => {
    return (
        <motion.div
            className="alert p-5 bg-slate-800 rounded-md"
        >
            <p className="text-lg text-center text-white">Uma mensagem qualquer</p>
        </motion.div>
    )
}