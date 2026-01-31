import { cn } from '../../utils/cn'
import StatsBlock from '../../components/ui/StatsBlock'
import { formatCurrency } from '../../utils/priceCalculation'
import AnimatedItem from '../../components/ui/AnimatedItem';

interface StatsProps {
    avgSavings: number;
    bestDrop: number;
    totalTracking: number;
}

interface StatsBlockProps {
    stats: StatsProps;
    trackingSince: string
}

const OverviewStats = ({ stats, trackingSince }: StatsBlockProps) => {
    return (
        <AnimatedItem
            as='section'
            className={cn("flex justify-start items-center flex-wrap gap-4")}>
            <StatsBlock
                title="Avg. Savings"
                value={`₹${formatCurrency(stats.avgSavings)}`}
                valueStyle={cn("text-success")}
            />

            <StatsBlock
                title="Best Drop"
                value={stats.bestDrop > 0 ? `-${stats.bestDrop}%` : "0%"}
                valueStyle={cn("text-success")}
            />

            <StatsBlock
                title="Total Tracking"
                value={stats.totalTracking.toString()}
                valueStyle={cn("font-bold")}
            />

            <StatsBlock
                title="Tracking Since"
                value={trackingSince}
                valueStyle={cn("font-bold")}
            />
        </AnimatedItem>
    )
}

export default OverviewStats