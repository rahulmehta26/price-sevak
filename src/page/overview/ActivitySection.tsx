import { cn } from '../../utils/cn'
import Text from '../../components/ui/Text'
import HoverSlideButton from '../../components/ui/HoverSlideButton'
import ActivityTimeline from './ActivityTimeline'
import AnimatedItem from '../../components/ui/AnimatedItem'

const ActivitySection = ({ handleActivityNavigation }: { handleActivityNavigation: () => void }) => {

    return (
        <section
            className={cn("space-y-4")}
        >
            <AnimatedItem
                as='div'
                className={cn("flex justify-between items-center")}
            >
                <Text
                    as="h4"
                    variant="subHeading"
                    className={cn("text-foreground text-md md:text-lg")}
                >
                    Activity
                </Text>

                <HoverSlideButton onClick={handleActivityNavigation} />
            </AnimatedItem>

            <ActivityTimeline />
        </section>
    )
}

export default ActivitySection