import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/api";

export function useUser() {
  const token = localStorage.getItem("authToken");
  console.log(token);
  const { data, isPending: isUserPending } = useQuery({
    queryKey: ["user", token],
    queryFn: () => getCurrentUser(token),
  });

  console.log(data);
  return { data, isUserPending };
}
