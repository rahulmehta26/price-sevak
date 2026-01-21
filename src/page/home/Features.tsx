import Text from "../../components/ui/Text"
import { FEATURES, type FeatureProps } from "../../constant/features"
import { cn } from "../../utils/cn"


const Features = () => {
    return (
        <section
            className={cn(
                "w-full mx-auto",
                "flex flex-col justify-center items-center space-y-16"
            )}
        >

            <div
                className={cn(
                    "w-full",
                    "flex flex-col justify-center items-center space-y-5"
                )}
            >

                <Text
                    as="h2"
                    variant="heading"
                    className={cn(
                        "md:text-[2.24rem] text-[2.2rem] lg:text-5xl",
                        "text-center tracking-normal font-extrabold text-foreground"
                    )}
                >
                    Everything You Need to <span className={(cn("gradient-text"))} >Save Money</span>
                </Text>

                <Text
                    className={cn("text-center w-[90%] text-foreground/50 text-md md:text-lg")}
                >
                    Powerful features for smarter buying and better Bachat.
                </Text>
            </div>

            <div
                className={cn(
                    "grid gap-6 px-4 md:grid-cols-2 lg:grid-cols-3 ",
                )}
            >

                {
                    FEATURES?.map(({ desc, icon: Icon, id, title }: FeatureProps) => {
                        return (
                            <div
                                key={id}
                                className={cn(
                                    "h-auto p-6",
                                    "border shadow hover:shadow-sm",
                                    "bg-foreground/10 rounded-sm",
                                    "backdrop-blur-md",
                                    "flex flex-col justify-center items-start gap-6"
                                )}
                            >

                                <div
                                    className={cn(
                                        "w-10 h-auto p-2",
                                        "bg-primary/10 rounded-sm",
                                        "flex items-center justify-center",
                                    )}
                                >
                                    <Icon className={cn("text-primary")} />
                                </div>

                                <Text as='span' variant='heading' className={cn("text-foreground font-normal")} >
                                    {title}

                                </Text>

                                <Text as='p' variant='para' className={cn('text-foreground/70 text-start font-normal')} >
                                    {desc}
                                </Text>
                            </div>

                        )
                    })
                }

            </div>

        </section>
    )
}

export default Features