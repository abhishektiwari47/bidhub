import z from 'zod';

export let InputValidation = z.object({
    username: z.string().max(10),
    password:z.string().max(10)
})

export const x:Number = 4;

export type SignupParams = z.infer<typeof InputValidation>;