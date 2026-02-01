import { useRef, useState } from "react";
import { cn } from "../../utils/cn";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Button from "../ui/Button";
import Signin from "../icons/Signin";
import { useAuthModal } from "../../store/useAuthModal";
import { useAuthState } from "../../store/useAuthStore";
import RightArrow from "../icons/RightArrow";
import NavItems from "./NavItems";
import { useToast } from "../../store/useToast";
import { loginWithGoogle } from "../../services/auth";

const Header = () => {
    const [isHidden, setIsHidden] = useState<boolean>(false);
    const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

    const lastYPosition = useRef<number>(0);

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (y) => {
        const difference = y - lastYPosition.current;

        if (Math.abs(difference) > 50) {
            setIsHidden(difference > 0);

            lastYPosition.current = y;
        }
    });

    const open = useAuthModal((s) => s.open);

    const user = useAuthState((s) => s.user);

    const addToast = useToast((s) => s.addToast);

    const handleLogin = async () => {

        if (isLoggingIn) return;

        if (!user) {
            open();
            return;
        };

        setIsLoggingIn(true);

        try {

            await loginWithGoogle();

        } catch (error) {

        } finally {
            setIsLoggingIn(false);
        }
    }

    return (
        <header className={cn("w-full h-auto relative z-50", "flex justify-center")}>
            <motion.div
                animate={isHidden ? "hidden" : "visible"}
                variants={{
                    hidden: {
                        y: "-150%",
                    },
                    visible: {
                        y: "0",
                    },
                }}
                transition={{
                    duration: 0.35,
                    type: "spring",
                    stiffness: 100,
                }}
                className={cn(
                    "md:w-2xl lg:w-4xl xl:w-5xl w-[18rem] mx-auto px-4 py-3 ",
                    "bg-foreground/20 backdrop-blur-md rounded-sm",
                    "fixed top-4 z-20 ",
                    "flex justify-between items-center"
                )}
            >
                <div>
                    <span
                        className={cn(
                            "md:font-extrabold font-normal font-oswald tracking-wider text-md md:text-2xl"
                        )}
                    >
                        Price Sevak
                    </span>
                </div>

                {
                    !user ? (

                        <div className={cn("flex justify-center items-center gap-4")}>

                            <Button
                                leftIcon={Signin}
                                variant="outline"
                                title="Sign In"
                                onClick={open}
                                className={cn(" hidden md:flex ")}
                            />

                            <Button
                                variant="primary"
                                title={isLoggingIn ? "Logging in..." : "Get Started"}
                                onClick={handleLogin}
                                rightIcon={RightArrow}
                                className={cn(" hidden md:flex ")}
                            />
                        </div>
                    ) : (
                        <NavItems />

                    )
                }

            </motion.div>

        </header>
    );
};

export default Header;
