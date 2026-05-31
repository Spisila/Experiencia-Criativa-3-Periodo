import { z } from 'zod';

export const login_schema = z.object({
  email: z.email({ message: 'Email inválido' }),
  senha: z.string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
});

export type login_input = z.infer<typeof login_schema>;