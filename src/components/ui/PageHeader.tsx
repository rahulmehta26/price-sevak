import Text from './Text'
import { cn } from '../../utils/cn'
import AnimatedItem from './AnimatedItem'

const PageHeader = ({ title, subTitle }: { title: string, subTitle?: string }) => {
    return (
        <AnimatedItem as="section">
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
        </AnimatedItem>
    )
}

export default PageHeader