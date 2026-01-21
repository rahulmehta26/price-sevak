import { useNavigate } from "react-router-dom"
import NotFoundSVG from "../../components/icons/NotFoundSVG"
import Return from "../../components/icons/Return"
import Button from "../../components/ui/Button"
import { cn } from "../../utils/cn"

const PageNotFound = () => {

    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate("/")
    }
    return (
        <section
            className={cn(
                " w-full h-screen py-16 ",
                "flex flex-col justify-center items-center"
            )}
        >
            <div
                className={cn("w-full my-6 h-fit md:h-full")}
            >

                <NotFoundSVG />
            </div>

            <Button
                title="Return Home"
                leftIcon={Return}
                leftIconStyle={cn("stroke-3 ")}
                type="button"
                onClick={handleNavigation}
            />

        </section>
    )
}

export default PageNotFound