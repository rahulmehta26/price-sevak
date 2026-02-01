import { motion } from 'motion/react';
import { cn } from '../../../utils/cn';
import Delete from '../../icons/Delete';
import { useDeleteProduct } from '../../../hooks/useDeleteProduct';

const ProductDeleteButton = ({ productId }: { productId: string }) => {

    const { mutate } = useDeleteProduct();

    return (
        <motion.button
            onClick={() => mutate(productId)}
            whileHover="hover"
            className={cn(
                "w-7 h-7 md:w-10 md:h-10",
                "bg-destructive/10 border rounded-sm",
                "cursor-pointer",
                "flex justify-center items-center"
            )}
        >
            <Delete className={cn("w-4 h-4 md:w-6 md:h-6 fill-destructive")} />
        </motion.button>

    )
}

export default ProductDeleteButton