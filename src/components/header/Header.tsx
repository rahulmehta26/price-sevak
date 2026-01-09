import React, { useRef, useState } from "react";
import { cn } from "../../utils/cn";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Button from "../ui/Button";
import Signin from "../icons/Signin";
import { useAuthModal } from "../../store/useAuthModal";
import { useAuthState } from "../../store/useAuthStore";
import Signout from "../icons/Signout";
import { handleGoogleLogout } from "../../utils/googleLogin";
import Text from "../ui/Text";

const Header = () => {
    const [isHidden, setIsHidden] = useState<boolean>(false);
    const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

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

    return (
        <header className={cn("w-full h-auto relative", "flex justify-center")}>
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
                    "md:w-[40rem] w-[18rem] mx-auto p-2 pr-2 pl-6 ",
                    "bg-secondary backdrop-blur-md rounded-full",
                    "fixed top-4 z-20",
                    "flex justify-between items-center"
                )}
            >
                <div>
                    <span
                        className={cn(
                            "font-extrabold font-quintessential tracking-wider text-md md:text-2xl"
                        )}
                    >
                        Price Sevak
                    </span>
                </div>

                <div className={cn("flex justify-center items-center gap-4")}>
                    {user && (
                        <button
                            onClick={() => setIsProfileOpen(true)}
                            className={cn(
                                "w-10 h-10",
                                "bg-primary rounded-full ",
                                "md:pointer-events-none"
                            )}
                        >
                            <img
                                src={
                                    user?.user_metadata?.avatar_url ||
                                    user?.user_metadata?.picture
                                }
                                alt={`${user?.user_metadata?.name?.charAt(0)}`}
                                referrerPolicy="no-referrer"
                                className={cn("w-full h-full object-cover rounded-full")}
                                loading="lazy"
                            />
                        </button>
                    )}

                    <Button
                        leftIcon={!user ? Signin : undefined}
                        variant="primary"
                        title={user ? "Sign Out" : "Sign In"}
                        onClick={user ? handleGoogleLogout : open}
                        rightIcon={user ? Signout : undefined}
                        className={cn(
                            "px-3 md:px-6 py-1.5 md:py-3",
                            user && " hidden md:flex "
                        )}
                        textStyle="text-sm md:text-base"
                    />
                </div>
            </motion.div>

            {/* Mobile menu modal */}


            {isProfileOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={cn(
                        "bg-black/50 md:hidden",
                        "flex justify-center items-end",
                        "fixed inset-0 z-50"
                    )}
                    onClick={() => setIsProfileOpen(false)}
                >
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 28,
                        }}
                        className={cn(
                            "w-full rounded-t-2xl backdrop-blur-md bg-secondary p-6"
                        )}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={cn("flex items-center gap-4 mb-6")}>
                            <img
                                src={user?.user_metadata?.avatar_url}
                                className={cn("w-14 h-14 rounded-full")}
                            />

                            <div>
                                <Text as="p" variant="para" className="text-black font-semibold">
                                    {user?.user_metadata?.name}
                                </Text>
                                <Text as="p" variant="para" className="text-black text-sm opacity-80">
                                    {user?.email}
                                </Text>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Button
                                variant="primary"
                                title="Sign Out"
                                rightIcon={Signout}
                                onClick={handleGoogleLogout}
                                className="w-full py-3"
                            />

                            <Button
                                variant="primary"
                                title="Cancel"
                                onClick={() => setIsProfileOpen(false)}
                                className="w-full py-3 bg-black"
                                textStyle="text-primary"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}

        </header>
    );
};

export default Header;
