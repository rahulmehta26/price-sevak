import NotFoundSVG from "../../components/icons/NotFoundSVG"
import { cn } from "../../utils/cn"

const PageNotFound = () => {
    return (
        <section
            className={cn(
                " w-full h-screen py-16 ",
                "bg-white",
                "flex justify-center items-center"
            )}
        >
            <div
                className={cn("w-full h-full")}
            >

                <NotFoundSVG />
            </div>

        </section>
    )
}

export default PageNotFound