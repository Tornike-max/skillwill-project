import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFinancialGoal } from "../api/api";
import toast from "react-hot-toast";
import { useAuth } from "../context/useAuth";

export function useUpdateGoal() {
  const queryClient = useQueryClient();
  const { authTokens } = useAuth();
  const token = authTokens?.access;
  const { mutate: update, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, saved }) => updateFinancialGoal(id, saved, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      toast.success("Goal updated Successfully");
    },
    onError: () => {
      toast.error("Error while updating");
    },
  });

  return { update, isUpdating };
}
