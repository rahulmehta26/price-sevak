import { cn } from '../../utils/cn'
import type { Alert } from '../../types/productTypes'
import type React from 'react';
import Toggle from '../../components/ui/Toggle';
import Text from '../../components/ui/Text';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../../store/useToast';
import { updateAlert } from '../../services/alerts';

interface AlertCardProps {
    alert: Alert;
}

const AlertCard: React.FC<AlertCardProps> = ({ alert }) => {

    const queryClient = useQueryClient();

    const addToast = useToast((s) => s.addToast);

    const [isOn, setIsOn] = useState<boolean>(alert.is_active);

    const toggleMutation = useMutation({
        mutationFn: async (newState: boolean) => {
            return await updateAlert(alert.id, { is_active: newState });
        },
        onMutate: async (newState: boolean) => {
            setIsOn(newState);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['alerts'] });

            addToast({
                title: data.is_active ? 'Alert activated' : 'Alert paused',
                description: data.is_active
                    ? 'You will receive notifications when price drops'
                    : 'Price checking paused for this product',
                type: 'success'
            })
        },
        onError: (previousState) => {
            setIsOn(!previousState);
            addToast({
                title: "Failed to update alert",
                type: "error"
            })
        }
    })

    const handleToggle = (newState: boolean) => {
        toggleMutation.mutate(newState)
    }
    return (

        <section
            className={cn(
                "p-4",
                "bg-foreground/10 border rounded-sm",
                "shadow backdrop-blur-md hover:shadow-sm",
                "flex justify-start gap-4 md:gap-10 items-center"
            )}
        >

            <div
                className={cn("w-20 h-20 rounded-sm shrink-0")}
            >
                <img
                    src={alert?.image_url}
                    className={cn("w-full h-full object-cover rounded-sm")}
                    alt='Product image'
                />
            </div>

            <div
                className={cn("space-y-4")}
            >
                <Text
                    as='h4'
                    variant='subHeading'
                    className={cn("text-foreground text-sm md:text-base line-clamp-2")}
                >
                    {
                        alert?.product_name
                    }
                </Text>

                <div
                    className={cn("flex justify-start items-center gap-1 md:gap-4")}
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

                    <Toggle
                        isOn={isOn}
                        onChange={handleToggle}
                        disabled={toggleMutation.isPending}
                    />
                </div>

            </div>

        </section>
    )
}

export default AlertCard