import Text from './Text'
import { cn } from '../../utils/cn'

const PageHeader = ({ title, subTitle }: { title: string, subTitle?: string }) => {
    return (
        <section>
            <Text
                as="h4"
                variant="heading"
                className={cn("text-foreground font-semibold")}
            >
                {title}
            </Text>

            <Text
                as="span"
                variant="tags"
                className={cn("text-foreground/60 text-xs md:text-base font-normal")}
            >
                {subTitle}
            </Text>
        </section>
    )
}

export default PageHeader