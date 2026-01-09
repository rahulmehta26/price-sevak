import React, { useEffect, useState } from 'react'
import { cn } from '../../utils/cn';
import Text from './Text';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { getPriceHistory } from '../../services/products';

const PriceChart = ({ productId }: { productId: string }) => {

    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        async function loadData() {
            try {
                const response = await getPriceHistory(productId);

                const history = response?.history || response;

                const chartData = history.map((item) => ({
                    date: new Date(item.checked_at).toLocaleDateString(),
                    price: parseFloat(item.price.toString()),
                }))

                setData(chartData);
            } catch (error) {
                console.log("Failed to load price history", error);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [productId])

    if (data.length === 0) {
        return (
            <Text
                as='p'
                variant='para'
                className='text-black'
            >
                No price history yet. Check back after the first daily update!.
            </Text>
        )
    }

    return (
        <section
            className={cn("w-full space-y-6")}
        >
            <Text
                as='h4'
                variant='subHeading'
                className={cn("text-black text-sm md:text-lg font-bold")}
            >
                Price History
            </Text>

            <ResponsiveContainer width="100%" height={200} style={{ paddingLeft: 0 }} >

                <LineChart data={data} margin={{ top: 10, right: 10, bottom: 10, left: 0 }} >

                    <CartesianGrid strokeDasharray="3 3" stroke='var(--color-black)' />

                    <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke='var(--color-black)' />
                    <YAxis tick={{ fontSize: 12 }} stroke='var(--color-black)' />

                    <Tooltip
                        contentStyle={{
                            background: "white",
                            border: "1px solid var(--color-black)",
                            borderRadius: "6px",
                        }}
                    />

                    <Line
                        type="monotone"
                        dataKey="price"
                        stroke='var(--color-primary)'
                        strokeWidth={2}
                        dot={{ fill: "var(--color-primary)", r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>

            </ResponsiveContainer>
        </section>
    )
}

export default PriceChart