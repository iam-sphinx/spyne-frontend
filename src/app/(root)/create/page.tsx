"use client";

import { CURRENCIES } from "@/app/constants/currencies";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import customFetch from "@/lib/customFetch";
import { carSchema } from "@/schemas/carSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next-nprogress-bar";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const Create = () => {
  const form = useForm<z.infer<typeof carSchema>>({
    resolver: zodResolver(carSchema),
  });
  const router = useRouter();

  const { mutate: createCar, isLoading: isCreateCarLoading } = useMutation({
    mutationKey: ["create-car"],
    mutationFn: async (formData: FormData) => {
      const response = await customFetch<any>("/cars/create", {
        method: "POST",
        body: formData,
      });

      const data = response?.data;
      return data;
    },
    onSuccess: (data) => {
      toast.success("successfully added car");
      router.push(`/cars/view/${data?._id}`);
    },
    onError: (err: any) => {
      toast.error(err?.message || "something went wrong");
    },
  });

  const onSubmit = (values: z.infer<typeof carSchema>) => {
    const formData = new FormData();

    formData.append("company", values.company);
    formData.append("currency", values.currency);
    formData.append("dealer", values.dealer);
    formData.append("dealerAddress", values.dealerAddress);
    formData.append("description", values.description);
    formData.append("model", values.model);
    formData.append("price", values.price);
    formData.append("tags", values.tags);
    formData.append("transmission", values.transmission);
    formData.append("year", JSON.stringify(values.year.toString()));
    values.images.forEach((image) => formData.append("images", image));

    createCar(formData);
  };

  return (
    <main className="px-6 mt-20">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-2xl w-full"
        >
          <FormField
            control={form.control}
            name="images"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel>Images</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input
                    {...fieldProps}
                    placeholder="Pictures"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(event) => {
                      const files = event.target.files
                        ? Array.from(event.target.files)
                        : [];
                      onChange(files);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="model"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mt-6">
                <div className="flex justify-between items-center">
                  <FormLabel>Model</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input placeholder="enter car's model" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="company"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mt-6">
                <div className="flex justify-between items-center">
                  <FormLabel>Company</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input placeholder="enter car's company" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="currency"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mt-6">
                <div className="flex justify-between items-center">
                  <FormLabel>Currency</FormLabel>
                  <FormMessage />
                </div>
                <FormMessage />
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a currency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CURRENCIES.map((currency, idx) => (
                      <SelectItem value={currency.value} className="capitalize">
                        {currency.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            name="dealer"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mt-6">
                <div className="flex justify-between items-center">
                  <FormLabel>Dealer</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input placeholder="enter car's dealer" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="dealerAddress"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mt-6">
                <div className="flex justify-between items-center">
                  <FormLabel>Dealer's Address</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input placeholder="enter dealer's address" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mt-6">
                <div className="flex justify-between items-center">
                  <FormLabel>Description</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Textarea
                    placeholder="enter car's description"
                    {...field}
                    rows={5}
                    className="resize-none"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="price"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mt-6">
                <div className="flex justify-between items-center">
                  <FormLabel>Price</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input placeholder="enter car's price" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="tags"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mt-6">
                <div className="flex justify-between items-center">
                  <FormLabel>Tags</FormLabel>
                  <FormMessage />
                </div>
                <FormDescription>Separate tags with ,</FormDescription>
                <FormControl>
                  <Input placeholder="enter car's tags" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="transmission"
            render={({ field }) => (
              <FormItem className="mt-6">
                <div className="flex justify-between items-center">
                  <FormLabel>Transmission</FormLabel>
                  <FormMessage />
                </div>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a transmission type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="manual" className="capitalize">
                      manual
                    </SelectItem>
                    <SelectItem value="automatic" className="capitalize">
                      automatic
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            name="year"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mt-6">
                <div className="flex justify-between items-center">
                  <FormLabel>Date of Manufacture</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            disabled={isCreateCarLoading}
            isLoading={isCreateCarLoading}
            className="w-full mt-12 mb-6"
          >
            Create A Car
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default Create;
