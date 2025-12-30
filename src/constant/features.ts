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
    title: "Fast Price Tracking",
    desc: "Price Sevak tracks product prices quickly, even on dynamic and JavaScript-heavy e-commerce sites.",
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
];
