import { cn } from "../../utils/cn";
import Text from "../../components/ui/Text";
import { useQuery } from "@tanstack/react-query";
import { getGroupedActivities } from "../../services/activities";
import EmptyState from "../../components/ui/EmptyState";
import Loader from "../../components/ui/Loader";
import PageHeader from "../../components/ui/PageHeader";
import ActivityItem from "../../components/ui/activity/ActivityItem";
import AnimatedItem from "../../components/ui/AnimatedItem";

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const dateStr = date.toDateString();
    const todayStr = today.toDateString();
    const yesterdayStr = yesterday.toDateString();

    if (dateStr === todayStr) return "Today";
    if (dateStr === yesterdayStr) return "Yesterday";

    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

const formatTime = (dateString: string): string => {
    return new Date(dateString).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
    });
};

const Activity = () => {
    const { data: groupedActivities = [], isLoading } = useQuery({
        queryKey: ["activities-grouped"],
        queryFn: getGroupedActivities,
    });

    if (isLoading) {
        return (
            <div
                className={cn("flex items-center justify-center h-screen")}
            >
                <Loader text="Loading activities..." />
            </div>
        );
    }

    return (
        <section className={cn("page-container")}>

            <PageHeader
                title="Activity"
                subTitle="Your complete price tracking history."
            />

            {groupedActivities.length === 0 ? (

                <EmptyState
                    title="No activities yet"
                    description="Start tracking products to see your activity history"
                    showButton={true}
                />
            ) : (
                <>
                    {groupedActivities.map((group, groupIndex) => (
                        <AnimatedItem as="div" key={group.date}>
                            <Text
                                as="span"
                                variant="tags"
                                className={cn("text-foreground text-xs md:text-base font-mono")}
                            >
                                {formatDate(group.date)}
                            </Text>

                            <div className={cn("flex justify-center mt-6")}>
                                <section
                                    className={cn(
                                        "p-2 md:p-4 py-4 w-full md:w-[50rem]",
                                        "bg-foreground/10 backdrop-blur-2xl rounded-sm",
                                    )}
                                >
                                    <div className="space-y-4">
                                        {group.activities.map((activity) => (
                                            <ActivityItem
                                                key={activity?.id}
                                                time={formatTime(activity?.created_at)}
                                                activity={activity} />
                                        ))}
                                    </div>
                                </section>
                            </div>

                            {groupIndex < groupedActivities.length - 1 && (
                                <div className="border-b-4 border-foreground border-dashed my-12" />
                            )}
                        </AnimatedItem>
                    ))}
                </>
            )}
        </section>
    );
};

export default Activity;
