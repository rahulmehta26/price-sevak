export interface PriceChartProps {
  productId: string;
  height?: number;
  yAxis?: boolean;
  cartesianGrid?: boolean;
}

export interface ChartItem {
  date: string;
  price: number;
  up: number | null;
  down: number | null;
}
