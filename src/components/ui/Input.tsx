import type React from 'react';
import { cn } from '../../utils/cn'
import { useState } from 'react';
import Button from './Button';
import { useAuthState } from '../../store/useAuthStore';
import { useAuthModal } from '../../store/useAuthModal';
import { addProduct } from '../../services/products';

interface InputProps {
    user?: string;
}

const Input: React.FC<InputProps> = () => {

    const [url, setUrl] = useState<string>("");

    const user = useAuthState((s) => s.user)

    const open = useAuthModal((s) => s.open)

    const handleAuthModal = () => {
        if (!user) {
            open();
            return;
        }

    }

    const handleSubmit = async (e: any) => {

        e.preventDefault();

        handleAuthModal()

        const result = await addProduct(url);

        if (result.error) {
            //toast
        } else {
            // toast || Product tracked successfully
            setUrl("");
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={cn(
                "w-full",
                "flex justify-center items-center gap-8"
            )}
        >

            <div
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
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />
            </div>

            <Button
                title="Track Price"
                className="px-8 shrink-0"
                type='submit'
            />
        </form>
    )
}

export default Input