import { z } from "zod";

import { UserSettings } from "../../../app/type";
export const getLoginShemaMain = (
  currentUser?: UserSettings | null | undefined
) =>
  z.object({
    email: z
      .string()
      .min(7, "email need to be more long")
      .regex(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, {
        message: "Email must be a valid gmail.com address",
      })
      .refine(() => !currentUser?.provider, {
        message: "User can't login this way",
        path: ["email"],
      }),
    password: z.string().min(6, { message: "password need to be more long" }),
  });

export const registerShema = (currentUser?: UserSettings | null) =>
  z.object({
    name: z
      .string()
      .max(15, { message: "name can't be more" })
      .regex(/^[A-Z][a-z]*$/, {
        message:
          "Name must start with a capital letter and contain only letters",
      }),
    email: z
      .string()
      .min(5, { message: "email to short" })
      .max(50, { message: "email so long" })
      .regex(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, {
        message: "Email must be a valid gmail.com address",
      })
      .refine(
        (value) => {
          return value !== currentUser?.email;
        },
        { message: "User with this email has been" }
      ),
    password: z
      .string()
      .min(6, { message: "password need to be more long" })
      .max(30, { message: "password so long" }),
  });

export const changeProfile = z.object({
  name: z
    .string()
    .min(5, { message: "name so short" })
    .max(25, { message: "name so long" }),
  email: z
    .string()
    .min(5, { message: "email to short" })
    .max(50, { message: "email so long" })
    .regex(/^[a-zA-Z0-9._%+-]+@(gmail\.com|comp-sc\.if\.ua\.ua)$/, {
      message: "Email must be a valid gmail.com or comp-sc.if.ua.com address",
    }),
});

export const reviewsSettings = z.object({
  topic: z
    .string()
    .max(15, { message: "so long for this" })
    .regex(/^[a-zA-Z]/, { message: "not correct" }),
  messages: z.string().max(500, { message: "message so long" }),
  typeOfReviews: z.string().min(1, { message: "take type of reviews" }),
});

export const addTasks = z.object({
  name: z.string().max(15, { message: "so long for this" }),
  type: z.enum(["HIGH PRIORITY", "IN PROGRESS", "COMPLETED"], {
    errorMap: () => ({ message: "This type not exist" }),
  }),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});

export type GetLoginShema = z.infer<ReturnType<typeof getLoginShemaMain>>;
export type RegisterShema = z.infer<ReturnType<typeof registerShema>>;
export type ChangeProfile = z.infer<typeof changeProfile>;
export type ReviewsSettings = z.infer<typeof reviewsSettings>;
export type AddTasks = z.infer<typeof addTasks>;
