import React, { useState } from 'react'
import { cn } from '../../utils/cn';

interface ProductImageProps {
    productImage: string | undefined;
    alt: string;
    className?: string;
}

const ProductImage = ({ productImage, alt, className }: ProductImageProps) => {

    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    return (
        <div className={cn(
            "relative w-20 h-20",
            "bg-foreground/10 border rounded-sm",
            "shrink-0 overflow-hidden",
            className
        )}>

            {!isLoaded && (
                <div className={cn("absolute inset-0 bg-foreground/5 animate-pulse")} />
            )}

            <img
                src={productImage}
                alt={alt}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
                className={cn(
                    "w-full h-full object-cover transition-opacity duration-300",
                    isLoaded ? "opacity-100" : "opacity-0"
                )}
            />
        </div>
    )
}

export default ProductImage