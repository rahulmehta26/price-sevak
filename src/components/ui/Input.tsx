import type React from 'react';
import { cn } from '../../utils/cn'

interface InputProps {
    value: string;
    onChange: (e: any) => void
}

const Input: React.FC<InputProps> = ({ value, onChange }) => {
    return (
        <form
            className={cn(
                "flex-1",
                "border-2 border-primary/60 rounded-full",
                "focus-within:border-primary",
                "flex justify-start items-center"
            )}
        >
            <input
                id='url'
                name='url'
                type='url'
                placeholder='paste pruduct URL '
                className={cn(
                    "w-full p-3 px-6",
                    "rounded-full outline-none bg-transparent",
                    "text-md font-oswald tracking-wider",
                    " placeholder:text-primary/80 "
                )}
                value={value}
                onChange={onChange}
            />
        </form>
    )
}

export default Input