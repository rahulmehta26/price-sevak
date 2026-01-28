import { useEffect, useState } from "react"
import {
    LineChart,
    Line,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts"
import { cn } from "../../../utils/cn"
import Text from "../Text"
import Loader from "../Loader"
import EmptyState from "../EmptyState"
import { getPriceHistory } from "../../../services/products"
import { useToast } from "../../../store/useToast"

interface PriceChartProps {
    productId: string
    height?: number
    yAxis?: boolean
    cartesianGrid?: boolean
}

interface ChartItem {
    date: string
    price: number
    up: number | null
    down: number | null
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null

    return (
        <div
            style={{
                background: "rgba(0,0,0,0.85)",
                padding: "10px 12px",
                borderRadius: "8px",
                color: "#fff",
                fontSize: 12,
            }}
        >
            <div style={{ fontWeight: 600 }}>{label}</div>
            {payload
                .filter((p: any) => p.value !== null)
                .map((item: any, idx: number) => (
                    <div key={idx} style={{ color: item.color, marginTop: 2 }}>
                        Price: ₹{item.value}
                    </div>
                ))}
        </div>
    )
}

const PriceChart = ({
    productId,
    height = 260,
    yAxis = true,
    cartesianGrid = true,
}: PriceChartProps) => {

    const [data, setData] = useState<ChartItem[]>([])
    const [loading, setLoading] = useState(true)

    const addToast = useToast((s) => s.addToast);

    useEffect(() => {
        async function loadData() {
            try {
                const response = await getPriceHistory(productId)
                const history = Array.isArray(response)
                    ? response
                    : response?.history || []

                if (!Array.isArray(history) || history.length === 0) {
                    setData([])
                    return
                }

                const chartData: ChartItem[] = history.map(
                    (item: any, index: number, arr: any[]) => {
                        const price = Number(item.price)
                        const prevPrice =
                            index > 0 ? Number(arr[index - 1].price) : price

                        return {
                            date: new Date(item.checked_at).toLocaleDateString(),
                            price,
                            up: index === 0 ? price : price > prevPrice ? price : null,
                            down: price < prevPrice ? price : null,
                        }
                    }
                )

                setData(chartData)
            } catch (err) {
                addToast({
                    title: "Failed to load price history",
                    type: "error"
                })
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [productId])

    if (loading)
        return (
            <div className={cn("flex justify-center items-center h-60")}>
                <Loader text="Loading price chart..." />
            </div>
        )

    if (data.length === 0)
        return (
            <EmptyState title="No price history yet. Check back after the first update." />
        )

    return (
        <section className={cn("w-full space-y-4")}>
            <Text as="h4" variant="subHeading" className={cn("text-sm text-foreground md:text-lg")}>
                Price History
            </Text>

            <ResponsiveContainer width="100%" height={height}>
                <LineChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
                    <defs>
                        <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#22c55e" stopOpacity={0.45} />
                            <stop offset="100%" stopColor="#22c55e" stopOpacity={0.05} />
                        </linearGradient>

                        <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#ef4444" stopOpacity={0.45} />
                            <stop offset="100%" stopColor="#ef4444" stopOpacity={0.05} />
                        </linearGradient>
                    </defs>

                    {cartesianGrid && (
                        <CartesianGrid stroke="rgba(255,255,255,0.06)" />
                    )}

                    <XAxis
                        dataKey="date"
                        interval="preserveStartEnd"
                        padding={{ left: 0, right: 10 }}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: "#9ca3af" }}
                    />

                    {yAxis && (
                        <YAxis
                            tick={{ fontSize: 10, fill: "#9ca3af" }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(v) => `₹${v}`}
                        />
                    )}

                    <Tooltip content={<CustomTooltip />} />

                    {/* PRICE FALL (GREEN) */}
                    <Area
                        type="monotone"
                        dataKey="down"
                        stroke="none"
                        fill="url(#greenGradient)"
                    />
                    <Line
                        type="monotone"
                        dataKey="up"
                        stroke="#ef4444"
                        strokeWidth={2}
                        dot={(props: any) => {
                            if (props.index === 0) {
                                return (
                                    <circle
                                        cx={props.cx}
                                        cy={props.cy}
                                        r={4}
                                        fill="#e5e7eb"
                                    />
                                )
                            }
                            return null
                        }}
                        activeDot={{ r: 5 }}
                    />

                    {/* PRICE RISE (RED) */}
                    <Area
                        type="monotone"
                        dataKey="up"
                        stroke="none"
                        fill="url(#redGradient)"
                    />
                    <Line
                        type="monotone"
                        dataKey="down"
                        stroke="#22c55e"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 5 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </section>
    )
}

export default PriceChart
