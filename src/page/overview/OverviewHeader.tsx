import { useMemo } from "react";
import Bell from "../../components/icons/Bell";
import Package from "../../components/icons/Package";
import Text from "../../components/ui/Text";
import { cn } from "../../utils/cn";
import TrendDown from "../../components/icons/TrendDown";
import { useAlert } from "../../hooks/useAlert";
import { calculatePriceChange } from "../../utils/priceCalculation";
import { useProducts } from "../../hooks/useProducts";
import AnimatedItem from "../../components/ui/AnimatedItem";

const OverviewHeader = () => {
    const { data: products = [] } = useProducts();
    const { data: alerts = [] } = useAlert();

    const stats = useMemo(() => {
        const totalTracking = products.length;

        const activeAlerts = alerts.filter((a) => a.is_active).length;

        const dropsToday = products.filter((product) => {
            const priceChange = calculatePriceChange(product);
            return priceChange < 0;
        }).length;

        return {
            totalTracking,
            activeAlerts,
            dropsToday,
        };
    }, [products, alerts]);

    return (
        <AnimatedItem
            as="section"
            className={cn(
                "w-fit p-4",
                "border shadow hover:shadow-sm rounded-sm",
                "flex justify-between items-center ",
            )}
        >
            <div className={cn("flex items-center justify-between gap-4")}>
                <div className={cn("flex items-center flex-wrap gap-6")}>
                    <div className={cn("flex items-center gap-2")}>
                        <div
                            className={cn(
                                "w-10 h-10",
                                "rounded-md bg-primary/10",
                                "flex items-center justify-center",
                            )}
                        >
                            <Package className={cn("w-5 h-5 text-primary")} />
                        </div>
                        <div>
                            <Text
                                as="p"
                                variant="para"
                                className={cn("text-2xl font-bold font-mono")}
                            >
                                {stats?.totalTracking}
                            </Text>
                            <Text
                                as="p"
                                variant="para"
                                className={cn("text-xs text-foreground/90")}
                            >
                                Tracking
                            </Text>
                        </div>
                    </div>

                    <div className={cn("w-px h-10 bg-foreground")} />

                    <div className={cn("flex items-center gap-2")}>
                        <div
                            className={cn(
                                "w-10 h-10",
                                "rounded-md bg-gold/10",
                                "flex items-center justify-center",
                            )}
                        >
                            <Bell className={cn("w-5 h-5 text-gold")} />
                        </div>
                        <div>
                            <Text
                                as="p"
                                variant="para"
                                className={cn("text-2xl font-bold text-gold font-mono")}
                            >
                                {stats?.activeAlerts}
                            </Text>
                            <Text
                                as="p"
                                variant="para"
                                className={cn("text-xs text-foreground/90")}
                            >
                                Alerts
                            </Text>
                        </div>
                    </div>

                    <div className={cn("w-px h-10 bg-foreground")} />

                    <div className={cn("flex items-center gap-2")}>
                        <div
                            className={cn(
                                "w-10 h-10",
                                "rounded-md bg-success/10",
                                "flex items-center justify-center",
                            )}
                        >
                            <TrendDown className={cn("w-5 h-5 text-success")} />
                        </div>
                        <div>
                            <Text
                                as="p"
                                variant="para"
                                className={cn("text-2xl text-success font-bold font-mono")}
                            >
                                {stats?.dropsToday}
                            </Text>
                            <Text
                                as="p"
                                variant="para"
                                className={cn("text-xs text-foreground/90")}
                            >
                                Drops Today
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedItem>
    );
};

export default OverviewHeader;
