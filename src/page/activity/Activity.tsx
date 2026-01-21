import React from 'react'
import { cn } from '../../utils/cn'
import Text from '../../components/ui/Text'
import ActivityTimeline from '../../components/ui/ActivityTimeline'

const Activity = () => {
    return (
        <section
            className={cn("page-container")}
        >

            <div>

                <Text
                    as="h4"
                    variant="heading"
                    className={cn("text-foreground font-semibold")}
                >
                    Activity
                </Text>

                <Text
                    as="span"
                    variant="tags"
                    className={cn("text-foreground/60 text-xs md:text-base font-light")}
                >
                    Your complete price tracking history.
                </Text>
            </div>

            <Text
                as="span"
                variant="tags"
                className={cn("text-foreground text-xs md:text-base font-mono")}
            >
                Today
            </Text>

            <div
                className={cn("flex justify-center mt-6 ")}
            >

                <ActivityTimeline className={cn("w-[50rem]")} />

            </div>

            <div className=" border-b-4 border-foreground border-dashed my-12 " />


            <Text
                as="span"
                variant="tags"
                className={cn("text-foreground text-xs md:text-base font-mono")}
            >
                Yesterday
            </Text>

            <div
                className={cn("flex justify-center mt-6 ")}
            >

                <ActivityTimeline className={cn("w-[50rem]")} />

            </div>


            <div className=" border-b-4 border-foreground border-dashed my-12 " />

            {/* This will be mapped as per the data */}

        </section>
    )
}

export default Activity