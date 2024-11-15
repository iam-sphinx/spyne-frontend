"use client";
import useDeleteCar from "@/app/hooks/useDeleteCar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CarCarousel from "@/components/ui/elements/carCarousel";
import Loader from "@/components/ui/elements/loader";
import customFetch from "@/lib/customFetch";
import { formatCurrency } from "@/lib/formatCurrency";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next-nprogress-bar";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";

const ViewPage = () => {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const { deleteCar, isDeleteCarPending } = useDeleteCar();

  const {
    data: carData,
    isLoading: isCarDataPending,
    isError,
  } = useQuery({
    queryKey: ["car-data"],
    queryFn: async () => {
      const response = await customFetch<any>(`/cars/${id}`);
      const { data } = response;
      if (!data) {
        throw new Error("no data found");
      }
      return data;
    },
  });

  if (isError) {
    router.push("/cars");
    return;
  }
  if (isCarDataPending) {
    return <Loader />;
  }
  const year = new Date(carData?.year).getFullYear();
  const href = `/cars/update/${id}`;

  return (
    <main className="mt-16 p-6">
      <h1 className="mb-6 text-2xl font-bold">View your car.</h1>

      <section className="flex gap-6">
        <div className="flex-[0.6]">
          <div className="p-6 rounded-md bg-primary/10 shadow-md px-20 h-96 max-w-3xl w-full">
            <CarCarousel images={carData?.images || []} />
          </div>
          <Card className="w-auto mt-6">
            <CardHeader>
              <CardTitle>Dealer Info.</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col">
              <span>Dealer Name : {carData?.dealer}</span>
              <span>Dealer Address : {carData?.dealerAddress}</span>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-[0.4] flex-col">
          <h1 className="text-3xl mb-6 font-medium tracking-wide mt-6 text-accent-foreground">
            {year} {carData?.model}
          </h1>

          <span className="text-gray-500 text-xl">
            Price : {formatCurrency(carData?.price, carData?.currency)}
          </span>

          <div className="my-6">
            Tags :{" "}
            {carData?.tags?.map((tag: string, idx: number) => (
              <Badge
                className="bg-muted-foreground hover:bg-muted-foreground/80 cursor-pointer mx-3"
                key={idx}
              >
                {tag}
              </Badge>
            ))}
          </div>

          <span>
            Date of manufacture : {new Date(carData?.year)?.toDateString()}
          </span>

          <span className="capitalize">Company : {carData?.company}</span>

          <span className="capitalize">
            Transmission : {carData?.transmission}
          </span>

          <p className="font-medium text-muted-foreground line-clamp-6">
            <span className="text-black">Description : </span>{" "}
            {carData?.description}
          </p>

          <Button
            onClick={() => deleteCar({ id: id as string })}
            isLoading={isDeleteCarPending}
            disabled={isDeleteCarPending}
            className="mt-auto"
            variant="destructive"
          >
            Delete your Car.
          </Button>

          <Link
            href={href}
            className={cn(
              buttonVariants({ variant: "default" }),
              " w-full mt-6"
            )}
          >
            Update your Car.
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ViewPage;
