import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Product } from "../types/productTypes";
import { useToast } from "../store/useToast";
import { deleteProduct } from "../services/products";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const addToast = useToast((s) => s.addToast);

  return useMutation({
    mutationFn: deleteProduct,

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });
      const previous = queryClient.getQueryData<Product[]>(["products"]);

      queryClient.setQueryData<Product[]>(["products"], (old) =>
        old?.filter((p) => p.id !== id),
      );

      return { previous };
    },

    onSuccess: () => {
      addToast({
        title: "Product removed",
        description: "Product removed from tracking successfully",
        type: "success",
      });
    },

    onError: (_err, _id, context) => {
      queryClient.setQueryData(["products"], context?.previous);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
