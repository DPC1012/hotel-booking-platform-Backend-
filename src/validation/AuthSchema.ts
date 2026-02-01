import z from "zod"

export const RequiredSignupBody = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(4),
    role: z.enum(["customer", "owner"]).default("customer"),
    phone: z.string().min(10).max(13).optional()
})

export const RequiredLoginBody = z.object({
    email: z.email(),
    password: z.string().min(4),
})
