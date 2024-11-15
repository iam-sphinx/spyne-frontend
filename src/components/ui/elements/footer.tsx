import { SERVICES } from "@/constants/services";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../button";
import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const LOCATIONS = [
    {
      label: "delhi",
    },
    {
      label: "mumbai",
    },
    {
      label: "bangalore",
    },
    {
      label: "chennai",
    },
    {
      label: "kolkata",
    },
  ];

  const CONTACTS = [
    {
      Icon: Phone,
      label: "+91 123-4567-897",
    },
    {
      Icon: Mail,
      label: "spyne@gmail.com",
    },
    {
      Icon: MapPin,
      label: "123 north street bangalore",
    },
  ];
  
  return (
    <footer className="py-10 px-40 grid grid-cols-4 gap-12 bg-[#2e2b40] mx-auto w-full">
      <h1 className="text-white text-lg font-bold tracking-wide">Spyne</h1>
      <ul>
        <li
          className={cn(
            buttonVariants({ variant: "link" }),
            "text-white capitalize hover:no-underline"
          )}
        >
          our services
        </li>
        {SERVICES.map((service, idx) => (
          <li key={idx}>
            <Link
              href={service.href}
              className={cn(
                buttonVariants({ variant: "link" }),
                "text-white capitalize cursor-pointer"
              )}
            >
              {service.label}
            </Link>
          </li>
        ))}
      </ul>
      <ul>
        <li
          className={cn(
            buttonVariants({ variant: "link" }),
            "text-white capitalize hover:no-underline"
          )}
        >
          location
        </li>
        {LOCATIONS.map((location, idx) => (
          <li
            key={idx}
            className={cn(
              buttonVariants({ variant: "link" }),
              "text-white capitalize block cursor-pointer"
            )}
          >
            {location.label}
          </li>
        ))}
      </ul>
      <ul>
        <li
          className={cn(
            buttonVariants({ variant: "link" }),
            "text-white capitalize hover:no-underline"
          )}
        >
          contact
        </li>
        {CONTACTS.map((contact, idx) => (
          <li
            key={idx}
            className={cn(
              buttonVariants({ variant: "link" }),
              "text-white capitalize flex gap-3 items-center justify-start cursor-pointer"
            )}
          >
            <contact.Icon size={16} className="text-white" />
            <span>{contact.label}</span>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
