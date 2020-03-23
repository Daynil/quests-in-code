import React from 'react';

export const BaseColors = {
  grey: {
    100: '#F6F7F9',
    200: '#E7EBEF',
    300: '#D9DFE6',
    400: '#BDC6D3',
    500: '#A0AEC0',
    600: '#909DAD',
    700: '#606873',
    800: '#484E56',
    900: '#30343A'
  },
  teal: {
    100: '#EBF7F7',
    200: '#CDECEA',
    300: '#AFE0DE',
    400: '#74C9C5',
    500: '#38B2AC',
    600: '#32A09B',
    700: '#226B67',
    800: '#19504D',
    900: '#113534'
  }
};

export const Themes = {
  light: {
    type: 'light' as ThemeType,
    primary: BaseColors.teal[500],
    background: '#fff',
    font: BaseColors.grey[900],
    fontSecondary: BaseColors.grey[700]
  },
  dark: {
    type: 'dark' as ThemeType,
    primary: BaseColors.teal[500],
    background: BaseColors.grey[900],
    font: BaseColors.grey[100],
    fontSecondary: BaseColors.grey[400]
  }
};

export type ThemeType = 'light' | 'dark';
export type Theme = typeof Themes.light;

export const Media = {
  sm: { minWidth: '640px' },
  md: { minWidth: '768px' },
  lg: { minWidth: '1024px' },
  xl: { minWidth: '1280px' }
};

const startingTheme: Theme = Themes['light'];

export const ThemeContext = React.createContext(startingTheme);
