import { useAuthModal } from "../../store/useAuthModal"
import { cn } from "../../utils/cn"
import { handleGoogleLogin } from "../../utils/googleLogin"
import Google from "../icons/Google"
import Button from "./Button"
import Text from "./Text"

const Authmodal = () => {

    const close = useAuthModal((state) => state.close)

    return (
        <section
            className={cn(
                "bg-black/50 w-full h-full text-white ",
                "absolute top-0 right-0 z-40",
                "flex justify-center items-center"
            )}
            onClick={close}
        >
            <div
                className={cn(
                    "w-[25rem] h-auto p-4 px-10",
                    "bg-primary rounded-lg",
                    "flex flex-col items-center gap-8"
                )}
                onClick={(e) => e.stopPropagation()}
            >
                <Text as="h3" variant="heading" className="text-black" >
                    Sign in to continue
                </Text>

                <Button
                    title="Continue with Google"
                    className="bg-black px-8 w-full"
                    textStyle="text-primary"
                    leftIcon={Google}
                    onClick={handleGoogleLogin}
                />
            </div>
        </section>
    )
}

export default Authmodal