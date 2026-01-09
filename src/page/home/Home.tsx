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
                "relative min-h-screen w-full md:w-2xl lg:w-4xl xl:w-5xl  ",
                "pt-28 md:pt-36 pb-8 md:pb-12 space-y-12 mx-auto",
            )}
        >
            <section className={cn(
                "space-y-8 md:space-y-12",
                "flex flex-col items-center"
            )} >
                <Text as="h1" className="text-3xl text-center md:text-[2.24rem] lg:text-[2.98rem] xl:text-[3.4rem] font-extrabold text-primary">
                    Never Miss a Price Drop — Smart Bachat
                </Text>

                <Text as="p" className="text-center text-black/50 text-md md:text-xl">
                    Track prices from any e-commerce site.
                    Get instant alerts jab price kam ho. <br />
                    Save money with smart seva.
                </Text>

                <div
                    className={cn(
                        "w-full px-4 md:px-8 lg:px-16",
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