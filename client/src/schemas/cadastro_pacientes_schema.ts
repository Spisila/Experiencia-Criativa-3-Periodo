import { z } from 'zod';

export const cadastro_paciente_schema = z.object({
    nome: z.string()
      .min(3, 'O nome deve ter pelo menos 3 caracteres')
      .max(100, 'Nome longo demais')
      .regex(/^[a-zA-Z\s]+$/, 'O nome deve conter apenas letras e espaços'),
    data_nascimento: z.date()
      .max(new Date(), 'A data de nascimento não pode ser no futuro'),
    cpf: z.string()
      .min(11, 'O CPF deve ter 11 dígitos')
      .max(11, 'O CPF deve ter 11 dígitos')
      .regex(/^\d+$/, 'O CPF deve conter apenas números')
});

export type cadastro_paciente_input = z.infer<typeof cadastro_paciente_schema>;