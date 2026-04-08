/**
 * Design System: The Neon Sommelier / Neon Nocturne
 * Adaptado para React Native
 */

const primaryNeon = '#00ff88';
const secondaryCoral = '#d4004b';
const backgroundObsidian = '#0a0a0a';
const surfaceDark = '#131313';
const textMain = '#e5e2e1';
const textMuted = '#b9cbb9';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: primaryNeon,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: primaryNeon,
  },
  dark: {
    text: textMain,
    background: backgroundObsidian,
    surface: surfaceDark,
    tint: primaryNeon,
    secondary: secondaryCoral,
    icon: textMuted,
    tabIconDefault: '#444',
    tabIconSelected: primaryNeon,
    border: '#333',
    card: surfaceDark,
  },
};

export const Typography = {
  header: 'SpaceGrotesk_700Bold',
  body: 'Manrope_400Regular',
  label: 'SpaceGrotesk_500Medium',
  mono: 'JetBrainsMono_400Regular',
};
