import { useQuery } from "@tanstack/react-query"
import { getPriceHistory } from "../services/products"
import type { PriceHistory, Product } from "../types/productTypes";

export const usePriceHistory = ({ id, }: { id?: string; }) => {

    return useQuery<PriceHistory[], Error>({
        queryKey: ['price-history', id],
        queryFn: async () => {
            const res = await getPriceHistory(id as string);
            return res.history;
        },
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
        retry: 1,
        initialData: [],
    })
}