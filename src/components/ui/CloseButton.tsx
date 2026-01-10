import { cn } from '../../utils/cn'

interface CloseButtonProps {
    onClick: () => void
    className?: string
}

const CloseButton = ({ onClick, className }: CloseButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                "w-8 h-8 rounded-full bg-black",
                "absolute top-4 right-4",
                "cursor-pointer group stroke-2",
                "flex flex-col justify-center items-center",
                className
            )}
        >
            <span className={cn(
                "block w-4 h-0.5 rounded-full",
                "bg-primary/70 group-hover:bg-primary",
                "transition-colors duration-300 rotate-45 "
            )} />

            <span className={cn(
                "block w-4 h-0.5 rounded-full",
                "bg-primary/70 group-hover:bg-primary",
                "transition-color duration-300 rotate-[-45deg] "
            )} />

        </button>
    )
}

export default CloseButton