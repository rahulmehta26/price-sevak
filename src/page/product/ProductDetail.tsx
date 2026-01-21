import { useParams } from "react-router-dom"
import Bell from "../../components/icons/Bell"
import ChevronRight from "../../components/icons/ChevronRight"
import ExternalLink from "../../components/icons/ExternalLink"
import RightArrow from "../../components/icons/RightArrow"
import Button from "../../components/ui/Button"
import PriceChart from "../../components/ui/PriceChart"
import StatsBlock from "../../components/ui/StatsBlock"
import Text from "../../components/ui/Text"
import { useProducts } from "../../hooks/useProducts"
import { cn } from "../../utils/cn"

const ProductDetail = () => {

    const { id } = useParams<{ id: string }>()

    const { data: products = [], isLoading } = useProducts();

    const product = products.find(p => p.id === id);

    const handleExternalLink = () => {
        if (!product?.url) return;
        window.open(product.url, "_blank", "noopener,noreferrer");
    };

    return (
        <section
            className={cn("page-container")}
        >

            <div
                className={cn("flex justify-start items-center gap-3")}
            >

                <RightArrow className={cn("rotate-180 text-foreground/80")} />

                <Text
                    as="span"
                    variant="tags"
                    className={cn("text-foreground/80 font-mono font-normal")}
                >
                    Back to Products
                </Text>
            </div>

            <div
                className={cn(
                    "p-4",
                    "bg-foreground/10 border rounded-sm",
                    "shadow hover:shadow-sm",
                    "flex justify-start gap-10 items-center"
                )}
            >
                <div
                    className={cn(
                        "w-42 h-42 shrink-0",
                        "rounded-sm"
                    )}
                >
                    <img
                        src={product?.image_url}
                        alt="Product image"
                        className={cn(
                            "w-full h-full",
                            "object-cover rounded-sm"
                        )}
                    />
                </div>

                <div
                    className={cn("space-y-2")}
                >

                    <Text
                        as="p"
                        variant="para"
                        className={cn("text-foreground/60 font-mono font-normal")}
                    >
                        Amazon
                    </Text>

                    <Text
                        as="h4"
                        variant="heading"
                        className={cn("text-foreground font-semibold ")}
                    >
                        {product?.name}
                    </Text>

                    <Text
                        as="h2"
                        variant="subHeading"
                        className={cn("font-mono tracking-normal font-bold text-3xl text-foreground")}
                    >
                        <Text as="span" variant="heading" className="text-foreground" >₹</Text> {products[0]?.current_price || "25,000"}
                    </Text>

                    <Text
                        as="p"
                        variant="tags"
                        className={cn("font-mono text-foreground/60 tracking-normal")}
                    >
                        Last updated 2 hours ago
                    </Text>

                    <div
                        className={cn(
                            "flex justify-start items-center gap-4"
                        )}
                    >
                        <Button
                            title="Set Alert"
                            variant="outline"
                            textStyle={cn(" text-xs text-foreground ")}
                            leftIcon={Bell}
                            leftIconStyle={cn("stroke-foreground")}
                            type="button"
                        />
                        <Button
                            title="View on Amazon"
                            leftIcon={ExternalLink}
                            onClick={handleExternalLink}
                            type="button"
                        />

                    </div>
                </div>
            </div>

            <div
                className={cn(
                    "flex justify-between items-center gap-6"
                )}
            >
                <div
                    className={cn(
                        "p-4 flex-1",
                        "bg-foreground/10 border rounded-sm",
                        "shadow hover:shadow-sm",
                    )}
                >

                    {product?.id && <PriceChart productId={product.id} />}

                    {/* 01. here use whole thing of graph i have commneted because in two page there is another need soo make reuseable.
                02. in this add 1d 7d 1w 1m 1 year and more  
                03. lowest highest margin below
                */}
                </div>

                <div
                    className="space-y-4"
                >

                    <StatsBlock
                        title="Lowest Price"
                        value="22, 990"
                        valueStyle="text-success"

                    />

                    <StatsBlock
                        title="Highest Price"
                        value="34, 990"
                        valueStyle="text-red"

                    />

                    <StatsBlock
                        title="Average Price"
                        value="22, 990"
                        valueStyle="text-foreground/60"

                    />
                </div>


            </div>

            <div className=" border-b-4 border-foreground border-dashed my-12 " />

            <Text
                as="h4"
                variant="subHeading"
                className={cn("text-foreground text-md md:text-lg")}
            >
                Price Change Log
            </Text>

            <div
                className={cn(
                    "w-fit p-4",
                    "bg-foreground/10 rounded-sm border",
                    "space-y-2"
                )}
            >

                <div
                    className={cn(
                        "flex items-center gap-20"
                    )}
                >

                    <div
                        className={cn(
                            "flex justify-start items-center gap-2"
                        )}
                    >
                        <ChevronRight className={cn("text-primary w-5 h-5 ")} />

                        <Text as="span" variant="tags" className={cn("text-foreground/60 font-mono font-normal", "tracking-normal")} >Mar 5, 2024 14:32</Text>
                    </div>

                    <div className="space-x-2" >
                        <Text as="span" variant="tags" className={cn("text-foreground font-mono font-normal", "tracking-normal")} ><Text as="span" className="text-foreground text-xs" >₹ </Text>26,900</Text>
                        <Text as="span" variant="tags" className={cn("text-success font-mono font-normal", "tracking-normal")} >-1,500</Text>
                    </div>
                </div>

                <div
                    className={cn(
                        "flex items-center gap-20"
                    )}
                >

                    <div
                        className={cn(
                            "flex justify-start items-center gap-2"
                        )}
                    >
                        <ChevronRight className={cn("text-primary w-5 h-5 ")} />

                        <Text as="span" variant="tags" className={cn("text-foreground/60 font-mono font-normal", "tracking-normal")} >Mar 5, 2024 14:00</Text>
                    </div>

                    <div className="space-x-2" >
                        <Text as="span" variant="tags" className={cn("text-foreground font-mono font-normal", "tracking-normal")} ><Text as="span" className="text-foreground text-xs" >₹ </Text>27,900</Text>
                        <Text as="span" variant="tags" className={cn("text-red font-mono font-normal", "tracking-normal")} >+1,500</Text>
                    </div>
                </div>

            </div>

        </section>
    )
}

export default ProductDetail