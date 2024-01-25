import { useMutation, useQueryClient } from "@tanstack/react-query";
import { expenceEntry } from "../api/api";
import { useAuth } from "../context/useAuth";
import toast from "react-hot-toast";

export function useExpenceEntry() {
  const queryClient = useQueryClient();
  const { authTokens } = useAuth();
  const token = authTokens.access;

  const { mutate, isPending } = useMutation({
    mutationFn: (expenceData) => expenceEntry({ expenceData, token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expencesData"] });
      toast.success("You successfully save your expence");
    },
    onError: () => {
      toast.error("error while Saving expence");
    },
  });

  return { mutate, isPending };
}
