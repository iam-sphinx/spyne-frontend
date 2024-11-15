import React from "react";
import { Input } from "../input";
import { Button } from "../button";
import Image from "next/image";

const NewsLetter = () => {
  return (
    <div id="newsLetter" className="py-20 bg-[#f0f2ff] flex">
      <div className="flex-1 p-20">
        <h1 className="text-4xl font-bold max-w-lg">
          Subscribe and get the latest car rental updates
        </h1>

        <div className="max-w-xl flex w-full h-12 mt-16">
          <Input
            className="h-full flex-[2] rounded-r-none bg-white placeholder:text-muted-foreground"
            placeholder="Enter your email address"
          />
          <Button className="flex-1 h-full rounded-l-none">Subscribe</Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative">
        <Image
          src="/lexus.webp"
          alt="lexus"
          height={900}
          width={900}
          className="absolute -right-20 scale-125 -scale-x-125"
        />
      </div>
    </div>
  );
};

export default NewsLetter;
