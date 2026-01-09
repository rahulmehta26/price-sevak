import type React from 'react';
import { cn } from '../../utils/cn'
import { useState } from 'react';
import Button from './Button';
import { useAuthState } from '../../store/useAuthStore';
import { useAuthModal } from '../../store/useAuthModal';
import { addProduct } from '../../services/products';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface InputProps {
    user?: string;
}

const Input: React.FC<InputProps> = () => {

    const [url, setUrl] = useState<string>("");

    const user = useAuthState((s) => s.user);

    const open = useAuthModal((s) => s.open);

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: addProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            setUrl("");
            alert("Product tracked successfully!");
        },
        onError: (error: any) => {
            alert(error.message || "Failed to track product");
        }
    })

    const handleSubmit = async (e: any) => {

        e.preventDefault();

        if (!user) {
            open();
            return;
        }

        if (!url) return alert("Please paste valid url ")

        mutation.mutate(url);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={cn(
                "w-full",
                "flex flex-col md:flex-row justify-start items-center gap-8"
            )}
        >

            <div
                className={cn(
                    "w-full md:flex-1",
                    "border-2 border-primary/60 rounded-full",
                    "focus-within:border-primary",
                    "flex justify-start items-center"
                )}

            >

                <input
                    id='url'
                    name='url'
                    type='url'
                    placeholder='Paste pruduct URL '
                    className={cn(
                        "w-full p-3 px-3 md:px-6",
                        "rounded-full outline-none bg-transparent",
                        "text-md font-oswald tracking-wider",
                        " placeholder:text-primary/80 "
                    )}
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />
            </div>

            <Button
                title={mutation.isPending ? "Tracking..." : "Track Price"}
                className="lg:px-12 md:px-8 shrink-0"
                type='submit'
                disabled={mutation.isPending}
            />
        </form>
    )
}

export default Input