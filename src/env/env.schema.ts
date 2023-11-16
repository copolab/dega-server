import { z } from "zod";

export const envSchema = z.object({
    PORT: z.coerce.number().optional().default(3000)
});

export type IEnv = z.infer<typeof envSchema>;