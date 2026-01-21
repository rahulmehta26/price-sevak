import React, { useState } from 'react'
import { cn } from '../../utils/cn'
import Button from '../../components/ui/Button'
import Plus from '../../components/icons/Plus'
import Text from '../../components/ui/Text'
import Input from '../../components/ui/Input'
import { addProduct } from '../../services/products'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '../../store/useToast'
import X from '../../components/icons/X'

const ProductHeader = () => {

    const [url, setUrl] = useState<string>("");
    const [isHidden, setIsHidden] = useState<boolean>(false);

    const addToast = useToast((s) => s.addToast)

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: addProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            setUrl("");
            addToast({
                title: "Product tracked successfully",
                description: "We'll notify you when the price drops.",
                type: "success",
                duration: 5000
            })
        },
        onError: (error: any) => {

            addToast({
                title: "Failed to track product",
                type: "error"
            })
        }
    })

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        if (!url) return addToast({ title: "Please enter a product URL", type: "info" });

        mutation.mutate(url);
    }

    return (

        <>
            <section
                className={cn("flex justify-between items-center")}
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
                        8 products been tracked
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
                            placeholder='Track products...'
                            onChange={setUrl}
                            showButton
                            onSubmit={handleSubmit}
                        />
                    </section>
                )
            }

        </>
    )
}

export default ProductHeader