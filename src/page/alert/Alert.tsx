import { useMemo, useState } from 'react'
import { cn } from '../../utils/cn'
import AlertHeader from './AlertHeader'
import AlertCard from './AlertCard'
import { useAlert } from '../../hooks/useAlert'
import EmptyState from '../../components/ui/EmptyState'
import Loader from '../../components/ui/Loader'
import PageHeader from '../../components/ui/PageHeader'

const Alert = () => {

    const { data: alerts = [], isLoading } = useAlert();

    const [filter, setFilter] = useState<string>("all");

    const filteredAlerts = useMemo(() => {
        if (filter === "active") return alerts.filter(a => a.is_active);
        if (filter === "paused") return alerts.filter(a => !a.is_active);
        return alerts;
    }, [alerts, filter]);

    return (
        <section
            className={cn("page-container")}
        >
            <PageHeader
                title='Alerts'
                subTitle='Get notified when prices hit your target.'
            />

            <AlertHeader
                alerts={alerts}
                filter={filter}
                onFilterChange={setFilter}
            />

            {isLoading ? (
                <div className={cn("flex items-center justify-center py-12")}>
                    <Loader text=' Loading alerts...' />
                </div>
            ) : alerts.length === 0 ? (
                <EmptyState
                    title='No products tracked yet'
                    description='Add products to start tracking prices and set up alerts'
                    showButton={true}
                />
            ) : (
                <div className={cn(
                    "pt-6",
                    "grid gap-6 md:grid-cols-2 lg:grid-cols-2"
                )}>
                    {filteredAlerts.length > 0 ? (
                        filteredAlerts.map((alert) => (
                            <AlertCard key={alert.id} alert={alert} />
                        ))
                    ) : (
                        <div className="col-span-full flex justify-center">
                            <EmptyState
                                title="No alerts found"
                                description="Try adjusting your filters"
                            />
                        </div>
                    )}
                </div>
            )}

        </section>
    )
}

export default Alert