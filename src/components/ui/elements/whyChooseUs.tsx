import { CarFront, MapPin, PhoneCall, Users } from "lucide-react";
import Image from "next/image";
import React from "react";

const WhyChooseUs = () => {
  const INFOLIST = [
    {
      Icon: PhoneCall,
      heading: "customer support",
      description: "24/7 we provide customers support.",
    },
    {
      Icon: Users,
      heading: "large community",
      description: "24/7 we provide customers support.",
    },
    {
      Icon: CarFront,
      heading: "Free Cancellation",
      description: "24/7 we provide customers support.",
    },
    {
      Icon: MapPin,
      heading: "customer support",
      description: "24/7 we provide customers support.",
    },
    {
      Icon: PhoneCall,
      heading: "customer support",
      description: "24/7 we provide customers support.",
    },
    {
      Icon: PhoneCall,
      heading: "customer support",
      description: "24/7 we provide customers support.",
    },
  ];
  return (
    <div id="whyChooseUs" className="py-20 flex">
      <div className="flex-1 relative overflow-hidden">
        <Image src="/audi.webp" height={900} width={900} alt="audi" className="absolute -left-40 " />
      </div>

      <div className="flex-1">
        <h1 className="text-3xl font-bold">Why choose us</h1>
        <p className="text-base font-medium text-muted-foreground">
          our company offer discounts if you prepay for your support at the time
          of listing
        </p>

        <div className="grid grid-cols-2 gap-6 mt-6">
          {INFOLIST.map((info, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="size-12 rounded-sm flex items-center justify-center bg-primary/20">
                <info.Icon size={20} className="text-primary" />
              </div>
              <span className="capitalize text-base mt-3 font-medium">
                {info.heading}
              </span>
              <span className="text-muted-foreground text-base mt-1 max-w-60">
                {info.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
