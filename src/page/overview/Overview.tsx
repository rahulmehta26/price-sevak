import ChevronRight from "../../components/icons/ChevronRight"
import TrendDown from "../../components/icons/TrendDown"
import ProductCard from "../../components/ui/ProductCard"
import Text from "../../components/ui/Text"
import { cn } from "../../utils/cn"
import StatsBlock from "../../components/ui/StatsBlock"
import ActivityTimeline from "../../components/ui/ActivityTimeline"
import { useProducts } from "../../hooks/useProducts"
import { useNavigate } from "react-router-dom"

const Overview = () => {

    const { data: products = [], isLoading } = useProducts();

    const navigate = useNavigate();

    const handleProductNavigation = () => {
        navigate("/products")
    }

    const handleActivityNavigation = () => {
        navigate("/activity")
    }

    return (
        <section
            className={cn("page-container")}
        >

            <div>

                <Text
                    as="h4"
                    variant="heading"
                    className={cn("text-foreground font-semibold")}
                >
                    Overview
                </Text>

                <Text
                    as="span"
                    variant="tags"
                    className={cn("text-foreground/60 text-xs md:text-base font-normal")}
                >
                    Track prices, catch deals, save money.
                </Text>
            </div>

            {/* <OverviewHeader /> */}

            <div>

                <div
                    className={cn("flex flex-col md:flex-row justify-between md:items-center space-y-6 md:space-y-0 ")}
                >

                    <div
                        className={cn("flex justify-start items-center gap-2")}
                    >

                        <TrendDown className={cn("w-5 h-5 text-success")} />

                        <Text
                            as="h4"
                            variant="subHeading"
                            className={cn("text-foreground text-md md:text-lg")}
                        >
                            Recent Price Drops
                        </Text>
                    </div>

                    <button
                        className={cn(
                            "lg:p-4 lg:py-2 lg:hover:bg-primary/10 rounded-sm ",
                            "transition-colors duration-200 ease-in-out",
                            "group cursor-pointer",
                            "flex justify-start items-center gap-2"
                        )}
                        type="button"
                        onClick={handleProductNavigation}
                    >
                        <Text
                            as="span"
                            variant="tags"
                            className={cn("text-foreground group-hover:text-primary font-normal font-mono")}
                        >
                            View All
                        </Text>

                        <ChevronRight className={cn("w-4.5 h-4.5 group-hover:text-primary")} />
                    </button>
                </div>

                <div
                    className={cn(
                        "pt-6",
                        "grid gap-6 md:grid-cols-2 lg:grid-cols-2 ",
                    )}
                >
                    {
                        products?.map((product: any) => <ProductCard key={product?.id} product={product} />)
                    }

                </div>

                <div className=" border-b-4 border-foreground border-dashed my-12 " />

                <div
                    className={cn("flex justify-start items-center flex-wrap gap-4")}
                >

                    <StatsBlock
                        title="Avg. Savings"
                        value="₹4,200"
                        valueStyle={cn("text-success")}
                    />

                    <StatsBlock
                        title="Best Drop"
                        value="-17%"
                        valueStyle={cn("text-success")}
                    />

                    <StatsBlock
                        title="Alert Triggered"
                        value="8"
                        valueStyle={cn("font-bold")}
                    />

                    <StatsBlock
                        title="Tracking Since"
                        value="₹4,200"
                        valueStyle={cn("font-bold")}
                    />
                </div>

                <div className=" border-b-4 border-foreground border-dashed my-12 " />


            </div>

            <div
                className={cn("space-y-4")}
            >
                <div
                    className={cn("flex justify-between items-center")}
                >

                    <Text
                        as="h4"
                        variant="subHeading"
                        className={cn("text-foreground text-md md:text-lg")}
                    >
                        Activity
                    </Text>

                    <button
                        className={cn(
                            "lg:p-4 lg:py-2 lg:hover:bg-primary/10 rounded-sm ",
                            "transition-colors duration-200 ease-in-out",
                            "group cursor-pointer",
                            "flex justify-start items-center gap-2"
                        )}
                        type="button"
                        onClick={handleActivityNavigation}
                    >
                        <Text
                            as="span"
                            variant="tags"
                            className={cn("text-foreground group-hover:text-primary font-normal font-mono")}
                        >
                            View All
                        </Text>

                        <ChevronRight className={cn("w-4.5 h-4.5 group-hover:text-primary")} />
                    </button>
                </div>

                <ActivityTimeline />
            </div>
        </section>
    )
}

export default Overview