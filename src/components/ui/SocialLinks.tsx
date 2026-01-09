import { cn } from "../../utils/cn";
import Linkedin from "../icons/Linkedin";
import Github from "../icons/Github";
import Email from "../icons/Email";

const SocialLinks = () => {
    return (
        <>
            <a
                href={import.meta.env.VITE_LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className={cn(
                    "size-10 rounded-full bg-primary",
                    "flex justify-center items-center",
                    "group transition-transform cursor-pointer"
                )}
            >
                <Linkedin className={cn("w-5 h-5 fill-black stroke-black group-hover:scale-105 transition-all duration-300")} />
            </a>

            <a
                href={import.meta.env.VITE_GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className={cn(
                    "size-10 rounded-full bg-primary",
                    "flex justify-center items-center",
                    "group transition-transform cursor-pointer"
                )}
            >
                <Github className={cn("w-5.5 h-5.5 fill-black stroke-black group-hover:scale-105 transition-all duration-300")} />
            </a>

            <a
                href={`mailto:${import.meta.env.VITE_EMAIL}`}
                aria-label="Send Email"
                className={cn(
                    "size-10 rounded-full bg-primary",
                    "flex justify-center items-center",
                    "group transition-transform cursor-pointer"
                )}
            >
                <Email className={cn("w-5.5 h-5.5 fill-black stroke-black group-hover:scale-105 transition-all duration-300")} />
            </a>
        </>
    );
};

export default SocialLinks;
