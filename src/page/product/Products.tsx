import { useEffect, useMemo, useState } from "react";
import { cn } from "../../utils/cn";
import ProductHeader from "./ProductHeader";
import Input from "../../components/ui/Input";
import Filter from "../../components/ui/Filter";
import type { SelectOption } from "../../components/ui/Select";
import ProductCard from "../../components/ui/productCard/ProductCard";
import { useProducts } from "../../hooks/useProducts";
import EmptyState from "../../components/ui/EmptyState";
import { useDebounce } from "../../hooks/useDebounce.ts";
import { useToast } from "../../store/useToast.ts";
import AnimatedItem from "../../components/ui/AnimatedItem.tsx";

const filterOptions: SelectOption[] = [
    { label: "All Products", value: "all" },
    { label: "Low → High", value: "low-high" },
    { label: "High → Low", value: "high-low" },
    { label: "Recently Added", value: "recent" },
];

const Products = () => {
    const [search, setSearch] = useState<string>("");
    const [filter, setFilter] = useState<string>("all");

    const { data: products = [], error } = useProducts();

    const addToast = useToast((s) => s.addToast);

    const debouncedSearch = useDebounce(search, 300);

    useEffect(() => {
        if (error) {
            addToast({
                title: "Failed to load products",
                description: "Please refresh the page",
                type: "error",
            });
        }
    }, [error, addToast]);

    const filteredProducts = useMemo(() => {
        let result = products.filter((p) =>
            p?.name?.toLowerCase().includes(debouncedSearch.toLowerCase()),
        );

        if (filter === "low-high") {
            result = [...result].sort((a, b) => a.current_price - b.current_price);
        }

        if (filter === "high-low") {
            result = [...result].sort((a, b) => b.current_price - a.current_price);
        }

        if (filter === "recent") {
            result = [...result].sort(
                (a, b) =>
                    new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
            );
        }

        return result;
    }, [products, debouncedSearch, filter]);

    return (
        <section className={cn("page-container")}>

            <ProductHeader />

            <AnimatedItem
                as="section"
                className={cn(
                    "p-4 w-full",
                    "bg-foreground/10 rounded-sm",
                    "shadow hover:shadow-sm",
                    "flex flex-col md:flex-row justify-between items-center gap-4",
                )}
            >
                <Input
                    value={search}
                    placeholder="Search products..."
                    onChange={setSearch}
                />

                <Filter
                    value={filter}
                    onChange={setFilter}
                    options={filterOptions}
                />
            </AnimatedItem>

            <div
                className={cn("pt-6", "grid gap-6 md:grid-cols-2 lg:grid-cols-2 ")}
            >
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard key={product?.id} product={product} />
                    ))
                ) : (
                    <div className="col-span-full flex justify-center">
                        <EmptyState
                            title="No products found"
                            description="Try adjusting your search or filters"
                        />
                    </div>
                )}
            </div>
        </section>
    );
};

export default Products;
