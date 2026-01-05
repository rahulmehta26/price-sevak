import ProductCard from "../components/ui/ProductCard"
import Text from "../components/ui/Text"
import { cn } from "../utils/cn"

const ProductTracker = ({ product }: { product: any[] }) => {

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
                    {product?.length} products
                </Text>
            </div>

            <div
                className={cn(
                    "pt-8",
                    "grid md:grid-cols-2 gap-8"
                )}
            >

                <ProductCard />

            </div>

        </section>
    )
}

export default ProductTracker