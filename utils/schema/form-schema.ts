import * as z from "zod";

export const FormSchema = z.object({
  blood_pressure: z
    .number({ required_error: "Blood pressure is required." })
    .min(90)
    .max(190),
  cholesterol: z
    .number({ required_error: "Cholestrol is required." })
    .min(100)
    .max(200),
  fasting_sugar: z
    .number({ required_error: "Cholestrol is required." })
    .min(0)
    .max(1),
  max_heart_rate: z
    .number({ required_error: "Max heart rate is required." })
    .min(90)
    .max(200),
  resting_ecg: z
    .number({ required_error: "Cholestrol is required." })
    .min(0)
    .max(1),
});
export const LoginFormSchema = z.object({
  age: z.number({ required_error: "Age is required." }).min(1).max(120),
  gender: z.string({ required_error: "Gender is required." }),
  user_name: z.string({ required_error: "User name is required." }),
});
