# Mercado Pago - Club Empar — Configuração Ativa

**Última atualização:** 22/04/2026  
**Status:** ✅ Integração Completa

---

## 1. Credenciais Configuradas

| Variável | Ambiente | Status |
|----------|----------|--------|
| `MP_ACCESS_TOKEN` | `.env` / `.dev.vars` / Cloudflare Secrets | ✅ Ativo |
| `MP_PUBLIC_KEY` | `.env` / `.dev.vars` | ✅ Ativo |

### Onde as credenciais estão salvas:
- **Local (dev):** `.env` e `.dev.vars`
- **Produção (Cloudflare Workers):** Configurar via `wrangler secret put MP_ACCESS_TOKEN`

---

## 2. Fluxo Completo de Pagamento

```
┌─────────────────────────────────────────────────────────────┐
│                    FLUXO MERCADO PAGO                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Usuário clica "Assinar" na página /plans                │
│     ↓                                                       │
│  2. Redireciona para /checkout?plan=<planId>                │
│     ↓                                                       │
│  3. Frontend chama POST /api/checkout/create-preference     │
│     (com planId, userId, email)                             │
│     ↓                                                       │
│  4. Backend cria Preference no Mercado Pago                 │
│     ↓                                                       │
│  5. Usuário é redirecionado para o init_point (MP)          │
│     ↓                                                       │
│  6. Usuário paga via Cartão / PIX / Boleto                  │
│     ↓                                                       │
│  7. MP redireciona para /dashboard?payment=success          │
│     ↓                                                       │
│  8. MP envia webhook POST /api/webhooks/mercadopago         │
│     ↓                                                       │
│  9. Webhook valida pagamento e ativa assinatura             │
│     (INSERT/UPDATE na tabela emparclub.subscriptions)       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Arquivos da Integração

| Arquivo | Função |
|---------|--------|
| `src/api/routes/checkout.ts` | Cria Preference (backend) |
| `src/api/routes/webhooks.ts` | Recebe notificação do MP |
| `src/web/pages/checkout.tsx` | Tela de checkout (frontend) |
| `src/web/pages/dashboard.tsx` | Feedback de retorno do pagamento |
| `src/api/database/schema.ts` | Tabela `subscriptions` com `mp_payment_id` |
| `src/api/index.ts` | Rotas montadas ANTES do authMiddleware |

---

## 4. Decisões Técnicas

- **Checkout Pro (Externo):** O usuário é redirecionado ao Mercado Pago para pagar.
- **Métodos:** Cartão de Crédito, PIX, Boleto.
- **Webhook URL:** `https://www.clubempar.com.br/api/webhooks/mercadopago`
- **Auto Return:** Apenas quando aprovado (`auto_return: 'approved'`).
- **External Reference:** Formato `userId:planId` para rastrear quem pagou o quê.

---

## 5. Segurança

- ✅ Rotas de webhook e checkout montadas **antes** do authMiddleware (MP não envia cookies).
- ✅ Checkout usa `authenticatedOnly` middleware (requer login do usuário).
- ✅ `notification_url` sempre aponta para URL de produção (não localhost).
- ✅ `mp_payment_id` salvo no banco para rastreabilidade.

---

## 6. Deploy — Checklist

- [ ] Configurar `MP_ACCESS_TOKEN` no Cloudflare Workers: `wrangler secret put MP_ACCESS_TOKEN`
- [ ] Configurar `MP_PUBLIC_KEY` no Cloudflare Workers: `wrangler secret put MP_PUBLIC_KEY`
- [ ] Verificar webhook no painel do Mercado Pago: URL = `https://www.clubempar.com.br/api/webhooks/mercadopago`
- [ ] Testar pagamento com cartão de teste do MP
- [ ] Verificar se a assinatura foi ativada no banco após pagamento
