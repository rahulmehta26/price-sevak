import { motion } from "motion/react"
import { cn } from "../../utils/cn"
import Button from "./Button"
import Text from "./Text"
import PriceChart from "./PriceChart"
import type { Product } from "../../types/productTypes"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteProduct } from "../../services/products"
import { useToast } from "../../store/useToast"
import TrendDown from "../icons/TrendDown"
import ChevronRight from "../icons/ChevronRight"
import Bell from "../icons/Bell"
import { useNavigate } from "react-router-dom"
import { calculatePriceChange, formatCurrency, getTrendColor } from "../../utils/priceCalculation"
import TrendUp from "../icons/TrendUp"
import Delete from "../icons/Delete"

const ProductCard = ({ product }: { product: Product }) => {

    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const addToast = useToast((s) => s.addToast)

    const deleteMutation = useMutation({
        mutationFn: deleteProduct,
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ["products"] });

            const previous = queryClient.getQueryData<Product[]>(["products"]);

            queryClient.setQueryData<Product[]>(["products"], (old) =>
                old?.filter((p) => p.id !== id)
            );

            return { previous };
        },
        onSuccess: () => {
            addToast({
                title: "Product removed",
                description: "Product removed from tracking successfully",
                type: "success"
            })
        },
        onError: (_err, _id, context) => {
            queryClient.setQueryData(["products"], context?.previous);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });

    const handleDelete = () => {
        deleteMutation.mutate(product.id)
    }

    const handleDetailNavigation = () => {
        navigate(`/product-detail/${product.id}`)
    }

    const handleAlertNavigation = () => {
        navigate("/alerts")
    }

    const priceChange = calculatePriceChange(product);
    const isDecrease = priceChange < 0;
    const isIncrease = priceChange > 0;
    const trendColor = getTrendColor(priceChange);

    return (
        <div
            className={cn(
                "relative z-10",
                "w-full mx-auto h-auto p-3 md:p-4 lg:p-4 space-y-6",
                "bg-foreground/10 backdrop-blur-md border rounded-sm",
                "shadow hover:shadow-sm"
            )}
        >
            <div
                className={cn(
                    "flex justify-start items-center gap-4"
                )}
            >
                <div
                    className={cn(
                        "w-20 h-20 bg-muted",
                        "border rounded-sm ",
                        "shrink-0 overflow-hidden",
                    )}
                >

                    <img
                        src={product?.image_url}
                        alt={product?.name}
                        className={cn(
                            "w-full h-full rounded-sm",
                            "object-cover"
                        )}
                        loading="lazy"
                    />

                </div>

                <div
                    className="space-y-3"
                >

                    <Text
                        as="h5"
                        variant="subHeading"
                        className={cn(
                            "text-foreground font-semibold font-inter tracking-normal",
                            "text-sm md:text-md lg:text-lg line-clamp-2 "
                        )}
                    >
                        {product?.name}
                    </Text>

                    <div className={cn(
                        " w-full",
                        "flex justify-start items-center flex-wrap gap-4"
                    )} >

                        <Text
                            as="h2"
                            variant="heading"
                            className={cn(" text-md md:text-md lg:text-xl text-success font-mono ")}
                        >
                            <Text as="span" variant="body" className={cn("text-foregorund")} >₹</Text> {formatCurrency(product?.current_price)}
                        </Text>

                        {(isDecrease || isIncrease) ? (
                            <motion.div whileInView="hover" className={cn(
                                "w-fit px-2 md:px-4 py-1 rounded-sm",
                                "flex justify-center items-center gap-2 md:gap-3",
                                trendColor
                            )}>
                                {isDecrease && <TrendDown className={cn("size-4 stroke-2")} />}
                                {isIncrease && <TrendUp className={cn("size-4 stroke-2")} />}
                                <Text as="span" variant="tags" className="text-xs lg:text-sm">
                                    {Math.abs(priceChange)}%
                                </Text>
                            </motion.div>
                        ) : (

                            <motion.div
                                whileInView="hover"
                                className={cn(
                                    "w-fit px-2 md:px-4 py-1 bg-foreground/20 rounded-sm",
                                    "flex justify-center items-center gap-2 md:gap-3"
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
                        )
                        }

                        <motion.button
                            whileHover="hover"
                            whileTap={{
                                scale: [0.95, 1, 1.05, 1],

                            }}
                            onClick={handleDelete}
                            className={cn(
                                "w-10 h-10",
                                "rounded-sm border",
                                "bg-destructive/10 cursor-pointer",
                                "flex justify-center shrink-0 items-center"
                            )}
                        >
                            <Delete className={cn("fill-destructive stroke-destructive")} />
                        </motion.button>

                    </div>

                </div>
            </div>

            <PriceChart productId={product?.id} />

            <div
                className={cn(
                    "flex flex-col lg:flex-row justify-center items-center gap-4 shrink-0 flex-wrap"
                )}
            >

                <Button
                    title="Set Alert"
                    variant="outline"
                    className={cn("shrink-0 gap-2 ")}
                    textStyle={cn(" text-xs text-foreground ")}
                    leftIcon={Bell}
                    leftIconStyle={cn("stroke-foreground")}
                    type="button"
                    onClick={handleAlertNavigation}
                />
                <Button
                    title="View Details"
                    variant="primary"
                    className={cn("shrink-0 gap-2 ")}
                    rightIcon={ChevronRight}
                    textStyle={cn("text-background")}
                    rightIconStyle={cn("text-background")}
                    type="button"
                    onClick={handleDetailNavigation}
                />
            </div>

        </div>
    )
}

export default ProductCard;