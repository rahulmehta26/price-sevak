import { useQuery } from "@tanstack/react-query"
import { getAlerts } from "../services/alerts"
import { useAuthState } from "../store/useAuthStore";

export const useAlert = () => {

    const user = useAuthState((s) => s.user);

    return useQuery({
        queryKey: ['alerts', user?.id],
        queryFn: getAlerts,
        enabled: !!user,
    });
}