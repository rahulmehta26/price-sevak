import { cn } from "../../../utils/cn";

const ProductImage = ({ productImage }: { productImage: string }) => (

    <div
        className={cn(
            "w-20 h-20 bg-foreground/10",
            "border rounded-sm ",
            "shrink-0 overflow-hidden",
        )}
    >
        <img
            src={productImage}
            alt="Product image"
            loading="lazy"
            className={cn("w-full h-full object-cover")}
        />
    </div>
);

export default ProductImage 
