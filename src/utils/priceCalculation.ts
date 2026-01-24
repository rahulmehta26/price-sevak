import type { Product } from "../types/productTypes";

export const calculatePriceChange = (product: Product): number => {
  if (!product.original_price || !product.current_price) return 0;

  const change =
    ((product.original_price - product.current_price) /
      product.original_price) *
    100;

  return Number(change.toFixed(2));
};

export const formatCurrency = (
  amount: number,
  includeSymbol = false,
): string => {
  const formatted = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(amount);

  return includeSymbol ? `₹${formatted}` : formatted;
};

export const formatPriceWithSymbol = (amount: number): string => {
  return `₹${formatCurrency(amount)}`;
};

export const calculateStats = (product: Product[]) => {
  if (!product || product.length === 0) {
    return {
      avgSavings: 0,
      bestFrop: 0,
      totalTracking: 0,
    };
  }

  const savings = product
    .filter(
      (p) =>
        p.original_price &&
        p.current_price &&
        p.original_price > p.current_price,
    )
    .map((p) => (p.original_price || 0) - p.current_price);

  const avgSavings =
    savings.length > 0
      ? savings.reduce((a, b) => a + b, 0) / savings.length
      : 0;

  const priceChanges = product
    .map((p) => calculatePriceChange(p))
    .filter((change) => change > 0);

  const bestDrop =
    priceChanges.length > 0 ? Math.abs(Math.min(...priceChanges)) : 0;

  return {
    avgSavings: Math.round(avgSavings),
    bestDrop: Number(bestDrop.toFixed(2)),
    tottalTracking: product.length,
  };
};

export const getTrendColor = (change: number): string => {
  if (change < 0) return "text-success bg-success/20";
  if (change > 0) return "text-destructive  bg-destructive /20";

  return "text-foreground/60 bg-foreground/10";
};

export const getTrendIcon = (change: number): "down" | "up" | "neutral" => {
  if (change < 0) return "down";
  if (change > 0) return "up";
  return "neutral";
};

export const calculatePriceStats = (priceHistory: any[]) => {
  if (!priceHistory || priceHistory.length === 0) {
    return {
      lowest: 0,
      highest: 0,
      average: 0,
    };
  }

  const prices = priceHistory.map((h) => Number(h.price));

  return {
    lowest: Math.min(...prices),
    highest: Math.max(...prices),
    average: prices.reduce((a, b) => a + b, 0) / prices.length,
  };
};
