import { motion } from 'motion/react'
import { cn } from '../../utils/cn'
import Text from '../../components/ui/Text'
import Button from '../../components/ui/Button'
import Error from '../../components/icons/Error';
import { useNavigate } from 'react-router-dom';

interface ErrorPageProps {
    error: Error;
    resetError: () => void;
}

const ErrorPage = ({ error, resetError }: ErrorPageProps) => {

    const navigate = useNavigate();

    const goHome = () => {
        resetError();
        navigate("/");
    };

    return (
        <div
            className={cn(
                "min-h-screen w-full",
                "bg-background",
                "flex items-center justify-center",
                "p-8"
            )}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.3,
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                }}
                className={cn(
                    "max-w-2xl w-full",
                    "bg-secondary rounded-lg",
                    "p-12 space-y-8",
                    "text-center"
                )}
            >
                <div
                    className={cn(
                        "w-24 h-24 mx-auto",
                        "bg-red/10 rounded-full",
                        "flex items-center justify-center"
                    )}
                >
                    <Error className='w-12 h-12 text-red' />
                </div>

                <div className="space-y-4">
                    <Text
                        as="h1"
                        variant="heading"
                        className="text-4xl font-extrabold text-black"
                    >
                        Oops! Something Went Wrong
                    </Text>

                    <Text as="p" variant="para" className="text-black/60 text-lg">
                        We encountered an unexpected error. Don't worry, we're working
                        on fixing it.
                    </Text>
                </div>

                <div
                    className={cn(
                        "flex flex-col sm:flex-row",
                        "items-center justify-center gap-4"
                    )}
                >
                    <Button
                        title="Try Again"
                        variant="primary"
                        className="px-8"
                        onClick={resetError}
                    />

                    <Button
                        title="Go to Home"
                        variant="outline"
                        className="px-8 border-black hover:bg-primary/20"
                        textStyle="text-black"
                        onClick={goHome}
                    />
                </div>

                {import.meta.env.DEV && error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ delay: 0.2 }}
                        className={cn(
                            "mt-8 p-6",
                            "bg-red/5 rounded-lg",
                            "border-2 border-red/20",
                            "text-left"
                        )}
                    >
                        <Text
                            as="h3"
                            variant="subHeading"
                            className="text-red font-bold mb-4"
                        >
                            🐛 Development Error Details
                        </Text>

                        <div className="space-y-2">
                            <Text as="p" variant="base" className="text-red font-bold">
                                {error.name}
                            </Text>

                            <Text as="p" variant="para" className="text-red/80">
                                {error.message}
                            </Text>

                            {error.stack && (
                                <pre
                                    className={cn(
                                        "mt-4 p-4",
                                        "bg-black/5 rounded",
                                        "text-xs text-red/70",
                                        "overflow-x-auto",
                                        "font-mono"
                                    )}
                                >
                                    {error.stack}
                                </pre>
                            )}
                        </div>
                    </motion.div>
                )}

                <div className="pt-4 border-t-2 border-black/50">
                    <Text as="p" variant="para" className="text-black/60 text-sm">
                        If this problem persists,
                        refreshing the page.
                    </Text>
                </div>
            </motion.div>
        </div>
    )
}

export default ErrorPage