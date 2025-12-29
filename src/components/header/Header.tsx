import React, { useRef, useState } from 'react'
import { cn } from '../../utils/cn'
import { motion, useMotionValueEvent, useScroll } from "motion/react"

const Header = () => {

    const [isHidden, setIsHidden] = useState<boolean>(false)

    const lastYPosition = useRef<number>(0)

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (y) => {

        const difference = y - lastYPosition.current;

        if (Math.abs(difference) > 40) {

            setIsHidden(difference > 0)

            lastYPosition.current = y;
        }

    })

    return (
        <header
            className={cn(
                "w-full h-auto relative",
                "flex justify-center "
            )}
        >
            <motion.div
                animate={isHidden ? "hidden" : "visible"}
                variants={{
                    hidden: {
                        y: "-150%",
                    },
                    visible: {
                        y: "0",
                    }
                }}

                transition={{
                    duration: 0.35,
                    type: "spring",
                    stiffness: 100,

                }}
                className={cn(
                    "bg-primary/20 w-[60rem] mx-auto p-4 fixed top-4 rounded-full "
                )}
            >

                <span>Price Sevak</span>

            </motion.div>


        </header>
    )
}

export default Header