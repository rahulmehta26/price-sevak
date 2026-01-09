import { cn } from "../../utils/cn"
import Text from "../../components/ui/Text"
import type { Product } from "../../types/productTypes"
import ProductCard from "../../components/ui/ProductCard"


const ProductTracker = ({ products }: { products: Product[] }) => {

    return (
        <section
            className={cn("w-full")}
        >

            <div
                className={cn(
                    "flex flex-col space-y-2 md:flex-row items-center md:justify-between",
                )}
            >
                <Text
                    as="h2"
                    variant="heading"
                >
                    Your Tracked Products
                </Text>

                <Text
                    as="span"
                    variant="base"
                >
                    {products?.length} {products?.length === 1 ? "product" : "products"}
                </Text>
            </div>

            <div
                className={cn(
                    "pt-8 w-full",
                    "grid md:grid-cols-2 gap-6 md:gap-8"
                )}
            >

                {
                    products?.map((product) => (
                        <ProductCard key={product?.id} product={product} />
                    ))
                }

            </div>

        </section>
    )
}

export default ProductTracker