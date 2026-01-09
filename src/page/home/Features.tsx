import Text from "../../components/ui/Text"
import { FEATURES, type FeatureProps } from "../../constant/features"
import { cn } from "../../utils/cn"


const Features = () => {
    return (
        <section>

            <div
                className={cn(
                    "flex justify-between items-center gap-8"
                )}
            >
                {
                    FEATURES?.map(({ desc, icon: Icon, id, title }: FeatureProps) => {
                        return (
                            <div
                                key={id}
                                className={cn(
                                    "h-auto p-8",
                                    "bg-secondary rounded-lg",
                                    "flex flex-col justify-center items-center gap-6"
                                )}
                            >
                                <Text as='span' variant='heading' className={cn("text-black")} >
                                    {title}

                                </Text>

                                <div
                                    className={cn(
                                        "w-10 h-auto p-2",
                                        "bg-primary rounded-full",
                                        "flex items-center justify-center",
                                    )}
                                >
                                    <Icon />
                                </div>

                                <Text as='p' variant='para' className='text-black/50 text-center' >
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