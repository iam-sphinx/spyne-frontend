"use client";

import customFetch from "@/lib/customFetch";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next-nprogress-bar";
import { toast } from "sonner";

const useDeleteCar = () => {
  const router = useRouter();

  const { mutate: deleteCar, isLoading: isDeleteCarPending } = useMutation({
    mutationKey: ["delete-car"],
    mutationFn: async ({ id }: { id: string }) => {
      await customFetch(`/cars/${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      toast.success("successfully deleted car.");
      router.push('/cars');
    },
    onError: (err: any) => {
      toast.error(err.message || "something went wrong");
    },
  });

  return { deleteCar, isDeleteCarPending };
};

export default useDeleteCar;
