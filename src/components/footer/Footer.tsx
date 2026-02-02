import { cn } from "../../utils/cn";
import ProductImage from "../ui/ProductImage";
import SocialLinks from "../ui/SocialLinks";
import Text from "../ui/Text";
import PriceSevak from "../../assets/price-sevak-logo.svg"

const Footer = () => {
    return (
        <footer
            className={cn(
                " md:w-2xl lg:w-4xl xl:w-5xl w-full mx-auto px-4 py-2 space-y-6 ",
                "bg-foreground/10 backdrop-blur-md ",
                "rounded-t-sm"
            )}
        >
            <div
                className={cn("md:flex-row flex flex-col md:justify-between md:items-center space-y-6 md:space-y-0 ")}
            >

                <div>

                    <div
                        className={cn("flex items-center gap-2")}
                    >

                        <ProductImage
                            productImage={PriceSevak}
                            alt="Price Sevak Logo"
                            className={cn("w-10 h-10 border-0")}
                        />

                        <Text
                            as="span"
                            variant="heading"
                            className={cn("font-quintessential text-foreground font-extrabold")}
                        >
                            Price Sevak
                        </Text>
                    </div>

                    <Text
                        as="p"
                        variant="para"
                        className={cn("text-base text-foreground/70")}
                    >
                        Smarter prices, better Bachat.
                    </Text>
                </div>

                <Text as="p" variant="para" className="text-sm text-foreground font-normal md:text-center">
                    © {new Date().getFullYear()} Price Sevak. All rights reserved. Built with ❤️
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
