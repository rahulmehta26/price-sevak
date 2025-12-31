import Input from "../components/ui/Input"
import Text from "../components/ui/Text"
import { cn } from "../utils/cn"
import Features from "./Features"

const Home = () => {

    return (
        <>
            <section className={cn(
                "relative min-h-screen w-5xl ",
                "pt-36 space-y-12 mx-auto",
                "flex flex-col items-center"
            )} >
                <Text as="h1" className="text-5xl font-extrabold text-primary">
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

                <Features />

            </section >

        </>
    )
}

export default Home