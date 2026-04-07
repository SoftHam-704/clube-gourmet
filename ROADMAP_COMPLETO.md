# Club Empar - Roadmap Completo do Projeto

## 📋 Plano Inicial (Baseado na Análise Duo Gourmet)

### PÁGINAS PRINCIPAIS A CRIAR
- [x] **Home** (/) - ✅ CONCLUÍDO
- [x] **Restaurantes** (/restaurantes) - ✅ CONCLUÍDO
- [ ] **Experiências** (/experiencias) - eventos e experiências especiais
- [ ] **Aplicativo** (/aplicativo) - download e features do app
- [x] **Planos** (/assinar) - ✅ CONCLUÍDO (como /plans)
- [ ] **Club Família** (/familia) - plano família detalhado
- [ ] **Indique e Ganhe** (/indique) - programa de indicação
- [ ] **Seja Parceiro** (/parcerias) - cadastro de restaurantes
- [ ] **Club Empresas** (/empresas) - planos corporativos
- [ ] **Contato** (/contato) - formulário de contato
- [ ] **Sobre Nós** (/sobre-nos) - história da empresa
- [ ] **FAQ** (/faq) - perguntas frequentes expandido
- [ ] **Cadastro/Login** (/cadastro, /login) - autenticação

---

## ✅ FASE 1 - MVP (CONCLUÍDA)

### Design & Frontend Base
- [x] Design premium industrial/tech
- [x] Tema escuro com cores vibrantes
- [x] Tipografia profissional (Sora + JetBrains Mono)
- [x] Layout responsivo
- [x] Navegação com menu mobile
- [x] Animações e micro-interações

### Páginas Core
- [x] Home completa (hero, benefits, how-it-works, testimonials, newsletter)
- [x] Restaurantes com 12 exemplos
- [x] Filtros funcionais (cozinha, preço, disponibilidade)
- [x] Planos (3 tiers: Mensal, Anual, Família)
- [x] FAQ accordion
- [x] Calculadora ROI

### Conteúdo
- [x] 100% traduzido para português brasileiro
- [x] Copy persuasivo focado em conversão
- [x] Depoimentos de clientes
- [x] Trust badges

---

## 🚧 FASE 2 - Páginas Institucionais (PRÓXIMO)

### Páginas a Criar
- [ ] **Sobre Nós** - História, missão, valores
- [ ] **Contato** - Formulário, mapa, telefones, email
- [ ] **FAQ Completo** - Página dedicada com categorias
- [ ] **Como Funciona** - Página detalhada do processo
- [ ] **Termos de Uso** - Termos legais
- [ ] **Política de Privacidade** - LGPD compliance

### Estimativa: 1 semana

---

## 🔐 FASE 3 - Autenticação & Usuários (2-3 semanas)

### Sistema de Cadastro
- [ ] Página de cadastro (/cadastro)
- [ ] Validação de email
- [ ] Senha forte (requisitos)
- [ ] Captcha anti-bot
- [ ] Termos e condições

### Sistema de Login
- [ ] Página de login (/login)
- [ ] Login com email/senha
- [ ] "Esqueci minha senha"
- [ ] Login social (Google, Facebook - opcional)
- [ ] Manter conectado

### Dashboard do Usuário
- [ ] Área logada (/dashboard)
- [ ] Perfil do usuário
- [ ] Histórico de uso
- [ ] Restaurantes favoritos
- [ ] Configurações de conta
- [ ] Alterar senha
- [ ] Gerenciar assinatura

---

## 💳 FASE 4 - Sistema de Pagamentos (2-3 semanas)

### Integração Gateway (Mercado Pago 🚀)
- [x] Gateway Escolhido: **Mercado Pago**
- [ ] Configurar credenciais reais (Aguardando usuário)
- [x] Endpoint de Checkout Preference (`api/checkout.ts`)
- [x] Webhook estruturado (`api/webhooks/mercadopago.ts`)
- [ ] Implementar checkout completo no frontend
- [ ] Webhooks de confirmação
- [ ] Ambiente de produção

### Gestão de Assinatura
- [ ] Processar pagamento mensal
- [ ] Processar pagamento anual
- [ ] Processar pagamento família
- [ ] Renovação automática
- [ ] Cancelamento de assinatura
- [ ] Upgrade/downgrade de plano
- [ ] Histórico de pagamentos
- [ ] Notas fiscais/recibos

