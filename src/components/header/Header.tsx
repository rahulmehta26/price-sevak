import React, { useRef, useState } from 'react'
import { cn } from '../../utils/cn'
import { motion, useMotionValueEvent, useScroll } from "motion/react"
import Button from '../ui/Button'
import Signin from '../icons/Signin'
import { useAuthModal } from '../../store/useAuthModal'
import { useAuthState } from '../../store/useAuthStore'
import Signout from '../icons/Signout'
import { handleGoogleLogout } from '../../utils/googleLogin'

const Header = () => {

    const [isHidden, setIsHidden] = useState<boolean>(false)

    const lastYPosition = useRef<number>(0)

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (y) => {

        const difference = y - lastYPosition.current;

        if (Math.abs(difference) > 50) {

            setIsHidden(difference > 0)

            lastYPosition.current = y;
        }

    })

    const open = useAuthModal((state) => state.open);

    const user = useAuthState((s) => s.user)

    return (
        <header
            className={cn(
                "w-full h-auto relative",
                "flex justify-center"
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
                    " w-[30rem] mx-auto p-2 pr-2 pl-6 ",
                    "bg-secondary rounded-full",
                    "fixed top-4 z-20",
                    "flex justify-between items-center"
                )}
            >

                <div>

                    <span className={cn(
                        "font-extrabold font-quintessential tracking-wider text-2xl"
                    )} >
                        Price Sevak
                    </span>
                </div>

                <div>
                    <Button
                        leftIcon={!user ? Signin : undefined}
                        variant='primary'
                        title={user ? "Sign Out" : 'Sign In'}
                        onClick={user ? handleGoogleLogout : open}
                        rightIcon={user ? Signout : undefined}
                    />
                </div>

            </motion.div>
        </header>
    )
}

export default Header