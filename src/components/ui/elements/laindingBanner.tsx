import Image from "next/image";
import React from "react";

const LandingBanner = () => {
  return (
    <div id="home" className="flex mt-20 justify-between bg-[#f5f2f9]">
      <div className="py-40 flex-1">
        <h1 className="text-4xl font-bold max-w-lg px-12">
          Manage your Car business
          <span className="text-primary"> On the go</span>
        </h1>
        <p className="text-base font-medium text-muted-foreground mt-2 max-w-lg px-12">
          An online platform that allows dealers to list, search and manage
          their cars and we will take care of your sales.
        </p>
      </div>
      <div className="flex-1 rounded-l-3xl bg-primary/10 overflow-hidden relative">
        <Image
          src="/hero.webp"
          height={900}
          width={900}
          alt="hero icon"
          className="absolute bottom-0 -right-10"
        />
      </div>
    </div>
  );
};

export default LandingBanner;
