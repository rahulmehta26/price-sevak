import { cn } from "../../../utils/cn";
import ProductActions from "./ProductActions";
import Text from "../../../components/ui/Text";
import { formatCurrency } from "../../../utils/priceCalculation";
import type { Product } from "../../../types/productTypes";
import { getStoreName } from "../../../utils/getStoreName";

const ProductInfo = ({ product }: { product: Product }) => {

    const storeName = getStoreName(product?.url);

    const handleExternalLink = () => {
        if (!product?.url) return;
        window.open(product.url, "_blank", "noopener,noreferrer");
    };

    return (
        <section className={cn("space-y-2")}>
            <Text
                as="p"
                variant="para"
                className={cn("text-foreground/60 font-mono font-normal")}
            >
                {storeName}
            </Text>

            <Text
                as="h4"
                variant="heading"
                className={cn(
                    "text-foreground text-lg md:text-xl line-clamp-5 font-semibold ",
                )}
            >
                {product?.name}
            </Text>

            <Text
                as="h2"
                variant="subHeading"
                className={cn(
                    "font-mono tracking-normal font-bold text-xl md:text-3xl text-foreground",
                )}
            >
                <Text as="span" variant="heading" className="text-foreground text-md ">
                    ₹
                </Text>{" "}
                {formatCurrency(product?.current_price)}
            </Text>

            <Text
                as="p"
                variant="tags"
                className={cn("font-mono text-foreground/60 tracking-normal")}
            >
                Last updated at {new Date(product.updated_at).toLocaleString("en-IN")}
            </Text>

            <ProductActions
                handleExternalLink={handleExternalLink}
                storeName={storeName}
            />
        </section>
    );
};

export default ProductInfo;
