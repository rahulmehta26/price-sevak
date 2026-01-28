import { cn } from '../../../utils/cn'
import Text from '../../../components/ui/Text'
import RightArrow from '../../../components/icons/RightArrow'
import { useNavigate } from 'react-router-dom'

const BackButton = () => {

    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/products");
    };

    return (
        <button
            onClick={handleBack}
            className={cn(
                "gradient-bg p-1 rounded-sm",
                "flex justify-start items-center gap-3",
                "cursor-pointer",
            )}
        >
            <RightArrow className={cn("rotate-180 text-foreground/80")} />

            <Text
                as="span"
                variant="tags"
                className={cn("text-foreground/80 font-mono font-normal")}
            >
                Back to Products
            </Text>
        </button>
    )
}

export default BackButton