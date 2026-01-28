import { useState } from "react"
import { cn } from "../../utils/cn"

export interface SelectOption {
    label: string
    value: string
}

interface SelectProps {
    value: string;
    options: SelectOption[];
    onChange: (value: string) => void;
    className?: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const Select = ({
    value,
    options,
    onChange,
    open,
    onOpenChange,
}: SelectProps) => {

    const selected = options.find(o => o.value === value)

    return (
        <div
            className="relative"
            onClick={(e) => e.stopPropagation()}
        >
            <button
                type="button"
                className={cn("w-full text-left")}
                onClick={() => onOpenChange(true)}
            >
                <span className={cn(
                    "text-ellipsis cursor-pointer font-mono text-sm",
                    "whitespace-nowrap overflow-hidden text-ellipsis block"
                )}>
                    {selected?.label ?? "Select"}
                </span>
            </button>

            {open && (
                <>
                    <div
                        className={cn("fixed inset-0 z-40 cursor-default")}
                        onClick={(e) => {
                            e.stopPropagation()
                            onOpenChange(false)
                        }}
                        style={{ cursor: "default" }}
                    />

                    <div
                        className={cn(
                            " mt-4 p-2 w-[10rem]",
                            "absolute z-50 left-1/2 cursor-default -translate-x-1/2",
                            "bg-background border border-foreground/60 rounded-sm shadow-lg"
                        )}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {options.map(option => (
                            <button
                                key={option.value}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onChange(option.value)
                                    onOpenChange(false)
                                }}
                                className={cn(
                                    "w-full px-2 py-3 ",
                                    "text-center font-mono text-sm ",
                                    "cursor-pointer",
                                    "hover:bg-primary/10 rounded-sm",
                                    value === option.value && "bg-primary/50"
                                )}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default Select
