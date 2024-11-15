import { SERVICES } from "@/constants/services";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../button";
import AuthComponent from "./authComponent";

const Navbar = () => {
  return (
    <nav className="h-16 px-2.5 md:px-20 flex w-full items-center justify-between border-b border-secondary fixed top-0 bg-white/10 z-10 bg-clip-padding backdrop-filter backdrop-blur-sm">
      <span className="font-bold tracking-wider text-2xl text-blue-500">
        Spyne
      </span>

      <ul className="flex items-center gap-6">
        {SERVICES.map((service, idx) => (
          <li key={idx}>
            <Link
              href={service.href}
              className={cn(
                buttonVariants({ variant: "link" }),
                "text-black capitalize"
              )}
            >
              {service.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-6">
        <AuthComponent />
      </div>
    </nav>
  );
};

export default Navbar;
