import * as z from "zod"


export const SignupValidation = z.object({
    name:z.string().min(2,{message:"Too Short"}),
    username: z.string().min(2,{message:"too Short"}),
    email:z.string().email(),
    password: z.string().min(8,{message:"the Password must be of minimum 8 characters"})
  })
  
export const SigninValidation = z.object({
    email:z.string().email(),
    password: z.string().min(8,{message:"the Password must be of minimum 8 characters"})
  })
export const PostValidation = z.object({
    caption:z.string().min(5).max(2200),
    file: z.custom<File[]>(),
    location: z.string().min(2).max(100),
    tags:z.string(),
  })

export const profileFormSchema=z.object({
  name:z.string().min(2).max(22),
  file: z.custom<File[]>(),
  username:z.string().min(2).max(22),
  email:z.string().email(),
  bio:z.string().min(0)
})  