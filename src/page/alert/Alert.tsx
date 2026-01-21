// This alert page will decide that cron should call or not, which mens should be tracked or not ans email need to send or not?

import { cn } from '../../utils/cn'
import Text from '../../components/ui/Text'
import AlertHeader from './AlertHeader'
import { useProducts } from '../../hooks/useProducts'
import AlertCard from './AlertCard'

const Alert = () => {

    const { data: products = [] } = useProducts();

    return (
        <section
            className={cn("page-container")}
        >

            <div>

                <Text
                    as="h4"
                    variant="heading"
                    className={cn("text-foreground font-semibold")}
                >
                    Alerts
                </Text>

                <Text
                    as="span"
                    variant="tags"
                    className={cn("text-foreground/60 text-xs md:text-base font-light")}
                >
                    Get notified when prices hit your target.
                </Text>
            </div>

            <AlertHeader />

            <div
                className={cn(
                    "pt-6",
                    "grid gap-6 md:grid-cols-2 lg:grid-cols-2 ",
                )}
            >
                {
                    products?.map((product) => <AlertCard key={product?.id} product={product} />)
                }

            </div>

        </section>
    )
}

export default Alert