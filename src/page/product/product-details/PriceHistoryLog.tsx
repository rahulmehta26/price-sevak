import { cn } from '../../../utils/cn';
import Text from '../../../components/ui/Text';
import ChevronRight from '../../../components/icons/ChevronRight';
import { formatCurrency } from '../../../utils/priceCalculation';
import type { PriceHistory } from '../../../types/productTypes';
import AnimatedItem from '../../../components/ui/AnimatedItem';

const PriceHistoryLog = ({ priceHistory }: { priceHistory: PriceHistory[] }) => {
    return (
        <AnimatedItem
            as='section'
            className={cn(
                "w-fit p-4",
                "bg-foreground/10 rounded-sm border",
                "space-y-2",
            )}
        >
            {
                priceHistory.length === 0 ? (
                    <Text as="p" variant="para" className="text-foreground/60">
                        No price history available yet
                    </Text>
                ) : (
                    priceHistory.slice(0, 10).map((history, index) => {
                        const prevPrice =
                            index < priceHistory.length - 1
                                ? priceHistory[index + 1].price
                                : history.price;
                        const priceDiff = Number(history.price) - Number(prevPrice);

                        return (
                            <div key={history.id} className={cn("flex items-center gap-20")}>
                                <div className={cn("flex justify-start items-center gap-2")}>
                                    <ChevronRight className={cn("text-primary w-5 h-5")} />
                                    <Text
                                        as="span"
                                        variant="tags"
                                        className={cn(
                                            "text-foreground/60 font-mono font-normal tracking-normal",
                                        )}
                                    >
                                        {new Date(history.checked_at).toLocaleString("en-IN")}
                                    </Text>
                                </div>

                                <div className="space-x-2">
                                    <Text
                                        as="span"
                                        variant="tags"
                                        className={cn(
                                            "text-foreground font-mono font-normal tracking-normal",
                                        )}
                                    >
                                        <Text as="span" className="text-foreground text-xs">
                                            ₹
                                        </Text>
                                        {formatCurrency(Number(history.price))}
                                    </Text>
                                    {priceDiff !== 0 && (
                                        <Text
                                            as="span"
                                            variant="tags"
                                            className={cn(
                                                "font-mono font-normal tracking-normal",
                                                priceDiff < 0 ? "text-success" : "text-red",
                                            )}
                                        >
                                            {priceDiff < 0 ? "" : "+"}
                                            {formatCurrency(Math.abs(priceDiff))}
                                        </Text>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
        </AnimatedItem>
    )
}

export default PriceHistoryLog