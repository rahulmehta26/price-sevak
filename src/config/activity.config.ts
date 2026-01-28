import Bell from "../components/icons/Bell";
import Check from "../components/icons/Check";
import Refresh from "../components/icons/Refresh";
import TrendDown from "../components/icons/TrendDown";
import TrendUp from "../components/icons/TrendUp";

export type ActivityType =
  | "price_drop"
  | "price_rise"
  | "alert_triggered"
  | "check"
  | "alert_set";

export const ACTIVITY_META: Record<
  ActivityType,
  {
    icon: React.ElementType;
    color: string;
  }
> = {
  price_drop: {
    icon: TrendDown,
    color: "text-success bg-success/10",
  },
  price_rise: {
    icon: TrendUp,
    color: "text-destructive bg-destructive/10",
  },
  alert_triggered: {
    icon: Bell,
    color: "text-gold bg-gold/10",
  },
  check: {
    icon: Refresh,
    color: "text-foreground/80 bg-foreground/10",
  },
  alert_set: {
    icon: Check,
    color: "text-secondary bg-secondary/10",
  },
};
