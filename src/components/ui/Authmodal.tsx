import { motion } from "motion/react"
import { useAuthModal } from "../../store/useAuthModal"
import { cn } from "../../utils/cn"
import Google from "../icons/Google"
import Button from "./Button"
import CloseButton from "./CloseButton"
import Text from "./Text"
import { loginWithGoogle } from "../../services/auth"

const Authmodal = () => {

    const close = useAuthModal((state) => state.close)

    return (
        <section
            className={cn(
                "bg-background/50 w-full h-screen",
                "fixed inset-0 z-40",
                "flex justify-center items-center",
                "backdrop-blur-sm"
            )}
            onClick={close}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                }}
                className={cn(
                    "relative w-[25rem] h-auto p-4 px-10",
                    "bg-primary rounded-lg",
                    "flex flex-col items-center gap-8"
                )}
                onClick={(e) => e.stopPropagation()}
            >

                <CloseButton
                    onClick={close}
                    className={cn("bg-background/40")}
                />

                <div
                    className="space-y-4"
                >

                    <Text as="h3" variant="heading" className="text-background text-center" >
                        Sign in to continue
                    </Text>

                    <Text as="h3" className=" text-background font-bold " >
                        Your assistant for smart price alerts.

                    </Text>

                </div>

                <Button
                    title="Continue with Google"
                    className="bg-background px-8 w-full"
                    textStyle="text-primary"
                    leftIcon={Google}
                    onClick={loginWithGoogle}
                />

                <div
                    className={cn("space-y-4")}
                >

                    <Text
                        as="p"
                        className="text-background/70 text-sm text-center"
                    >
                        We use Google to securely sign you in. No passwords required.
                    </Text>

                    <Text as="p" variant="para" className="text-background/60 text-center">
                        By continuing, you agree to our{" "}
                        <Text as="span" variant="para" className="underline text-background/60 cursor-pointer">Terms</Text> and{" "}
                        <Text as="span" variant="para" className="underline text-background/60 cursor-pointer">Privacy Policy</Text>.
                    </Text>
                </div>

            </motion.div>

        </section>
    )
}

export default Authmodal