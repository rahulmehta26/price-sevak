import React from 'react'
import { cn } from '../../utils/cn'
import Text from './Text'
import Bell from '../icons/Bell';
import TrendDown from '../icons/TrendDown';
import TrendUp from '../icons/TrendUp';
import Refresh from '../icons/Refresh';
import Check from '../icons/Check';

type ActivityType = "price_drop" | "price_rise" | "alert_triggered" | "check" | "alert_set";

const getActivityIcon = (type: ActivityType) => {
    switch (type) {
        case "price_drop":
            return { icon: TrendDown, color: "text-success bg-success/10" };
        case "price_rise":
            return { icon: TrendUp, color: "text-destructive bg-destructive/10" };
        case "alert_triggered":
            return { icon: Bell, color: "text-gold bg-gold/10" };
        case "check":
            return { icon: Refresh, color: "text-muted-foreground bg-muted" };
        case "alert_set":
            return { icon: Check, color: "text-secondary bg-secondary/10" };
    }
};

const ActivityTimeline = ({ className }: { className?: string }) => {
    return (
        <section
            className={cn(
                " p-2 md:p-4 py-4 w-[18rem] md:w-[28rem]",
                "bg-foreground/10 backdrop-blur-2xl rounded-sm ",
                className
            )}
        >
            <div
                className={cn(
                    "flex items-center justify-between"
                )}
            >

                <div
                    className={cn("flex items-center gap-3")}
                >

                    <div className={cn(
                        "w-3 h-3 rounded-full bg-success",
                        "animate-pulse ease-in-out duration-150"
                    )} />

                    <Text
                        as='span'
                        variant='body'
                        className={cn("font-mono text-sm font-extralight text-foreground tracking-wider")}
                    >
                        Activity Log
                    </Text>

                </div>

                <Text
                    as='span'
                    variant='tags'
                    className={cn("font-mono font-light text-foreground")}
                >
                    5 events
                </Text>
            </div>

            <div className={cn("border-b-2 border-foreground/20 my-4")} />

            <div
                className='space-y-4'
            >
                <div
                    className={cn("flex justify-between items-center")}
                >

                    <div
                        className={cn("flex justify-start items-center gap-2")}
                    >

                        <div
                            className={cn(
                                "w-10 h-10",
                                "bg-success/10 rounded-sm",
                                "flex justify-center items-center"
                            )}
                        >
                            {/* <Icon /> */}
                        </div>
                        <div>
                            <Text as='span' variant='body' className={cn("text-foreground font-normal text-xs md:text-sm font-mono")} >
                                Sony WH-1000XMS <Text as='span' variant='tags' className={cn("text-success text-xs md:text-sm ")} >-16.17%</Text>
                            </Text>

                            <Text
                                as='p'
                                variant='para'
                                className={cn("font-mono font-normal text-foreground/60 text-[10px] md:text-xs")}
                            >
                                Price dropped by ₹5,000
                            </Text>
                        </div>
                    </div>

                    <Text
                        as='span'
                        variant='body'
                        className={cn("font-mono text-[10px] md:text-xs text-foreground/50")}
                    >
                        2m ago
                    </Text>

                </div>

                <div
                    className={cn("flex justify-between items-center")}
                >

                    <div
                        className={cn("flex justify-start items-center gap-2")}
                    >
                        <div
                            className={cn(
                                "w-10 h-10",
                                "bg-success/10 rounded-sm",
                                "flex justify-center items-center"
                            )}
                        >
                            {/* <Icon /> */}
                        </div>

                        <div>
                            <Text as='span' variant='body' className={cn("text-foreground font-normal text-xs md:text-sm font-mono")} >
                                All Product
                            </Text>

                            <Text
                                as='p'
                                variant='para'
                                className={cn("font-mono font-normal text-foreground/60 text-[10px] md:text-xs")}
                            >
                                Price check completed
                            </Text>
                        </div>

                    </div>

                    <Text
                        as='span'
                        variant='body'
                        className={cn("font-mono text-[10px] md:text-xs text-foreground/50")}
                    >
                        20m ago
                    </Text>

                </div>

            </div>


        </section>
    )
}

export default ActivityTimeline