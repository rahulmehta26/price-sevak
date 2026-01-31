import { useParams } from "react-router-dom";
import PriceChart from "../../../components/ui/priceChart/PriceChart";
import Text from "../../../components/ui/Text";
import { useProducts } from "../../../hooks/useProducts";
import { cn } from "../../../utils/cn";
import { usePriceHistory } from "../../../hooks/usePriceHistory";
import { useMemo } from "react";
import {
    calculatePriceStats,
} from "../../../utils/priceCalculation";
import Loader from "../../../components/ui/Loader";
import EmptyState from "../../../components/ui/EmptyState";
import Return from "../../../components/icons/Return";
import ProductStats from "./ProductStats";
import ProductInfo from "./ProductInfo";
import PriceHistoryLog from "./PriceHistoryLog";
import BackButton from "./BackButton";
import ProductImage from "../../../components/ui/ProductImage";
import AnimatedItem from "../../../components/ui/AnimatedItem";

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();

    const { data: products = [], isLoading } = useProducts();

    const { data: priceHistory = [] } = usePriceHistory({ id });

    const product = products.find((p) => p.id === id);

    const priceStats = useMemo(() => {
        if (!priceHistory || priceHistory.length === 0) {
            return { lowest: 0, highest: 0, average: 0 };
        }
        return calculatePriceStats(priceHistory);
    }, [priceHistory]);

    if (isLoading) {
        return (
            <section
                className={cn("h-screen flex items-center justify-center")}
            >
                <Loader text="Loading..." />
            </section>
        );
    }

    if (!product) {
        return (
            <section
                className={cn("h-screen flex items-center justify-center")}
            >
                <EmptyState
                    title="Product Not found"
                    showButton
                    buttonTitle="Back to Products"
                    leftIcon={Return}
                />
            </section>
        );
    }

    return (
        <section className={cn("page-container")}>
            <BackButton />

            <AnimatedItem
                as="div"
                className={cn(
                    "p-4",
                    "bg-foreground/10 border rounded-sm",
                    "shadow hover:shadow-sm",
                    "flex justify-center md:justify-start gap-10 flex-wrap md:flex-nowrap items-center",
                )}
            >
                <ProductImage productImage={product?.image_url} alt="Product image" className={cn("w-42 h-42")} />

                <ProductInfo product={product} />

            </AnimatedItem>

            <div className={cn(
                "flex flex-col justify-between items-center lg:flex-row flex-wrap gap-10"
            )}>
                <AnimatedItem
                    as="div"
                    className={cn(
                        "p-4 w-full flex-1",
                        "bg-foreground/10 border rounded-sm",
                        "shadow hover:shadow-sm",
                    )}
                >
                    {product?.id && <PriceChart productId={product.id} />}
                </AnimatedItem>

                <ProductStats product={product} stats={priceStats} />
            </div>

            <div className=" border-b-4 border-foreground border-dashed my-12 " />

            <AnimatedItem
                as="div"
            >

                <Text
                    as="h4"
                    variant="subHeading"
                    className={cn("text-foreground text-md md:text-lg")}
                >
                    Price Change Log
                </Text>
            </AnimatedItem>

            <PriceHistoryLog priceHistory={priceHistory} />

        </section>
    );
};

export default ProductDetail;
