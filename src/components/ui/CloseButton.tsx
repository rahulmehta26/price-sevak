import { cn } from '../../utils/cn'

interface CloseButtonProps {
    onClick: () => void;
    className?: string;
    iconStyle?: string;
}

const CloseButton = ({ onClick, className, iconStyle }: CloseButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                "w-8 h-8 rounded-sm bg-foreground/20",
                "absolute top-4 right-4",
                "cursor-pointer group stroke-2",
                "flex flex-col justify-center items-center",
                className
            )}
        >
            <span className={cn(
                "block w-4 h-0.5 rounded-full",
                "bg-foreground/70 group-hover:bg-foreground",
                "transition-colors duration-300 rotate-45 ",
                iconStyle
            )} />

            <span className={cn(
                "block w-4 h-0.5 rounded-full",
                "bg-foreground/70 group-hover:bg-foreground",
                "transition-color duration-300 rotate-[-45deg] ",
                iconStyle
            )} />

        </button>
    )
}

export default CloseButton