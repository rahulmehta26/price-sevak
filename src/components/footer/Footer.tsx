import { cn } from "../../utils/cn";
import SocialLinks from "../ui/SocialLinks";
import Text from "../ui/Text";

const Footer = () => {
    return (
        <footer
            className={cn(
                " md:w-2xl lg:w-4xl xl:w-5xl w-full mx-auto px-4 py-2 space-y-6 ",
                "bg-foreground/20 backdrop-blur-md ",
                "rounded-t-sm"
            )}
        >
            <div
                className={cn("md:flex-row flex flex-col md:justify-between md:items-center space-y-6 md:space-y-0 ")}
            >

                <div>
                    <Text
                        as="span"
                        variant="heading"
                        className={cn("font-quintessential text-foreground font-extrabold")}
                    >
                        Price Sevak
                    </Text>

                    <Text
                        as="p"
                        variant="para"
                        className={cn("text-base text-foreground/70")}
                    >
                        Smarter prices, better Bachat.
                    </Text>
                </div>

                <Text as="p" variant="para" className="text-sm text-foreground font-normal md:text-center">
                    © 2026 Price Sevak. All rights reserved. Built with ❤️
                </Text>

                <div
                    className={cn(
                        "space-y-2"
                    )}
                >
                    <Text as="h4" className="font-normal text-foreground" variant="subHeading">
                        Contact
                    </Text>

                    <section
                        className={cn(
                            "flex justify-start md:justify-center items-center gap-4"
                        )}
                    >

                        <SocialLinks />
                    </section>

                </div>
            </div>

        </footer>
    );
};

export default Footer;
