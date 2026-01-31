import { cn } from '../../../utils/cn'
import StatsBlock from '../../../components/ui/StatsBlock'
import { formatCurrency } from '../../../utils/priceCalculation'
import type { Product } from '../../../types/productTypes'

const ProductStats = ({
    product,
    stats,
}: {
    product: Product;
    stats: any;
}) => {
    return (
        <section className={cn(
            "flex flex-row lg:flex-col justify-center items-center gap-4 flex-wrap "
        )}>
            <StatsBlock
                title="Lowest Price"
                value={`₹${formatCurrency(stats.lowest || product.current_price)}`}
                valueStyle="text-success"
            />

            <StatsBlock
                title="Highest Price"
                value={`₹${formatCurrency(stats.highest || product.original_price || product.current_price)}`}
                valueStyle="text-destructive"
            />

            <StatsBlock
                title="Average Price"
                value={`₹${formatCurrency(stats.average || product.current_price)}`}
                valueStyle="text-foreground/60"
            />
        </section>
    )
}

export default ProductStats