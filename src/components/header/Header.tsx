import React, { useRef, useState } from 'react'
import { cn } from '../../utils/cn'
import { motion, useMotionValueEvent, useScroll } from "motion/react"
import Button from '../ui/Button'
import Signin from '../icons/Signin'

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
                    " w-[60rem] mx-auto p-2 pr-2 pl-6 ",
                    "bg-primary/20 rounded-full",
                    "fixed top-4",
                    "flex justify-between items-center"
                )}
            >

                <div>

                    <span className={cn(
                        "font-extrabold font-heading tracking-wider text-2xl"
                    )} >
                        Price Sevak
                    </span>
                </div>

                <div>
                    <Button
                        leftIcon={Signin}
                        variant='primary'
                        title='Sign In'
                    />
                </div>

            </motion.div>


        </header>
    )
}

export default Header