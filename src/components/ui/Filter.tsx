import { useState } from 'react'
import FilterIcon from '../icons/FilterIcon'
import ChevronDown from '../icons/ChevronDown'
import { cn } from '../../utils/cn'
import Select, { type SelectOption } from './Select'

interface FilterProps {
    value: string
    onChange: (value: string) => void
    options: SelectOption[]
}

const Filter = ({
    value,
    onChange,
    options
}: FilterProps) => {

    const [open, setOpen] = useState<boolean>(false)

    return (
        <div
            className={cn(
                "p-3 border border-foreground/60 rounded-sm",
                "focus-within:border-foreground cursor-pointer",
                "flex justify-between items-center gap-4"
            )}
            onClick={() => setOpen(o => o || true)}
        >
            <div className={cn("flex items-center gap-4 w-full")}>
                <FilterIcon className="stroke-1 text-foreground" />

                <Select
                    value={value}
                    onChange={onChange}
                    options={options}
                    open={open}
                    onOpenChange={setOpen}
                />

                <ChevronDown
                    className={cn(
                        "transition-transform",
                        open && "rotate-180"
                    )}
                />
            </div>
        </div>

    )
}

export default Filter