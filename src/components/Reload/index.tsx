import { GrRefresh } from "react-icons/gr";
import { motion } from "framer-motion";

interface Props {
    refresh: () => {}
}

export const RefreshButton = ({ refresh }: Props) => (
    <div className="fixed bottom-10 right-4 z-10">
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={refresh}
            className="p-5 bg-purple-800 aspect-square rounded-full"
        >
            <GrRefresh className="text-white" size={25} />
        </motion.button>
    </div>
)