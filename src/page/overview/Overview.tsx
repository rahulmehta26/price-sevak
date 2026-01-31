import { cn } from "../../utils/cn"
import TrendDown from "../../components/icons/TrendDown"
import ProductCard from "../../components/ui/productCard/ProductCard"
import Text from "../../components/ui/Text"
import { useNavigate } from "react-router-dom"
import { useMemo } from "react"
import { calculateStats } from "../../utils/priceCalculation"
import OverviewHeader from "./OverviewHeader"
import HoverSlideButton from "../../components/ui/HoverSlideButton"
import EmptyState from "../../components/ui/EmptyState"
import Loader from "../../components/ui/Loader"
import OverviewStats from "./OverviewStats"
import PageHeader from "../../components/ui/PageHeader"
import ActivitySection from "./ActivitySection"
import { useProducts } from "../../hooks/useProducts"
import AnimatedItem from "../../components/ui/AnimatedItem"

const Overview = () => {

    const { data: products = [], isLoading } = useProducts();

    const navigate = useNavigate();

    const stats = useMemo(() => calculateStats(products), [products]);

    const trackingSince = useMemo(() => {
        if (products.length === 0) return "N/A";

        const earliest = products.reduce((min, p) => new Date(p.created_at) < new Date(min.created_at) ? p : min);

        return new Date(earliest.created_at).toLocaleDateString("en-IN", {
            month: "short",
            year: "numeric",
        })
    }, [products]);

    const handleProductNavigation = () => {
        navigate("/products")
    }

    const handleActivityNavigation = () => {
        navigate("/activity")
    }

    if (isLoading) return (
        <div
            className={cn("flex justify-center items-center h-screen")}
        >
            <Loader />
        </div>
    )

    return (
        <section
            className={cn("page-container")}
        >

            <PageHeader
                title="Overview"
                subTitle="Track prices, catch deals, save money."
            />

            <OverviewHeader />

            <div >

                <AnimatedItem as="div"
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

                    <HoverSlideButton onClick={handleProductNavigation} />
                </AnimatedItem>

                {products.length === 0 ? (
                    <EmptyState
                        title="No products tracked yet"
                        description="Start by adding products to track their prices"
                        showButton={true}
                    />
                ) : (
                    <>
                        <div className={cn("pt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-2")}>
                            {products.slice(0, 4).map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        <div className="border-b-4 border-foreground border-dashed my-12" />

                        <OverviewStats stats={stats} trackingSince={trackingSince} />

                        <div className="border-b-4 border-foreground border-dashed my-12" />
                    </>
                )}

            </div>

            <ActivitySection handleActivityNavigation={handleActivityNavigation} />
        </section>
    )
}

export default Overview