### Segurança
- [ ] PCI compliance
- [ ] SSL/HTTPS
- [ ] Dados criptografados
- [ ] Tokenização de cartões

---

## 🍽️ FASE 5 - Sistema de Benefícios (3-4 semanas)

### Geração de Código
- [ ] Código único por uso
- [ ] QR Code gerado no app/site
- [ ] Código com validade (24h)
- [ ] Limite de usos por período
- [ ] Bloqueio de uso duplicado

### Validação no Restaurante
- [ ] Scanner de QR Code (parceiros)
- [ ] Validação manual de código
- [ ] Registro de uso
- [ ] Confirmação em tempo real
- [ ] Histórico de validações

### Regras de Negócio
- [ ] 2 por 1 no prato de menor valor
- [ ] Limite de 1 uso por dia (configurável)
- [ ] Horários permitidos por restaurante
- [ ] Dias da semana permitidos
- [ ] Restrições por tipo de prato (se aplicável)

---

## 🏪 FASE 6 - Sistema de Restaurantes (2-3 semanas)

### CRUD de Restaurantes (Admin)
- [ ] Cadastro de restaurantes
- [ ] Upload de fotos
- [ ] Definir horários de funcionamento
- [ ] Dias/horários com benefício
- [ ] Cardápio digital
- [ ] Localização no mapa
- [ ] Status ativo/inativo

### Dashboard do Restaurante
- [ ] Login de parceiros
- [ ] Validar códigos de clientes
- [ ] Ver estatísticas de uso
- [ ] Relatórios mensais
- [ ] Configurações do perfil

### Página Pública do Restaurante
- [ ] Página individual (/restaurante/[id])
- [ ] Galeria de fotos
- [ ] Cardápio completo
- [ ] Avaliações de clientes
- [ ] Botão de direções (Google Maps)
- [ ] Compartilhar nas redes sociais

---

## 📱 FASE 7 - App Mobile (2-3 meses)

### Aplicativo iOS
- [ ] React Native setup
- [ ] Design adaptado
- [ ] Login/cadastro
- [ ] Listagem de restaurantes
- [ ] Geração de QR Code
- [ ] Histórico de uso
- [ ] Notificações push
- [ ] Publicação na App Store

### Aplicativo Android
- [ ] React Native setup
- [ ] Design adaptado
- [ ] Login/cadastro
- [ ] Listagem de restaurantes
- [ ] Geração de QR Code
- [ ] Histórico de uso
- [ ] Notificações push
- [ ] Publicação na Play Store

### Features do App
- [ ] Modo offline (ver histórico)
- [ ] Busca por proximidade (GPS)
- [ ] Favoritos
- [ ] Push notifications
- [ ] Deep linking
- [ ] Compartilhamento

---

## 🎯 FASE 8 - Marketing & Crescimento (Contínuo)

### Páginas de Marketing
- [ ] **Indique e Ganhe** - Programa de indicação
- [ ] Landing pages específicas
- [ ] Programa de afiliados
- [ ] Blog/Conteúdo
- [ ] Cases de sucesso

### Programa Indique e Ganhe
- [ ] Link/código de indicação único
- [ ] Recompensa para indicador
- [ ] Desconto para indicado
- [ ] Dashboard de indicações
- [ ] Tracking de conversões

### SEO & Analytics
- [ ] Google Analytics
- [ ] Meta tags otimizadas
- [ ] Sitemap XML
- [ ] Schema markup
- [ ] Google Search Console
- [ ] Facebook Pixel
- [ ] Heatmaps (Hotjar)

---

## 🏢 FASE 9 - B2B (Club Empresas) (1-2 meses)

### Planos Corporativos
- [ ] Página Club Empresas
- [ ] Planos para times (10, 50, 100+ pessoas)
- [ ] Gestão de múltiplos usuários
- [ ] Admin corporativo
- [ ] Relatórios de uso por empresa
- [ ] Faturamento centralizado
- [ ] Onboarding empresarial

---

## 🤝 FASE 10 - Portal de Parceiros (2-3 meses)

### Área de Parceiros
- [ ] Cadastro de interesse (Seja Parceiro)
- [ ] Análise de candidatos
- [ ] Onboarding de novos parceiros
- [ ] Contrato digital
- [ ] Treinamento para staff
- [ ] Material de divulgação
- [ ] Suporte dedicado

