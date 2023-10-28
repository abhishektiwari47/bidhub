import z from 'zod';
export declare let InputValidation: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export declare const x: Number;
export type SignupParams = z.infer<typeof InputValidation>;
