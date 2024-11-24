import { z } from "zod";
export const formSchema = z.object({
  ename: z.string().min(2, {
    message: "Event name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  banner: z.string().url({
    message: "Banner must be a valid URL.",
  }),
  club: z.string().min(1, {
    message: "Club must be selected.",
  }),
  entryFee: z.number().min(0, {
    message: "Entry fee must be a positive number.",
  }),
  teamMates: z.number().min(1, {
    message: "Number of team mates must be at least 1.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  contact: z.string().min(10, {
    message: "Contact number must be at least 10 digits.",
  }),
  dateTime: z.string().min(1, {
    message: "Date and time must be selected.",
  }),
});
