import type React from 'react';
import { cn } from '../../utils/cn'
import Button from './Button';
import Search from '../icons/Search';

interface InputProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit?: (e: React.FormEvent) => void;
    isLoading?: boolean;
    showButton?: boolean;
    placeholder?: string;
}

const Input: React.FC<InputProps> = ({
    value, onChange, onSubmit, isLoading = false, showButton = false, placeholder = "search"
}) => {

    return (
        <form
            onSubmit={onSubmit}
            className={cn(
                "w-full",
                "flex flex-col md:flex-row justify-start items-center gap-8"
            )}
        >

            <div
                className={cn(
                    "w-full pl-4",
                    "border border-foreground/60 rounded-sm",
                    "focus-within:border-foreground",
                    "flex items-center"
                )}
            >

                <Search />

                <input
                    type="text"
                    placeholder={placeholder}
                    className={cn(
                        "w-full p-3 px-4 md:px-6",
                        "rounded-sm outline-none bg-transparent",
                        "text-md font-oswald tracking-wider",
                        "placeholder:text-foreground/80"
                    )}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>

            {
                showButton &&
                (

                    <Button
                        title={isLoading ? "Tracking..." : "Track Price"}
                        className=" shrink-0"
                        type='submit'
                        disabled={isLoading}
                    />
                )
            }

        </form>
    )
}

export default Input