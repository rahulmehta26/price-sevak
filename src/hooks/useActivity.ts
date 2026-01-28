import { useQuery } from "@tanstack/react-query";
import { getActivities } from "../services/activities";
import { useAuthState } from "../store/useAuthStore";

export const useActivity = () => {
  const user = useAuthState((s) => s.user);

  return useQuery({
    queryKey: ["activities", user?.id],
    queryFn: () => getActivities(10, 0),
    enabled: !!user?.id,
  });
};
