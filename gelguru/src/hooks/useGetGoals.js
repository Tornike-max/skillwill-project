import { useQuery } from "@tanstack/react-query";
import { getGoals } from "../api/api";
import { useAuth } from "../context/useAuth";

export function useGetGoals(userId) {
  console.log(userId);
  const { authTokens } = useAuth();
  console.log(authTokens);
  const token = authTokens?.access;
  const { data: goals, isPending: isGoalsPending } = useQuery({
    queryKey: ["goals"],
    queryFn: () => getGoals(token, userId),
  });

  return { goals, isGoalsPending };
}
