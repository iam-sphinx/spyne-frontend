import { Star, StarHalf } from "lucide-react";
import Image from "next/image";
import React from "react";

const Testimonial = ({
  username,
  profile,
  message,
}: {
  username: string;
  profile: string;

  message: string;
}) => {
  return (
    <div className="p-6 rounded-2xl bg-[#f6f6f6] max-w-xl">
      <div className="flex items-center gap-6">
        <div className="size-10 rounded-full overflow-hidden relative">
          <Image
            src={profile}
            fill
            alt="pfp"
            className="size-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-medium">{username}</h1>
          <div className="flex items-center gap-1">
            <Star className="size-4 text-green-600 fill-green-600" />
            <Star className="size-4 text-green-600 fill-green-600" />
            <Star className="size-4 text-green-600 fill-green-600" />
            <Star className="size-4 text-green-600 fill-green-600" />
            <Star className="size-4 text-green-600 fill-green-600" />
          </div>
        </div>
      </div>

      <p className="text-muted-foreground mt-6 line-clamp-5">{message}</p>
    </div>
  );
};

const Testimonials = () => {
  const TESTIMONIALS = [
    {
      username: "jane cooper",
      profile: "/pfp.jpg",
      rating: 4.5,
      message:
        "Quality vehicles: our rental company offers a wide range of high-quality vehicles that are regularly maintained and inspected to ensure the best possible rental experience.",
    },
    {
      username: "jane cooper",
      profile: "/pfp.jpg",
      rating: 4.5,
      message:
        "Quality vehicles: our rental company offers a wide range of high-quality vehicles that are regularly maintained and inspected to ensure the best possible rental experience.",
    },
    {
      username: "jane cooper",
      profile: "/pfp.jpg",
      message:
        "Quality vehicles: our rental company offers a wide range of high-quality vehicles that are regularly maintained and inspected to ensure the best possible rental experience.",
    },
  ];
  return (
    <div id="testimonials" className="py-20">
      <h1 className="text-3xl font-bold text-center">
        What people says about us
      </h1>
      <p className="max-w-xl w-full text-center mx-auto">
        The website usually requires customers to input their pick-up and
        dropoff locations, dates, and times, and many offer additional options
        such as
      </p>

      <div className="flex gap-6 mt-12 justify-between">
        {TESTIMONIALS.map((testimonial, idx) => (
          <Testimonial {...testimonial} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
