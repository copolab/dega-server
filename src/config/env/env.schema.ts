import { z } from "zod";

export const envSchema = z.object({
    PORT: z.coerce.number().optional().default(3000),
    PRIMARY_DB_CONNECTION_STRING: z.string().url(),
    PRIMARY_DB_NAME: z.string().min(3)
});

export type IEnv = z.infer<typeof envSchema>;