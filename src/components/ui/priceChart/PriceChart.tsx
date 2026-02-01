import { useEffect, useState } from "react"
import { cn } from "../../../utils/cn"
import Text from "../Text"
import Loader from "../Loader"
import EmptyState from "../EmptyState"
import { getPriceHistory } from "../../../services/products"
import { useToast } from "../../../store/useToast"
import PriceChartGraph from "./PriceChartGraph"

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

const PriceChart = ({
    productId,

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

            <PriceChartGraph
                data={data}
            />
        </section>
    )
}

export default PriceChart
