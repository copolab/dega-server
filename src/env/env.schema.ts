import { z } from "zod";

export const envSchema = z.object({
    PORT: z.coerce.number().optional().default(3000),
    PRIMARY_DB_CONNECTION_STRING: z.string().url()
});

export type IEnv = z.infer<typeof envSchema>;