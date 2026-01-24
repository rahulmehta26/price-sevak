import { useMemo, useState } from 'react'
import { cn } from '../../utils/cn'
import ProductHeader from './ProductHeader'
import Input from '../../components/ui/Input'
import Filter from '../../components/ui/Filter'
import type { SelectOption } from '../../components/ui/Select'
import ProductCard from '../../components/ui/ProductCard'
import { useProducts } from '../../hooks/useProducts'

const filterOptions: SelectOption[] = [
    { label: "All Products", value: "all" },
    { label: "Low → High", value: "low-high" },
    { label: "High → Low", value: "high-low" },
    { label: "Recently Added", value: "recent" }
]

const Products = () => {

    const [search, setSearch] = useState<string>("")
    const [filter, setFilter] = useState<string>("all")

    const { data: products = [], isLoading } = useProducts();

    const filteredProducts = useMemo(() => {

        let result = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

        if (filter === "low-high") {
            result.sort((a, b) => a.current_price - b.current_price)
        }

        if (filter === "high-low") {
            result.sort((a, b) => b.current_price - a.current_price)
        }
        if (filter === "recent") {
            result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        }
        return result
    }, [products, search, filter])

    return (
        <section
            className={cn("page-container")}
        >
            <ProductHeader />

            <section
                className={cn(
                    "p-4 w-full",
                    "bg-foreground/10 backdrop-blur-md rounded-sm",
                    "shadow hover:shadow-sm",
                    "flex flex-col md:flex-row justify-between items-center gap-4"
                )}
            >
                <Input
                    value={search}
                    placeholder='Search products...'
                    onChange={setSearch}
                />

                <Filter
                    value={filter}
                    onChange={setFilter}
                    options={filterOptions}
                />

            </section>

            <div
                className={cn(
                    "pt-6",
                    "grid gap-6 md:grid-cols-2 lg:grid-cols-2 ",
                )}
            >
                {
                    products?.map((product) => <ProductCard key={product?.id} product={product} />)
                }

            </div>
        </section>
    )
}

export default Products