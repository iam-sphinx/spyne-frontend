"use client";

import { Button } from "@/components/ui/button";
import CarInfoCard from "@/components/ui/elements/carInfoCard";
import Loader from "@/components/ui/elements/loader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import customFetch from "@/lib/customFetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const Products = () => {
  const params = useSearchParams();
  const page = params.get("page");

  const formSchema = z.object({
    query: z.string().trim().min(1, { message: "search query is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["fetch-cars"],
    queryFn: async () => {
      const response = await customFetch<any>(`/user/cars?page=${page}`);
      const { data } = response;
      return data;
    },
  });

  const {
    mutate: searhKeword,
    isLoading: isSearchKeywordLoading,
    data: searchedData,
  } = useMutation({
    mutationKey: ["keyword-search"],
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const response = await customFetch<any>(
        `/cars/query/search?q=${values.query}`
      );
      const data = response?.data;
      if (!data || data.length == 0) {
        throw new Error("no data found");
      }
      return data;
    },
    onSuccess: (data) => {
      toast.success("query success");
    },
    onError: (err: any) => {
      toast.error(err?.message || "something went wrong");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    searhKeword(values);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <main className="mt-20 px-6 flex items-center justify-center">
        <span className="text-2xl font-bold">No Car Found Create One.</span>
      </main>
    );
  }

  return (
    <main className="mt-20 px-6">
      <h1 className="text-3xl font-bold my-6">Your Listed Cars.</h1>

      <div className="max-w-lg w-full rounded-full p-2 ml-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="query"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex h-12  items-center space-y-0 bg-white border rounded-full p-1">
                  <FormControl>
                    <Input
                      className="outline-none border-none shadow-none h-full truncate"
                      placeholder="search..."
                      {...field}
                    />
                  </FormControl>

                  <Button
                    isLoading={isSearchKeywordLoading}
                    disabled={isSearchKeywordLoading}
                    type="submit"
                    className="p-3 rounded-full size-fit"
                  >
                    <Search />
                  </Button>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {searchedData && Array.isArray(searchedData)
          ? searchedData.map((result, idx) => (
              <CarInfoCard key={idx} {...result} />
            ))
          : data && Array.isArray(data)
          ? data.map((result, key) => <CarInfoCard {...result} />)
          : null}
      </div>
    </main>
  );
};

export default Products;
