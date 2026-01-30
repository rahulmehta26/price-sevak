import { cn } from "../../../utils/cn";
import type { Product } from "../../../types/productTypes";
import ActionButton from "./ActionButton";
import ProductInfo from "./ProductInfo";
import { memo } from "react";
import ProductImage from "../ProductImage";

const ProductCard = memo(({ product }: { product: Product }) => {
    return (
        <div
            className={cn(
                "relative z-10",
                "w-full mx-auto h-auto p-3 md:p-4 lg:p-4 space-y-6",
                "bg-foreground/10 backdrop-blur-md border rounded-sm",
                "shadow hover:shadow-sm",
            )}
        >
            <div className={cn("flex justify-start items-center gap-4")}>
                <ProductImage
                    productImage={product?.image_url}
                    alt="Product image"
                />

                <ProductInfo product={product} />
            </div>

            <ActionButton productId={product?.id} />
        </div>
    );
});

export default ProductCard;
