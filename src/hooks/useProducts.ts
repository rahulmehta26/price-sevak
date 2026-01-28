import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/products";
import { useAuthState } from "../store/useAuthStore";

export const useProducts = () => {
  const user = useAuthState((s) => s.user);

  return useQuery({
    queryKey: ["products", user?.id],
    queryFn: getProducts,
    enabled: !!user,
  });
};
