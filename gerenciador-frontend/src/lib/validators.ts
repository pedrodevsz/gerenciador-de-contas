import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().trim().email('Informe um email valido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

export const registerSchema = z.object({
    name: z.string().trim().min(2, 'Informe seu nome'),
    email: z.string().trim().email('Informe um email valido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
