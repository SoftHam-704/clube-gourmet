# 🎨 Club Empar - Nova Paleta Verde Premium Tech

## 🎯 ESTRATÉGIA: Híbrido Sofisticado

Manter o estilo tech/moderno mas incorporar o verde elegante do logo de forma premium.

---

## 🌈 PALETA PROPOSTA

### Cores Base (mantém tech)
```css
--bg-primary: #0a0a0a         /* Preto principal (mantém) */
--bg-secondary: #0f1410       /* Preto com toque de verde SUTIL */
--bg-elevated: #1a4d2e        /* Verde escuro do logo - USO ESTRATÉGICO */
```

### Verde em Gradação (novo sistema)
```css
--green-darker: #0f3520       /* Verde muito escuro (backgrounds alternados) */
--green-dark: #1a4d2e         /* Verde do logo (cards, acentos) */
--green-medium: #2d7a4f       /* Verde médio (hover, borders) */
--green-accent: #3da56a       /* Verde mais claro (destaque interativo) */
--green-bright: #4ec985       /* Verde vibrante (CTAs, badges) */
```

### Dourado Premium (novo)
```css
--gold-dark: #b89968          /* Dourado escuro (texto destaque) */
--gold: #d4c5a0               /* Dourado do logo (títulos premium) */
--gold-light: #e6d7b8         /* Dourado claro (hover) */
```

### Neutros (mantém tech)
```css
--text-primary: #ffffff
--text-secondary: #9ca3af
--text-tertiary: #6b7280
--border-default: #2d7a4f     /* MUDANÇA: border verde em vez de cinza */
--border-subtle: #1a4d2e
```

---

## 🎯 ONDE USAR CADA COR

### Fundo Preto (#0a0a0a) - 70% da tela
- Layout principal
- Background geral
- Mantém sensação tech

### Verde Escuro (#1a4d2e) - 20% da tela
✅ Hero section (background sutil com gradient)
✅ Cards de destaque (planos, benefícios)
✅ Seções alternadas (every other section)
✅ Footer
✅ Sidebar/Navigation hover states

### Verde Médio (#2d7a4f) - 5% da tela
✅ Borders principais
✅ Divisores de seção
✅ Hover states em cards
✅ Progress bars
✅ Active states

### Verde Accent (#4ec985) - 5% da tela
✅ Botões CTA principais
✅ Badges "MAIS POPULAR"
✅ Icons importantes
✅ Links em hover
✅ Loading states

### Dourado (#d4c5a0) - <5% da tela
✅ Títulos H1 premium
✅ Números/stats importantes
✅ Logo text
✅ Badges VIP/Premium
✅ Elementos de luxo pontuais

---

## 🎨 EXEMPLOS PRÁTICOS

### Hero Section (novo)
```css
background: linear-gradient(135deg, #0a0a0a 0%, #0f3520 50%, #1a4d2e 100%);
```
- Começa preto (tech)
- Termina verde escuro (elegante)
- Transição suave

### Cards
```css
background: #0f3520;              /* Verde muito escuro */
border: 1px solid #2d7a4f;        /* Border verde médio */
hover: border-color: #4ec985;     /* Hover verde vibrante */
```

### Botões
```css
/* Primário */
background: #4ec985;              /* Verde vibrante */
color: #0a0a0a;                   /* Texto preto */
hover: background: #3da56a;

/* Secundário */
background: transparent;
border: 2px solid #2d7a4f;
color: #d4c5a0;                   /* Texto dourado */
hover: background: #1a4d2e;
```

### Títulos Premium
```css
h1 {
  color: #d4c5a0;                 /* Dourado */
  text-shadow: 0 0 20px #4ec98550; /* Glow verde sutil */
}

h2, h3 {
  color: #4ec985;                 /* Verde vibrante */
}
```

### Stats/Números
```css
.stat-number {
  font-family: 'JetBrains Mono';
  color: #d4c5a0;                 /* Dourado */
  font-weight: 700;
}
```

---

## 🔄 GRADIENTES MODERNOS

### Hero Background
```css
background: radial-gradient(
  ellipse at top,
  #1a4d2e20 0%,
  #0a0a0a 50%
);
```

### Card Hover
```css
background: linear-gradient(
  135deg,
  #0f3520 0%,
  #1a4d2e 100%
);
```

### Button Gradient (premium)
```css
background: linear-gradient(
  90deg,
  #3da56a 0%,
  #4ec985 50%,
  #d4c5a0 100%
);
```

---

## 📏 PROPORÇÕES DE USO

```
████████████████████████████████ (70%) Preto #0a0a0a
██████████                        (20%) Verde Escuro #1a4d2e/#0f3520  
███                               (5%)  Verde Médio #2d7a4f
███                               (5%)  Verde/Dourado Accent
```

---

## 🎯 RESULTADO ESPERADO

✅ Mantém visual tech/moderno (preto dominante)
✅ Incorpora verde do logo de forma elegante
✅ Dourado adiciona toque premium
✅ Gradientes criam profundidade
✅ Não fica "gritante" ou pesado
✅ Diferencia de concorrentes
✅ Cliente vê "o verde dele" sem comprometer design

---

## 🚀 PRÓXIMO PASSO

Implementar essa paleta nas páginas principais:
1. Home (hero, sections)
2. Restaurantes (cards)
3. Planos (pricing cards)
4. Navigation (hover states)

Quer que eu implemente essa paleta agora? 🎨
