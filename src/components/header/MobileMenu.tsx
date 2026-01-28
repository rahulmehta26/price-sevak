import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { cn } from "../../utils/cn";
import Signout from "../icons/Signout";
import Button from "../ui/Button";
import { navItems } from "../../constant/navItems";
import { handleGoogleLogout } from "../../utils/googleLogin";
import { useMobileMenu } from "../../store/useMobileMenu";

interface MobileMenuProps {
    isMobileOpen: boolean;
    onClick: () => void;
}

const MobileMenu = ({
    isMobileOpen,
    onClick,
}: MobileMenuProps) => {

    const { open } = useMobileMenu();

    if (!open) return null;

    return (
        <AnimatePresence>
            {isMobileOpen && (
                <>

                    <motion.div
                        className={cn(
                            "bg-black/20 lg:hidden",
                            "fixed inset-0 backdrop-blur-sm z-40",
                        )}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClick}
                    >

                        <motion.div
                            className={cn(
                                "w-[calc(100%-2rem)] md:w-[20rem]",
                                "absolute lg:hidden",
                                "top-24 right-1/2 translate-x-1/2",
                                "rounded-2xl",
                                "bg-background/95 backdrop-blur-xl",
                                "border border-foreground/10",
                                "shadow-2xl overflow-hidden"
                            )}
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.96 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className={cn("flex flex-col gap-3 p-5")}>
                                {navItems?.map((item) => (
                                    <NavLink
                                        key={item.id}
                                        to={item.href}
                                        onClick={onClick}
                                        className={cn("rounded-lg")}
                                    >
                                        {({ isActive }) => (
                                            <span
                                                className={cn(
                                                    "block font-mono font-bold transition-all",
                                                    isActive
                                                        ? "bg-primary text-background px-3 py-2 rounded-lg"
                                                        : "text-foreground hover:text-primary px-3 py-2"
                                                )}
                                            >
                                                {item.name}
                                            </span>
                                        )}
                                    </NavLink>
                                ))}

                                <Button
                                    title="Sign out"
                                    className="mt-2"
                                    rightIcon={Signout}
                                    onClick={handleGoogleLogout}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MobileMenu;