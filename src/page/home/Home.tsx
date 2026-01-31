import Text from "../../components/ui/Text";
import { useAuthState } from "../../store/useAuthStore";
import { cn } from "../../utils/cn";
import Features from "./Features";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import RightArrow from "../../components/icons/RightArrow";
import { useNavigate } from "react-router-dom";
import AnimatedItem from "../../components/ui/AnimatedItem";

const Home = () => {
    const user = useAuthState((s) => s.user);

    const navigate = useNavigate();

    const handleNavigation = () => {
        if (!user) return;
        navigate("/overview");
    };

    return (
        <section className={cn("page-container")}>
            <AnimatedItem
                as="section"
                className={cn("space-y-12", "md:py-10", "flex flex-col items-center")}
            >
                <Badge title="Smart Price Tracking for Smart Shoppers" />

                <Text
                    as="h1"
                    className={cn(
                        "md:text-[2.24rem] text-4xl lg:text-8xl",
                        "text-center tracking-normal font-extrabold text-foreground",
                    )}
                >
                    Never Miss a Price Drop <br />{" "}
                    <span className={cn("gradient-text text-shadow")}>
                        Smart Bachat
                    </span>
                </Text>

                <Text
                    as="p"
                    className={cn(
                        "text-center text-foreground/50 text-md md:text-xl",
                    )}
                >
                    Track prices from any e-commerce site. Get instant alerts jab
                    price kam ho. <br />
                    Save money with smart seva.
                </Text>

                <div
                    className={cn(" flex flex-col justify-center items-center gap-4 ")}
                >
                    <Button
                        title="Start Tracking "
                        variant="primary"
                        className="px-10"
                        rightIcon={RightArrow}
                        onClick={handleNavigation}
                    />

                    <Text as="span" variant="tags" className="text-shadow-none">
                        No credit card required • Free forever available
                    </Text>
                </div>
            </AnimatedItem>

            <Features />
        </section>
    );
};

export default Home;
