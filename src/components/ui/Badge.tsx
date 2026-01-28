import Text from './Text'
import { cn } from '../../utils/cn';

interface BadgeProps {
    title: string;
    className?: string;
    textStyle?: string;
}

const Badge = ({ title, className, textStyle }: BadgeProps) => {
    return (

        <div
            className={cn(
                "px-2 py-1.5",
                "gradient-bg",
                "rounded-sm",
                "flex justify-center items-center gap-2",
                className
            )}
        >
            <Text
                as='span'
                variant='para'
                className={cn("text-xs md:text-sm", textStyle)}
            >
                {title}
            </Text>
        </div>
    )
}

export default Badge