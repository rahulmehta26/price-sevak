import { useQuery } from "@tanstack/react-query"
import Input from "../../components/ui/Input"
import Text from "../../components/ui/Text"
import { useAuthState } from "../../store/useAuthStore"
import { cn } from "../../utils/cn"
import Features from "./Features"
import { getProducts } from "../../services/products"
import ProductTracker from "./ProductTracker"

const Home = () => {

    const user = useAuthState((s) => s.user);

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products', user?.id],
        queryFn: getProducts,
        enabled: !!user,
    })

    return (
        <div
            className={cn(
                "relative min-h-screen w-5xl ",
                "pt-36 space-y-12 mx-auto",
            )}
        >
            <section className={cn(
                "space-y-12",
                "flex flex-col items-center"
            )} >
                <Text as="h1" className="text-[3.4rem] font-extrabold text-primary">
                    Never Miss a Price Drop — Smart Bachat
                </Text>


                <Text as="p" className="text-center text-black/50 text-xl">
                    Track prices from any e-commerce site.
                    Get instant alerts jab price kam ho. <br />
                    Save money with smart seva.
                </Text>

                <div
                    className={cn(
                        "w-full px-16",
                    )}
                >
                    <Input />
                </div>

            </section >

            {
                isLoading ? (
                    <div>
                        Loading Ui will be updated
                    </div>
                ) :
                    products.length === 0 ? (
                        <Features />
                    ) : (
                        <ProductTracker products={products} />
                    )

            }
        </div>
    );
};

export default Home