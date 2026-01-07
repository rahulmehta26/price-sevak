import ProductCard from "../components/ui/ProductCard"
import Text from "../components/ui/Text"
import type { Product } from "../types/productTypes"
import { cn } from "../utils/cn"

const ProductTracker = ({ products }: { products: Product[] }) => {

    return (
        <section>

            <div
                className={cn(
                    "flex items-center justify-between",
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
                    "pt-8",
                    "grid md:grid-cols-2 gap-8"
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