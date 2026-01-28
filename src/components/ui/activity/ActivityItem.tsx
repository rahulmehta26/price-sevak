import { ACTIVITY_META, type ActivityType } from "../../../config/activity.config";
import type { Activity } from "../../../types/productTypes"
import { cn } from "../../../utils/cn"
import Text from "../Text"

interface ActivityItemProps {
    activity: Activity;
    time: string
}

const ActivityItem = ({ activity, time }: ActivityItemProps) => {

    const { icon: Icon, color } = ACTIVITY_META[activity.type as ActivityType]

    return (
        <div
            className={cn("flex justify-between items-center")}
        >
            <div
                className={cn(
                    "flex justify-start items-center gap-2 md:gap-4 ",
                )}
            >
                <div
                    className={cn(
                        "w-7 h-7 md:w-10 md:h-10 rounded-sm shrink-0",
                        "flex justify-center items-center",
                        color,
                    )}
                >
                    <Icon className={cn("w-3.5 h-3.5 md:w-5 md:h-5")} />
                </div>

                <div
                    className={("space-y-2")}
                >
                    <Text
                        as="span"
                        variant="body"
                        className={cn(
                            "line-clamp-1 md:line-clamp-0",
                            "text-foreground font-normal tracking-normal md:tracking-wide text-xs md:text-sm font-mono",
                        )}
                    >
                        {activity.product_name || "Unknown Product"}
                        {activity.change_percentage && (
                            <Text
                                as="span"
                                variant="tags"
                                className={cn(
                                    "ml-2 text-xs md:text-sm",
                                    activity.change_percentage < 0
                                        ? "text-success"
                                        : "text-destructive",
                                )}
                            >
                                {activity.change_percentage < 0 ? "" : "+"}
                                {activity.change_percentage}%
                            </Text>
                        )}
                    </Text>

                    <Text
                        as="p"
                        variant="para"
                        className={cn(
                            "font-mono font-normal text-foreground/60 text-[10px] md:text-xs",
                        )}
                    >
                        {activity.description}
                    </Text>
                </div>
            </div>

            <Text
                as="span"
                variant="body"
                className={cn(
                    "shrink-0",
                    "font-mono text-[10px] md:text-xs text-foreground/50",
                )}
            >
                {time}
            </Text>
        </div>
    )
}

export default ActivityItem