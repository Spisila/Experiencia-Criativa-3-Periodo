# Experiencia-Criativa-3-Periodo

---

## Recursos Adicionados (Toast, Loader e Transições)

Foram implementados componentes globais de notificação, espera e animação para facilitar o desenvolvimento:

### 1. Como disparar Toast e Loading em qualquer página:
Importe o hook `useApp` dentro do componente da sua página:
```jsx
import { useApp } from './context/AppContext';

const { showToast, setLoading } = useApp();

setLoading(true); 

showToast('Ação concluída com sucesso!', 'success'); 

 // 2. Como aplicar a animação de troca de tela:
//Envolva a estrutura principal ou o container de cada rota/página com o componente <PageTransition> para obter o efeito de fade-in suave:

import { PageTransition } from '../../components/PageTransition';

return (
  <PageTransition>
    <div className="center">
      {/* Conteúdo da página aqui */}
    </div>
  </PageTransition>
);