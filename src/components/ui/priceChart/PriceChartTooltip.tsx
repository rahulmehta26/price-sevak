import { cn } from "../../../utils/cn"

const PriceChartTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null

    return (
        <div className={cn(
            "px-3 py-2 space-y-2",
            "rounded-lg bg-black/85",
            "text-xs text-white"
        )}>
            <div className="font-semibold">{label}</div>
            {payload
                .filter((p: any) => p.value !== null)
                .map((item: any, i: number) => (
                    <div key={i} style={{ color: item.color }}>
                        Price: ₹{item.value}
                    </div>
                ))}
        </div>
    )
}

export default PriceChartTooltip
