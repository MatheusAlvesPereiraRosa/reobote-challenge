import { AnimatePresence, motion } from "framer-motion";

interface Props {
    message: string | Record<string, string[]> | null;
}

export const Alert = ({ message }: Props) => {
    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    key="alert"
                    initial={{ opacity: 0, translateX: 10 }}
                    exit={{ opacity: 0, translateX: -10 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    transition={{ duration: 0.5 }}
                    className="alert p-5 bg-purple-900 rounded-md"
                >
                    {typeof message === 'string' ? (
                        <p className="text-lg text-center text-white">{message}</p>
                    ) : (
                        Object.entries(message).map(([key, value]) => (
                            <div key={key}>
                                <p className="text-lg text-center text-white">{value}</p>
                            </div>
                        ))
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};
