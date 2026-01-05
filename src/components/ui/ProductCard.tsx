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
import Image01 from "../../assets/react.svg"
import PriceChart from "./PriceChart"

const ProductCard = () => {

    const [isHidden, setIsHidden] = useState<boolean>(false)

    const handleToggle = () => {

        setIsHidden(prev => !prev);
    }

    return (
        <div
            className={cn(
                "h-auto p-8 space-y-6",
                "bg-secondary rounded-lg",
            )}
        >

            <div
                className={cn(
                    "flex justify-start items-center gap-4"
                )}
            >

                <div
                    className={cn(
                        "w-16 h-16 rounded-full",
                        "bg-primary",
                        "flex items-center justify-center"
                    )}
                >

                    <img
                        src={Image01}
                        className={cn(
                            "w-full h-full rounded-full",
                            "object-cover"
                        )}
                    />

                </div>


                <div>

                    <Text
                        as="h5"
                        variant="subHeading"
                        className={cn("text-black text-lg font-bold")}
                    >
                        Prodcut Name
                    </Text>

                    <div className={cn(
                        " w-full",
                        "flex justify-start items-center gap-4"
                    )} >

                        <Text
                            as="h2"
                            variant="heading"
                        >
                            INR Price
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
                                className=" text-black "
                            >
                                tracking
                            </Text>
                        </motion.div>
                    </div>

                </div>
            </div>

            <div
                className={cn(
                    "flex justify-start items-center gap-4"
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

                />

            </div>

            {
                isHidden && (

                    <div>

                        <PriceChart />

                    </div>
                )
            }


        </div>
    )
}

export default ProductCard