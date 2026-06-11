import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

app.post('/api/usuarios', async (req, res) => {
  const { email, password, perfil, nome, cpf } = req.body;

  try {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true, 
      user_metadata: {
        nome: nome,
        cpf: cpf,
        perfil: perfil
      } 
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json({
      message: 'Usuário criado com sucesso',
      user: data.user
    });

  } catch (err) {
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }

});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

export async function deleteUser(userId: string) {
  const { data, error } = await supabaseAdmin.auth.admin.deleteUser(userId);

  if (error) throw error;

  return data;
}