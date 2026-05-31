import { z } from 'zod';

export const cadastro_usuario_schema = z.object({
  nome: z.string()
    .min(3, 'O nome deve ter pelo menos 3 caracteres')
    .max(100, 'Nome longo demais')
    .regex(/^[a-zA-Z\s]+$/, 'O nome deve conter apenas letras e espaços'),
  cpf: z.string()
    .min(11, 'O CPF deve ter 11 dígitos')
    .max(11, 'O CPF deve ter 11 dígitos')
    .regex(/^\d+$/, 'O CPF deve conter apenas números'),
  email: z.email({ message: 'Email inválido' }),
  senha: z.string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
});

export type cadastro_usuario_input = z.infer<typeof cadastro_usuario_schema>;
