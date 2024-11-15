"use client";

import useDeleteCar from "@/app/hooks/useDeleteCar";
import { formatCurrency } from "@/lib/formatCurrency";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "../button";
import { Card, CardContent } from "../card";

type Car = {
  model: string;
  year: string;
  _id: string;
  images: string[];
  price: number;
  transmission: string;
  currency: string;
};

const CarInfoCard = ({
  year,
  model,
  _id,
  images,
  price,
  transmission,
  currency,
}: Car) => {
  const { deleteCar, isDeleteCarPending } = useDeleteCar();
  const releasedYear = new Date(year).getFullYear();
  const viewHref = `/cars/view/${_id}`;
  const updateHref = `/cars/update/${_id}`;

  return (
    <Card>
      <CardContent className="p-8 flex gap-6">
        <div className="h-24 w-36 rounded-xl overflow-hidden relative">
          <Image
            src={images[0]}
            alt={model}
            fill
            className="size-full object-cover"
          />
        </div>

        <div className="flex flex-col  flex-1">
          <span className="text-xl font-bold">
            {releasedYear} : {model}
          </span>

          <span className="capitalize mt-1">
            <span className="font-medium text-muted-foreground">
              transmission
            </span>{" "}
            : <span className="font-semibold">{transmission}</span>
          </span>

          <span>
            <span className="font-medium text-muted-foreground">Price</span> :{" "}
            <span className="font-semibold">
              {formatCurrency(price, currency)}
            </span>
          </span>

          <div className="flex gap-4 ml-auto mt-3">
            <Link
              href={viewHref}
              className={cn(buttonVariants({ variant: "default" }), "ml-auto")}
            >
              view More info.
            </Link>

            <Link
              href={updateHref}
              className={cn(buttonVariants({ variant: "default" }), "ml-auto")}
            >
              update.
            </Link>

            <Button
              variant={"destructive"}
              onClick={() => deleteCar({ id: _id })}
              isLoading={isDeleteCarPending}
              disabled={isDeleteCarPending}
            >
              delete.
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarInfoCard;
