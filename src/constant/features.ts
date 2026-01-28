import type React from "react";
import Bell from "../components/icons/Bell";
import TrendDown from "../components/icons/TrendDown";
import Toggle from "../components/icons/Toggle";
import Chart from "../components/icons/Chart";
import Monitar from "../components/icons/Monitar";
import Dashboard from "../components/icons/Dashboard";

export interface FeatureProps {
  id: number;
  title: string;
  desc: string;
  icon: React.ElementType;
}

export const FEATURES: FeatureProps[] = [
  {
    id: 1,
    title: "Automatic Price Tracking",
    desc: "Add any product URL and we'll track its price automatically. Works with Amazon, Flipkart, Myntra, and more.",
    icon: TrendDown,
  },
  {
    id: 2,
    title: "Email Alerts",
    desc: "Get instant email notifications when prices drop below your target. Never miss a deal again.",
    icon: Bell,
  },
  {
    id: 3,
    title: "Price History Charts",
    desc: "Visual charts show price trends over time with lowest, highest, and average prices at a glance.",
    icon: Chart,
  },
  {
    id: 4,
    title: "Daily Monitoring",
    desc: "All tracked products are automatically checked every 24 hours for the latest prices.",
    icon: Monitar,
  },
  {
    id: 5,
    title: "Activity Dashboard",
    desc: "See all price changes, alerts triggered, and tracking history in one organized timeline.",
    icon: Dashboard,
  },
  {
    id: 6,
    title: "Toggle Control",
    desc: "Enable or disable alerts for any product with a simple toggle. Full control over notifications.",
    icon: Toggle,
  },
];
