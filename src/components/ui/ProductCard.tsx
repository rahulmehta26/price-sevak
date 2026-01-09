import { useState } from "react"
import { motion } from "motion/react"
import { cn } from "../../utils/cn"
import ChevronDown from "../icons/ChevronDown"
import ChevronUp from "../icons/ChevronUp"
import Delete from "../icons/Delete"
import ExternalLink from "../icons/ExternalLink"
import Line from "../icons/Line"
import Button from "./Button"
import Text from "./Text"
import PriceChart from "./PriceChart"
import type { Product } from "../../types/productTypes"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteProduct } from "../../services/products"

const ProductCard = ({ product }: { product: Product }) => {

    const [isHidden, setIsHidden] = useState<boolean>(false);
    const queryClient = useQueryClient();

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
        onError: (_err, _id, context) => {
            queryClient.setQueryData(["products"], context?.previous);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });


    const handleToggle = () => {

        setIsHidden(prev => !prev);
    }

    const handleDelete = () => {
        if (confirm("Remove this product from tracking?")) {
            deleteMutation.mutate(product.id)
        }
    }

    return (
        <div
            className={cn(
                "w-[18rem] md:w-full mx-auto h-auto p-4 md:p-6 lg:p-8 space-y-6",
                "bg-secondary rounded-lg",
                "shadow-md"
            )}
        >

            <div
                className={cn(
                    "flex justify-start items-center gap-4"
                )}
            >

                <div
                    className={cn(
                        "w-12 md:w-16 h-12 md:h-16 rounded-sm md:rounded-lg",
                        "bg-primary",
                    )}
                >

                    <img
                        src={product?.image_url}
                        alt={product?.name}
                        className={cn(
                            "w-full h-full rounded-sm md:rounded-lg",
                            "object-cover"
                        )}
                        loading="lazy"
                    />

                </div>

                <div>

                    <Text
                        as="h5"
                        variant="subHeading"
                        className={cn(
                            "text-black  font-bold",
                            "text-sm md:text-md lg:text-lg"
                        )}
                    >
                        {product?.name}
                    </Text>

                    <div className={cn(
                        " w-full",
                        "flex justify-start items-center gap-4"
                    )} >

                        <Text
                            as="h2"
                            variant="heading"
                            className={cn(" text-lg md:text-xl lg:text-2xl ")}
                        >
                            {product?.currency} {product?.current_price}
                        </Text>

                        <motion.div
                            whileInView="hover"
                            className={cn(
                                "w-fit px-4 py-0.5 bg-primary rounded-full",
                                "flex justify-center items-center gap-2"
                            )}
                        >
                            <Line className={cn("size-3.5 text-black stroke-3")} />
                            <Text
                                as="span"
                                variant="tags"
                                className=" text-black text-xs lg:text-sm"
                            >
                                tracking
                            </Text>
                        </motion.div>
                    </div>

                </div>
            </div>

            <div
                className={cn(
                    "flex justify-start items-center gap-4 flex-wrap"
                )}
            >

                <Button
                    title={isHidden ? "Hide Chart" : "Show More"}
                    variant="outline"
                    className={cn(" px-3 py-0.5 gap-1.5 border-black hover:bg-primary/20 transition-colors duration-300 ")}
                    textStyle={cn(" text-xs text-black ")}
                    leftIcon={isHidden ? ChevronUp : ChevronDown}
                    leftIconStyle={cn("size-4 text-black stroke-4")}
                    type="button"
                    onClick={handleToggle}
                />
                <Button
                    title="View Product"
                    variant="outline"
                    className={cn(" px-3 py-0.5 gap-1.5 border-black hover:bg-primary/20 transition-colors duration-300 ")}
                    textStyle={cn(" text-xs text-black ")}
                    leftIcon={ExternalLink}
                    leftIconStyle={cn("size-3.5 text-black stroke-3")}

                />
                <Button
                    title="Remove"
                    variant="outline"
                    className={cn(" px-3 py-0.5 gap-1.5 border-red hover:bg-red/20 transition-colors duration-300 ")}
                    textStyle={cn(" text-xs text-red ")}
                    leftIcon={Delete}
                    leftIconStyle={cn("stroke-red fill-red size-3.5")}
                    onClick={handleDelete}
                    disabled={deleteMutation.isPending}
                />

            </div>

            {
                isHidden && (

                    <div>
                        <PriceChart productId={product.id} />
                    </div>
                )
            }
        </div>
    )
}

export default ProductCard