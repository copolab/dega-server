import { z } from "zod";

export const envSchema = z.object({
    PORT: z.coerce.number().optional().default(3000),
    NODE_ENV: z.enum(['development', 'production']).default('development'),
    PRIMARY_DB_CONNECTION_STRING: z.string().url(),
    PRIMARY_DB_NAME: z.string().min(3),
    EMAIL_SMTP_HOST: z.string(),
    EMAIL_SMTP_PORT: z.string(),
    EMAIL_SMTP_uSER: z.string(),
    EMAIL_SMTP_PASS: z.string()
});

export type IEnv = z.infer<typeof envSchema>;