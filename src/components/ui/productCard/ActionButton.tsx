import { useNavigate } from 'react-router-dom'
import Button from '../Button'
import Bell from '../../icons/Bell'
import ChevronRight from '../../icons/ChevronRight'
import { cn } from '../../../utils/cn'
import { useCallback } from 'react'

const ActionButton = ({ productId }: { productId: string }) => {

    const navigate = useNavigate();

    const handleDetailNavigation = useCallback(() => {
        navigate(`/product-detail/${productId}`)
    }, [navigate, productId]);

    const handleAlertNavigation = () => {
        navigate("/alerts")
    }

    return (
        <div
            className={cn(
                "flex justify-center items-center",
                "gap-4 shrink-0 flex-wrap"
            )}
        >
            <Button
                title="Set Alert"
                variant="outline"
                textStyle={cn("text-foreground")}
                leftIcon={Bell}
                onClick={handleAlertNavigation}
                leftIconStyle={cn("text-foreground stroke-foreground")}
                type='button'
            />

            <Button
                title="View Details"
                variant="primary"
                rightIcon={ChevronRight}
                onClick={handleDetailNavigation}
                type='button'
            />
        </div>
    )
}

export default ActionButton