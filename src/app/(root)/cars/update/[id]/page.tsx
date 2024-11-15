"use client";
import { CURRENCIES } from "@/app/constants/currencies";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import Loader from "@/components/ui/elements/loader";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next-nprogress-bar";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const UpdatePage = () => {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  const carSchema = z.object({
    model: z
      .string()
      .trim()
      .min(3, { message: "Title must be at least 3 characters long." }),
    company: z
      .string()
      .trim()
      .min(3, { message: "Title must be at least 3 characters long." }),
    dealer: z
      .string()
      .trim()
      .min(3, { message: "Title must be at least 3 characters long." }),
    dealerAddress: z
      .string()
      .trim()
      .min(5, { message: "Title must be at least 5 characters long." }),
    year: z.date({ required_error: "manufacturing year is required field." }),
    transmission: z.enum(["manual", "automatic"], {
      required_error: "transmission must be either manual or automatic",
    }),
    price: z
      .string({ required_error: "price is required" })
      .trim()
      .min(1, { message: "price is required" }),
    currency: z
      .string()
      .trim()
      .min(3, { message: "Title must be at least 3 characters long." }),
    description: z
      .string()
      .trim()
      .min(5, { message: "Description must be at least 5 characters long." }),
    tags: z
      .string({ required_error: "tags must be string" })
      .optional()
      .default(""),
    images: z
      .array(z.instanceof(File))
      .optional()
      .refine((files) => files && files.length <= 10, {
        message: "You can upload up to 10 images only.",
      })
      .refine(
        (files) =>
          files && files.every((file) => file.type.startsWith("image/")),
        {
          message: "Only image files are allowed.",
        }
      ),
  });

  const {
    data: carData,
    isError,
    isLoading: isCarDataPending,
  } = useQuery({
    queryKey: ["car-data", id],
    queryFn: async () => {
      const response = await customFetch<any>(`/cars/${id}`);
      const data = response?.data;
      if (!data) {
        throw new Error("no data found");
      }

      return data;
    },
  });

  const { mutate: updateCar, isLoading: isUpdateCarPending } = useMutation({
    mutationKey: ["update-car", id],
    mutationFn: async (formData: FormData) => {
      const response = await customFetch<any>(`/cars/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = response?.data;
      if (!data) {
        throw new Error("no data found");
      }
      return data;
    },
    onSuccess: (data) => {
      form.reset({
        ...data,
        year: new Date(data?.year),
        tags: data?.tags.join(","),
        price: data?.price?.toString(),
      });
      toast.success("successfully updated car");
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
    values?.images?.forEach((image) => formData.append("images", image));

    updateCar(formData);
  };

  const form = useForm<z.infer<typeof carSchema>>({
    resolver: zodResolver(carSchema),
    defaultValues: { ...carData },
  });

  useEffect(() => {
    if (carData) {
      form.reset({
        ...carData,
        year: new Date(carData?.year),
        tags: carData?.tags.join(","),
        price: carData?.price?.toString(),
      });
    }
  }, [carData, form]);

  if (isError) {
    router.push("/cars");
    return;
  }

  if (isCarDataPending) {
    return <Loader />;
  }

  return (
    <main className="px-6 mt-20">
      <h1 className="my-6 text-2xl font-bold">Update Your Car Information.</h1>
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
                      <SelectItem key={idx} value={currency.value} className="capitalize">
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
            disabled={isUpdateCarPending}
            isLoading={isUpdateCarPending}
            className="w-full mt-12 mb-6"
          >
            Update A Car
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default UpdatePage;
