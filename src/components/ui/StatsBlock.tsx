import { memo } from 'react'
import { cn } from '../../utils/cn'
import Text from './Text'
import AnimatedItem from './AnimatedItem';

interface StatsBlockProps {
    title: string;
    value: string;
    titleStyle?: string;
    valueStyle?: string;
}

const StatsBlock = memo(({ title, value, titleStyle, valueStyle }: StatsBlockProps) => {
    return (
        <AnimatedItem
            as='section'
            className={cn(
                "p-4 space-y-3",
                "border rounded-sm ",
                "bg-foreground/10 shadow backdrop-blur-md"
            )}
        >

            <Text
                as='h5'
                variant='tags'
                className={cn("font-mono text-foreground font-normal", titleStyle)}
            >
                {title}
            </Text>

            <Text
                as='span'
                variant='body'
                className={cn("text-foreground", valueStyle)}
            >
                {value}
            </Text>

        </AnimatedItem>
    )
});

export default StatsBlock