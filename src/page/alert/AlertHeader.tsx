import React, { useMemo } from 'react'
import { cn } from '../../utils/cn'
import Filter from '../../components/ui/Filter'
import type { SelectOption } from '../../components/ui/Select'
import Bell from '../../components/icons/Bell'
import Text from '../../components/ui/Text'
import type { Alert } from '../../types/productTypes'
import AnimatedItem from '../../components/ui/AnimatedItem'

const filterOptions: SelectOption[] = [
    { label: "All Alerts", value: "all" },
    { label: "Active only", value: "active" },
    { label: "Paused only", value: "paused" },
]

interface AlertHeaderProps {
    alerts: Alert[];
    filter: string;
    onFilterChange: (value: string) => void;
}

const AlertHeader: React.FC<AlertHeaderProps> = ({ alerts, filter, onFilterChange }) => {

    const alertStats = useMemo(() => ({
        active: alerts.filter(a => a.is_active).length,
        paused: alerts.filter(a => !a.is_active).length,
    }), [alerts])

    return (
        <AnimatedItem
            as='section'
            className={cn(
                "w-full p-4",
                "border shadow hover:shadow-sm rounded-sm",
                "flex justify-between items-center flex-wrap gap-4 ",
            )}
        >

            <div
                className={cn(
                    "flex justify-start items-center gap-4"
                )}
            >
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-md bg-success/10 flex items-center justify-center">
                        <Bell className="w-5 h-5 text-success" />
                    </div>
                    <div>
                        <Text as='p' variant='para' className={cn("text-xl text-foreground font-bold font-mono")} >{alertStats?.active}</Text>
                        <Text as='p' variant='tags' className={cn("text-xs text-foreground/80")}>Active</Text>
                    </div>
                </div>

                <div className="w-px h-10 bg-foreground/50" />

                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-md bg-foreground/10 flex items-center justify-center">
                        <Bell className="w-5 h-5 text-foreground/60" />
                    </div>
                    <div>
                        <Text as='p' variant='para' className={cn("text-xl text-foreground font-bold font-mono")} >{alertStats?.paused}</Text>
                        <Text as='p' variant='tags' className={cn("text-xs text-foreground/80")}>Paused</Text>
                    </div>
                </div>
            </div>

            <Filter
                value={filter}
                onChange={onFilterChange}
                options={filterOptions}
            />

        </AnimatedItem>
    )
}

export default AlertHeader