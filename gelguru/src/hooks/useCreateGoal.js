import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGoal } from "../api/api";
import toast from "react-hot-toast";
import { useAuth } from "../context/useAuth";

export function useCreateGoal() {
  const queryClient = useQueryClient();

  const { authTokens } = useAuth();
  const token = authTokens.access;

  const { mutate: saveGoal, isPending: isGoalSaving } = useMutation({
    mutationFn: (goalData) => createGoal(token, goalData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      toast.success("You Successfully saved your goal");
    },
    onError: () => {
      toast.error("Error while saving goal");
    },
  });

  return { saveGoal, isGoalSaving };
}
