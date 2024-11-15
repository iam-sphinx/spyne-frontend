import { z } from "zod";

export const carSchema = z.object({
    model: z
      .string()
      .trim()
      .min(3, { message: "Title must be at least 3 characters long." }),
    company: z
      .string()
      .trim()
      .min(3, { message: "Title must be at least 3 characters long." }),
    dealer: z
      .string()
      .trim()
      .min(3, { message: "Title must be at least 3 characters long." }),
    dealerAddress: z
      .string()
      .trim()
      .min(5, { message: "Title must be at least 5 characters long." }),
    year: z.date({ required_error: "manufacturing year is required field." }),
    transmission: z.enum(["manual", "automatic"], {
      required_error: "transmission must be either manual or automatic",
    }),
    price: z
      .string({ required_error: "price is required" })
      .trim()
      .min(1, { message: "price is required" }),
    currency: z
      .string()
      .trim()
      .min(3, { message: "Title must be at least 3 characters long." }),
    description: z
      .string()
      .trim()
      .min(5, { message: "Description must be at least 5 characters long." }),
    tags: z
      .string({ required_error: "tags must be string" })
      .optional()
      .default(""),
    images: z
      .array(z.instanceof(File))
      .refine((files) => files.length <= 10, {
        message: "You can upload up to 10 images only.",
      })
      .refine(
        (files) => files.every((file) => file.type.startsWith("image/")),
        {
          message: "Only image files are allowed.",
        }
      ),
  });