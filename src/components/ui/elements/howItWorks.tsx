import { cn } from "@/lib/utils";
import { Car, File, LucideIcon, User2 } from "lucide-react";
import React from "react";

const Step = ({
  Icon,
  logoCl,
  bgCl,
  heading,
  description,
}: {
  Icon: LucideIcon;
  logoCl?: string;
  bgCl?: string;
  heading: string;
  description: string;
}) => {
  return (
    <div className="p-10">
      <div
        className={cn(
          "rounded-md size-14 flex mx-auto items-center justify-center",
          bgCl
        )}
      >
        <Icon size={24} className={cn(logoCl)} />
      </div>

      <h1 className="text-2xl font-semibold text-center mt-3">{heading}</h1>
      <p className="text-base font-medium text-muted-foreground text-center max-w-80 mt-4">
        {description}
      </p>
    </div>
  );
};

const HowItWorks = () => {
  const INFOLIST = [
    {
      Icon: User2,
      logoCl: "text-blue-800",
      bgCl: "bg-blue-800/20",
      heading: "create account",
      description:
        "Register on our platform to enjoy our services. let us manage your sales.",
    },
    {
      Icon: Car,
      logoCl: "text-red-800",
      bgCl: "bg-red-800/20",
      heading: "Add a car",
      description: "list your car details using our user friendly steps.",
    },
    {
      Icon: File,
      logoCl: "text-purple-800",
      bgCl: "bg-purple-800/20",
      heading: "Manage your Cars",
      description: "Manage your Cars on our platform with our best services.",
    },
  ];
  return (
    <div id="howItWorks" className="py-20">
      <h1 className="text-3xl font-bold text-black text-center">How it Work</h1>
      <p className="text-center max-w-xl mx-auto mt-3 text-base font-medium text-muted-foreground">
        The user visits spyne and register himself. and then can add, manage,
        delete and list their cars and we will manage your sales
      </p>

      <div className="flex items-center justify-between">
        {INFOLIST.map((info, idx) => (
          <Step {...info} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
