import { useEffect, useState } from 'react';
import { motion } from 'framer-motion'


function BackToTop() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY || window.pageYOffset;
            setScrollY(currentY);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const gotoTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const gotoBottom = () => {
        const doc = document.documentElement;
        const body = document.body;

        const scrollHeight = Math.max(
            doc.scrollHeight,
            body.scrollHeight
        );

        window.scrollTo({ top: scrollHeight, behavior: "smooth" });
    };

    const handleClick = () => {
        if (scrollY <= 10) {
            gotoBottom();
        } else {
            gotoTop();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10 group cursor-pointer"
            onClick={handleClick}
        >
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="w-6 h-10 border-2 border-custom group-hover:border-amber-700 shadow-[0_0_5px_1px_#fff] rounded-full flex justify-center"
            >
                <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    className="w-1 h-3 bg-custom shadow-[0_0_5px_1px_#fff] group-hover:bg-amber-700 rounded-full mt-2"
                />
            </motion.div>
        </motion.div>
    )
}

export default BackToTop