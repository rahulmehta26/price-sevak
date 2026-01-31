import { cn } from '../../../utils/cn'
import Text from '../../../components/ui/Text'
import RightArrow from '../../../components/icons/RightArrow'
import { useNavigate } from 'react-router-dom'
import { motion, type Variants } from 'motion/react'

const bgVariants: Variants = {
    hidden: {
        scaleX: 0,
    },
    visible: {
        scaleX: 1,
        transition: {
            duration: 0.35,
            ease: 'easeOut',
        },
    },
}

const contentVariants: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.25,
            ease: 'easeOut',
        },
    },
}


const BackButton = () => {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate('/products')
    }

    return (
        <button
            onClick={handleBack}
            className={cn(
                'relative p-1 rounded-sm',
                'flex items-center gap-3',
                'overflow-hidden cursor-pointer'
            )}
        >
            <motion.span
                variants={bgVariants}
                initial="hidden"
                animate="visible"
                style={{ transformOrigin: 'left' }}
                className={cn("absolute inset-0 gradient-bg z-0")}
            />

            <motion.div
                initial="hidden"
                animate="visible"
                transition={{ staggerChildren: 0.1, delayChildren: 0.15 }}
                className={cn("relative z-10 flex items-center gap-3")}
            >
                <motion.div variants={contentVariants}>
                    <RightArrow className={cn("rotate-180 text-foreground/80")} />
                </motion.div>

                <motion.div variants={contentVariants}>
                    <Text
                        as="span"
                        variant="tags"
                        className={cn("text-foreground/80 font-mono font-normal")}
                    >
                        Back to Products
                    </Text>
                </motion.div>
            </motion.div>
        </button>
    )
}

export default BackButton
