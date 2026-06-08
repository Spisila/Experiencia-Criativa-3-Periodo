import { z } from 'zod';

export const cadastro_paciente_schema = z.object({
  nome: z.string()
    .min(3, 'O nome deve ter pelo menos 3 caracteres')
    .max(100, 'Nome longo demais')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'O nome deve conter apenas letras e espaços'),

  cpf: z.string()
    .length(11, 'O CPF deve ter 11 dígitos')
    .regex(/^\d+$/, 'O CPF deve conter apenas números'),

  data_nascimento: z.date()
    .max(new Date(), 'A data de nascimento não pode ser no futuro'),

  mother_name: z.string()
    .min(3, 'O nome da mãe deve ter pelo menos 3 caracteres')
    .max(100, 'Nome da mãe longo demais')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'O nome da mãe deve conter apenas letras e espaços'),

  responsible_name: z.string()
    .min(3, 'O nome do responsável deve ter pelo menos 3 caracteres')
    .max(100, 'Nome do responsável longo demais')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'O nome do responsável deve conter apenas letras e espaços')
    .optional()
    .or(z.literal('')),

  cpf_responsible: z.string()
    .length(11, 'O CPF do responsável deve ter 11 dígitos')
    .regex(/^\d+$/, 'O CPF do responsável deve conter apenas números')
    .optional()
    .or(z.literal('')),

  phone_number: z.string()
    .min(10, 'O telefone deve ter pelo menos 10 dígitos')
    .max(11, 'O telefone deve ter no máximo 11 dígitos')
    .regex(/^\d+$/, 'O telefone deve conter apenas números'),

  country: z.string()
    .min(2, 'Informe o país')
    .max(100, 'Nome do país muito longo'),

  state: z.string()
    .min(2, 'Informe o estado')
    .max(100, 'Nome do estado muito longo'),

  city: z.string()
    .min(2, 'Informe a cidade')
    .max(100, 'Nome da cidade muito longa'),

  observacao: z.string()
    .max(500, 'A observação deve ter no máximo 500 caracteres')
    .optional()
    .or(z.literal(''))
});

export type cadastro_paciente_input = z.infer<
  typeof cadastro_paciente_schema
>;