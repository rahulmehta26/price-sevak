import type { ElementType } from "react";
import Bell from "../components/icons/Bell";
import Lightning from "../components/icons/Lightning";
import Shield from "../components/icons/Shield";

export interface FeatureProps {
  id: number;
  title: string;
  desc: string;
  icon: ElementType;
}

export const FEATURES: FeatureProps[] = [
  {
    id: 1,
    title: "Track Price Drops",
    desc: "Monitor prices across multiple products and get notified when they drop to your target.",
    icon: Lightning,
  },
  {
    id: 2,
    title: "Reliable Monitoring",
    desc: "Built to work across major e-commerce platforms with stable and consistent price checks.",
    icon: Shield,
  },
  {
    id: 3,
    title: "Smart Alerts",
    desc: "Get instant alerts when the price drops below your desired value — no manual checking needed.",
    icon: Bell,
  },
  {
    id: 4,
    title: "Price History",
    desc: "View detailed price history charts to make informed purchasing decisions.",
    icon: Bell,
  },

  {
    id: 5,
    title: "Real-time Updates",
    desc: "Prices are checked multiple times daily to ensure you have the latest data.",
    icon: Bell,
  },
  {
    id: 6,
    title: "Deal Score",
    desc: "Our algorithm rates each deal from 0-100 so you know when to buy.",
    icon: Bell,
  },
];
