import React, { useRef, useState } from 'react'
import { cn } from '../../utils/cn'
import Button from '../../components/ui/Button'
import Plus from '../../components/icons/Plus'
import Text from '../../components/ui/Text'
import Input from '../../components/ui/Input'
import { addProduct } from '../../services/products'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '../../store/useToast'
import X from '../../components/icons/X'
import { useProducts } from '../../hooks/useProducts'

const RATE_LIMIT_MS = 5000;

const ProductHeader = () => {

    const [url, setUrl] = useState<string>("");
    const [isHidden, setIsHidden] = useState<boolean>(false);

    const rateLimitRef = useRef(false);

    const addToast = useToast((s) => s.addToast)

    const { data: products = [] } = useProducts();

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: addProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            queryClient.invalidateQueries({ queryKey: ['alerts'] });
            setUrl("");
            setIsHidden(false)
            addToast({
                title: "Product tracked successfully",
                description: "We'll notify you when the price drops.",
                type: "success",
                duration: 5000
            })
        },
        onError: (error: unknown) => {

            const message = error instanceof Error ? error.message : "Please try again";

            addToast({
                title: "Failed to track product",
                description: message,
                type: "error",
            })
        }
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (rateLimitRef.current) {
            addToast({
                title: "Please wait",
                description: "You're adding products too quickly",
                type: "info",
            });
            return;
        }

        if (!url.trim()) {
            addToast({
                title: "Please enter a product URL",
                type: "info",
            });
            return;
        }

        rateLimitRef.current = true;

        setTimeout(() => {
            rateLimitRef.current = false;
        }, RATE_LIMIT_MS);

        mutation.mutate(url);
    };


    return (

        <>
            <section
                className={cn("flex justify-between items-center flex-wrap gap-4")}
            >
                <div
                    className=' space-y-2 '
                >

                    <Text
                        as='h2'
                        variant='heading'
                        className={cn("text-foreground")}
                    >
                        Products
                    </Text>

                    <Text
                        as='span'
                        variant='body'
                        className={cn("text-foreground/60 font-mono font-normal tracking-normal text-sm")}
                    >
                        {products?.length} {products.length === 1 ? 'product' : 'products'} being tracked
                    </Text>

                </div>

                <Button
                    title={isHidden ? 'Hide' : "Add Product"}
                    variant='primary'
                    leftIcon={isHidden ? X : Plus}
                    leftIconStyle={cn("stroke-2")}
                    onClick={() => setIsHidden(prev => !prev)}
                />
            </section>

            {
                isHidden && (

                    <section
                        className={cn(
                            "p-4 w-full",
                            "bg-foreground/10 backdrop-blur-md rounded-sm",
                            "shadow hover:shadow-sm",
                            "flex justify-between items-center gap-4"
                        )}
                    >
                        <Input
                            value={url}
                            placeholder='Paste product URL here...'
                            onChange={setUrl}
                            showButton
                            onSubmit={handleSubmit}
                            isLoading={mutation.isPending}
                        />
                    </section>
                )
            }

        </>
    )
}

export default ProductHeader