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
import PriceChartTooltip from "./PriceChartTooltip"
import type { ChartItem } from "./types"

interface Props {
    data: ChartItem[]
}

const PriceChartGraph = ({
    data,
}: Props) => {
    return (
        <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data} margin={{ top: 10, right: 20, bottom: 10 }}>
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

                <CartesianGrid stroke="rgba(255,255,255,0.06)" />

                <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#9ca3af" }}
                />

                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#9ca3af" }}
                    tickFormatter={(v) => `₹${v}`}
                />

                <Tooltip
                    cursor={{ stroke: "#8884d8", strokeWidth: 1 }}
                    allowEscapeViewBox={{ x: true, y: true }}
                    content={<PriceChartTooltip />}
                />

                <Area type="monotone" dataKey="down" fill="url(#greenGradient)" />
                <Line type="monotone" dataKey="down" stroke="#22c55e" dot={false} />

                <Area type="monotone" dataKey="up" fill="url(#redGradient)" />
                <Line type="monotone" dataKey="up" stroke="#ef4444" />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default PriceChartGraph
