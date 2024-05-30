import { AnimatePresence, motion } from "framer-motion"

interface Props {
    message: string | Record<string, string[]> | null;
}

export const Alert = ({ message }: Props) => {
    if (!message) return null

    if (typeof message === 'string') {
        return (
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, translateX: 10 }}
                    exit={{ opacity: 0, translateX: 10 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ duration: 0.5 }}
                    className="alert p-5 bg-slate-800 rounded-md"
                >
                    <p className="text-lg text-center text-white">{message}</p>
                </motion.div>
            </AnimatePresence>
        )
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, translateX: 10 }}
                exit={{ opacity: 0, translateX: 10 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ duration: 0.5 }}
                className="alert p-5 bg-slate-800 rounded-md"
            >
                {Object.entries(message).map(([key, value]) => (
                    <div key={key}>
                        <p className="text-lg text-center text-white">{key}: {value}</p>
                    </div>
                ))}

            </motion.div>
        </AnimatePresence>
    )
}