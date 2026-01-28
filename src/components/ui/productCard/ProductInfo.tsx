import { motion } from "motion/react";
import { cn } from "../../../utils/cn";
import Text from "../Text";
import TrendDown from "../../icons/TrendDown";
import TrendUp from "../../icons/TrendUp";
import ProductDeleteButton from "./ProductDeleteButton";
import type { Product } from "../../../types/productTypes";
import {
    calculatePriceChange,
    formatCurrency,
    getTrendColor,
} from "../../../utils/priceCalculation";

const ProductInfo = ({ product }: { product: Product }) => {
    const priceChange = calculatePriceChange(product);
    const isDecrease = priceChange < 0;
    const isIncrease = priceChange > 0;
    const trendColor = getTrendColor(priceChange);

    return (
        <div className="space-y-3">
            <Text
                as="h5"
                variant="subHeading"
                className={cn(
                    "text-foreground font-semibold font-inter tracking-normal",
                    "text-sm md:text-base lg:text-lg line-clamp-2 ",
                )}
            >
                {product?.name}
            </Text>

            <div
                className={cn(
                    " w-full",
                    "flex justify-start items-center flex-wrap gap-4",
                )}
            >
                <Text
                    as="h2"
                    variant="heading"
                    className={cn(" text-base lg:text-xl text-success font-mono ")}
                >
                    <Text as="span" variant="body" className={cn("text-foreground")}>
                        ₹
                    </Text>{" "}
                    {formatCurrency(product?.current_price)}
                </Text>

                {isDecrease || isIncrease ? (
                    <motion.div
                        className={cn(
                            "w-fit px-2 md:px-4 py-1 rounded-sm",
                            "flex justify-center items-center gap-2 md:gap-3",
                            trendColor,
                        )}
                    >
                        {isDecrease && <TrendDown className={cn("size-4 stroke-2")} />}
                        {isIncrease && <TrendUp className={cn("size-4 stroke-2")} />}
                        <Text as="span" variant="tags" className="text-xs lg:text-sm">
                            {Math.abs(priceChange)}%
                        </Text>
                    </motion.div>
                ) : (
                    <motion.div
                        className={cn(
                            "w-fit px-2 md:px-4 py-1 bg-foreground/20 rounded-sm",
                            "flex justify-center items-center gap-2 md:gap-3",
                        )}
                    >
                        <Text
                            as="span"
                            variant="tags"
                            className=" text-foreground/80 text-xs lg:text-sm"
                        >
                            0%
                        </Text>
                    </motion.div>
                )}

                <ProductDeleteButton productId={product?.id} />
            </div>
        </div>
    );
};

export default ProductInfo;
