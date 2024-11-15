import { Loader2 } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <main className="absolute inset-0 bg-black/80 flex items-center justify-center">
      <Loader2 className="size-12 text-primary animate-spin" />
    </main>
  );
};

export default Loader;
