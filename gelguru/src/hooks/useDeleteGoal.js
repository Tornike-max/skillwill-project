import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGoal as deleteGoalApi } from "../api/api";
import toast from "react-hot-toast";
import { useAuth } from "../context/useAuth";

export function useDeleteGoal() {
  const queryClient = useQueryClient();

  const { authTokens } = useAuth();
  const token = authTokens.access;

  const { mutate: deleteGoal, isPending: isGoalDeleting } = useMutation({
    mutationFn: (id) => deleteGoalApi(token, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      toast.success("You Successfully delete your goal");
    },
    onError: () => {
      toast.error("Error while deleting goal");
    },
  });

  return { deleteGoal, isGoalDeleting };
}
