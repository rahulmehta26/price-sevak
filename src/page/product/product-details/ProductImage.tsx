import { cn } from '../../../utils/cn'

const ProductImage = ({ productImage }: { productImage: string }) => {
    return (
        <div className={cn(
            "w-42 h-42 shrink-0",
            "rounded-sm",
        )}>
            <img
                src={productImage}
                alt="Product image"
                className={cn("w-full h-full", "object-cover rounded-sm")}
            />
        </div>
    )
}

export default ProductImage