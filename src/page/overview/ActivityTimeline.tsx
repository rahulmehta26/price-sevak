import { cn } from "../../utils/cn";
import Text from "../../components/ui/Text";
import { useActivity } from "../../hooks/useActivity";
import type { Activity } from "../../types/productTypes";
import EmptyState from "../../components/ui/EmptyState";
import Loader from "../../components/ui/Loader";
import ActivityItem from "../../components/ui/activity/ActivityItem";
import AnimatedItem from "../../components/ui/AnimatedItem";

const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;

    return `${diffDays}d ago`;
};

const ActivityTimeline = ({ className }: { className?: string }) => {
    const { data: activities = [], isLoading } = useActivity();
    return (
        <AnimatedItem
            as="section"
            className={cn(
                " p-3 md:p-4 py-4 w-full",
                "bg-foreground/10 backdrop-blur-2xl rounded-sm ",
                className,
            )}
        >
            <div className={cn("flex items-center justify-between")}>
                <div className={cn("flex items-center gap-3")}>
                    <div
                        className={cn(
                            "w-2 h-2 md:w-3 md:h-3 rounded-full bg-success",
                            "animate-pulse ease-in-out duration-150",
                        )}
                    />

                    <Text
                        as="span"
                        variant="body"
                        className={cn(
                            "font-mono text-xs md:text-sm font-extralight text-foreground tracking-wider",
                        )}
                    >
                        Activity Log
                    </Text>
                </div>

                <Text
                    as="span"
                    variant="tags"
                    className={cn(
                        "font-mono font-light text-foreground",
                        "text-xs md:text-sm"
                    )}
                >
                    {activities?.length} {activities?.length === 1 ? "event" : "events"}
                </Text>
            </div>

            <div className={cn("border-b-2 border-foreground/20 my-4")} />

            {isLoading ? (
                <div className={cn("flex mt-16 mb-4 items-center justify-center")}>
                    <Loader size={40} text="Loading activities..." />
                </div>
            ) : activities.length === 0 ? (

                <EmptyState
                    description="No activities yet. Add products to start tracking!"
                />
            ) : (
                <div className={cn("space-y-4")}>
                    {activities.map((activity: Activity) => (
                        <ActivityItem
                            key={activity.id}
                            activity={activity}
                            time={formatTimeAgo(activity.created_at)}
                        />
                    ))}
                </div>
            )}
        </AnimatedItem>
    );
};

export default ActivityTimeline;
