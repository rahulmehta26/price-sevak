import { cn } from '../../utils/cn'
import type { Product } from '../../types/productTypes'
import type React from 'react';
import Toggle from '../../components/ui/Toggle';
import Text from '../../components/ui/Text';
import { useState } from 'react';

interface AlertCardProps {
    product: Product;
}

const AlertCard: React.FC<AlertCardProps> = ({ product }) => {

    const [isOn, setIsOn] = useState<boolean>(false)
    return (

        <section
            className={cn(
                "p-4",
                "bg-foreground/10 border rounded-sm",
                "shadow backdrop-blur-md hover:shadow-sm",
                "flex justify-start gap-10 items-center"
            )}
        >

            <div
                className={cn("w-20 h-20 rounded-sm shrink-0")}
            >
                <img
                    src={product?.image_url}
                    className={cn("w-full h-full object-cover rounded-sm")}
                    alt='Product image'
                />
            </div>

            <div
                className={cn("space-y-2")}
            >
                <Text
                    as='h4'
                    variant='subHeading'
                    className={cn("text-foreground line-clamp-2")}
                >
                    {
                        product?.name
                    }
                </Text>

                <div
                    className={cn("flex justify-start items-center gap-4")}
                >

                    <div
                        className={cn("w-20 flex items-center gap-2")}
                    >
                        <div className={cn(
                            "w-2 h-2 rounded-full",
                            isOn ? "bg-success animate-pulse" : " bg-foreground/50 "
                        )} />

                        <Text
                            as='span'
                            variant='tags'
                            className={cn(
                                "font-mono tracking-normal text-xs",
                                isOn ? "text-success" : "text-foreground/50"
                            )}
                        >
                            {
                                isOn ? "Active" : "Inactive"
                            }
                        </Text>
                    </div>

                    <Toggle isOn={isOn} onChange={setIsOn} />
                </div>

            </div>

        </section>
    )
}

export default AlertCard