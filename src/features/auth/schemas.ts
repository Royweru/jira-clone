import * as z from 'zod'

export const LoginSchema = z.object({
    email: z.string().email().trim(),
    password: z.string().min(1,{
      message:"Required"
    }),
  });


  export const RegisterSchema = z.object({
    name:z.string(),
    email: z.string().email().trim(),
    password: z.string().min(8, {
      message: "Minimum of 8 characters is required for you to sign up",
    }),
  });