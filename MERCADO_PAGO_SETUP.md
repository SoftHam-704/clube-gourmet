# Guia de Integração: Mercado Pago - Club Empar

Este documento descreve os pré-requisitos e o fluxo técnico para a ativação do sistema de pagamentos e assinaturas.

## 1. Credenciais Necessárias
Acesse o [Painel de Desenvolvedores do Mercado Pago](https://www.mercadopago.com.br/developers/panel/app) e obtenha as seguintes chaves:

### Ambiente de Teste (Sandbox)
- `MP_PUBLIC_KEY_TEST`: Chave pública para o frontend.
- `MP_ACCESS_TOKEN_TEST`: Token de acesso para o backend.

### Ambiente de Produção
- `MP_PUBLIC_KEY_PROD`: Necessário para processar vendas reais.
- `MP_ACCESS_TOKEN_PROD`: Necessário para processar vendas reais.

---

## 2. Configurações de Ambiente (Vercel e .env)
As variáveis abaixo devem ser configuradas no painel da Vercel:

```env
# Mercado Pago Config
MP_ACCESS_TOKEN=seu_access_token_aqui
MP_PUBLIC_KEY=sua_public_key_aqui
MP_WEBHOOK_SECRET=chave_de_validacao_opcional
```

---

## 3. Fluxo de Integração Técnica
O fluxo será dividido em três partes:

### A. Criação de Preferência (Backend)
Quando o usuário clica em "Assinar":
1. O backend envia os detalhes do plano para a API do Mercado Pago.
2. O Mercado Pago retorna um `init_point` (Link de pagamento) ou um `preference_id`.

### B. Checkout (Frontend)
1. O usuário finaliza o pagamento via Cartão, PIX ou Boleto no checkout escolhido.
2. O Mercado Pago redireciona o usuário de volta para: `https://www.clubempar.com.br/payment-status`.

### C. Webhook de Confirmação (Automatização)
1. O Mercado Pago envia uma notificação `POST` para `/api/webhooks/mercadopago`.
2. Nosso servidor valida o pagamento.
3. Se aprovado, o servidor atualiza o banco de dados:
   - Muda `membership_status` para `active`.
   - Registra a data de expiração da assinatura.

---

## 4. Checklist de Decisões do Cliente
- [ ] **Modelo de Checkout**: Checkout Pro (externo) ou Checkout Transparente (interno)?
- [ ] **Métodos de Pagamento**: Apenas Cartão e PIX, ou aceitará Boleto também?
- [ ] **Assinaturas Recorrentes**: O Mercado Pago deve cobrar automaticamente todo mês ou o usuário deve renovar manualmente?

---
*Documento criado em: 08/04/2026*