### Analytics para Parceiros
- [ ] Dashboard de performance
- [ ] Número de resgates
- [ ] Ticket médio
- [ ] Dias/horários de pico
- [ ] ROI do parceiro
- [ ] Comparativo com outros parceiros

---

## 🔧 FASE 11 - Integrações Avançadas (Futuro)

### Integrações Bancárias
- [ ] Banco Inter (Inter Prime upgrade)
- [ ] Cartão de crédito próprio
- [ ] Cashback automático
- [ ] Sistema de pontos
- [ ] Priority Pass

### Outras Integrações
- [ ] Google Maps API (mapa real)
- [ ] WhatsApp Business API
- [ ] Email marketing (SendGrid, Mailchimp)
- [ ] CRM (HubSpot, RD Station)
- [ ] Sistema de tickets (Zendesk)

---

## 📊 FUNCIONALIDADES ADICIONAIS (Backlog)

### Experiências
- [ ] Página de Experiências
- [ ] Eventos especiais
- [ ] Jantares temáticos
- [ ] Degustações
- [ ] Reservas para experiências

### Social & Gamificação
- [ ] Sistema de reviews
- [ ] Fotos de pratos (Instagram-like)
- [ ] Badges/conquistas
- [ ] Ranking de usuários
- [ ] Compartilhar nas redes sociais

### Personalização
- [ ] Preferências alimentares
- [ ] Restrições (vegetariano, vegano, celíaco)
- [ ] Restaurantes recomendados
- [ ] AI para sugestões personalizadas

---

## 📈 ESTIMATIVAS DE TEMPO

### Resumo Geral
| Fase | Descrição | Tempo Estimado | Status |
|------|-----------|----------------|--------|
| 1 | MVP - Frontend Base | 2-3 semanas | ✅ CONCLUÍDO |
| 2 | Páginas Institucionais | 1 semana | 🔜 Próximo |
| 3 | Autenticação & Usuários | 2-3 semanas | 📋 Planejado |
| 4 | Sistema de Pagamentos | 2-3 semanas | 📋 Planejado |
| 5 | Sistema de Benefícios | 3-4 semanas | 📋 Planejado |
| 6 | Sistema de Restaurantes | 2-3 semanas | 📋 Planejado |
| 7 | App Mobile | 2-3 meses | 📋 Planejado |
| 8 | Marketing & Crescimento | Contínuo | 📋 Planejado |
| 9 | B2B (Empresas) | 1-2 meses | 📋 Futuro |
| 10 | Portal de Parceiros | 2-3 meses | 📋 Futuro |
| 11 | Integrações Avançadas | Variável | 📋 Futuro |

### MVP Completo Funcional: 10-12 semanas
### Produto Completo com App: 4-6 meses

---

## 🎯 PRIORIDADES RECOMENDADAS

### Curto Prazo (1-2 meses)
1. ✅ MVP Frontend (FEITO)
2. 🔜 Páginas institucionais
3. 🔜 Sistema de autenticação
4. 🔜 Sistema de pagamentos básico

### Médio Prazo (3-4 meses)
5. Sistema de benefícios (QR Code)
6. CRUD de restaurantes completo
7. Dashboard de usuário robusto
8. Programa indique e ganhe

### Longo Prazo (5-6 meses)
9. App mobile (iOS + Android)
10. Portal de parceiros
11. Club Empresas (B2B)
12. Integrações avançadas

---

## 💡 DECISÕES TÉCNICAS PENDENTES

### Backend
- [ ] Escolher stack: Node.js/Express, Python/Django, PHP/Laravel?
- [ ] Database: PostgreSQL, MySQL, MongoDB?
- [ ] Hospedagem: AWS, Google Cloud, Heroku, Vercel?
- [ ] CDN: Cloudflare, AWS CloudFront?

### Pagamentos
- [ ] Gateway: Stripe (internacional) ou Mercado Pago (BR)?
- [ ] Backup gateway para redundância?

### Mobile
- [ ] React Native ou Flutter?
- [ ] Native separado (Swift + Kotlin)?

### Infraestrutura
- [ ] CI/CD: GitHub Actions, GitLab CI?
- [ ] Monitoring: Sentry, DataDog, New Relic?
- [ ] Emails transacionais: SendGrid, AWS SES, Postmark?

---

**Última atualização:** 27 de Janeiro de 2026  
**Versão atual:** MVP v1.0 - Frontend Completo
