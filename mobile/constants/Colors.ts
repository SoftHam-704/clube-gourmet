/**
 * Design System: Club Empar — Dark Gold
 * Alinhado com o site web
 */

const primaryGold = '#c9a961';
const secondaryGold = '#d4c5a0';
const backgroundObsidian = '#0a0a0a';
const surfaceDark = '#131313';
const textMain = '#e5e2e1';
const textMuted = '#d4c5a0';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: primaryGold,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: primaryGold,
  },
  dark: {
    text: textMain,
    background: backgroundObsidian,
    surface: surfaceDark,
    tint: primaryGold,
    secondary: secondaryGold,
    icon: textMuted,
    tabIconDefault: '#444',
    tabIconSelected: primaryGold,
    border: '#2a2a2a',
    card: surfaceDark,
  },
};

export const Typography = {
  header: 'SpaceGrotesk_700Bold',
  body: 'Manrope_400Regular',
  label: 'SpaceGrotesk_500Medium',
  mono: 'JetBrainsMono_400Regular',
};
