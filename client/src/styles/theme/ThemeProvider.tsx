import * as React from 'react';
import { ThemeProvider as OriginalThemeProvider } from 'styled-components';
import { useThemeSlice } from './slice';
import { selectTheme } from './slice/selectors';
import { useAppSelector } from 'store/hooks';

export const ThemeProvider = (props: { children: React.ReactChild }) => {
  useThemeSlice();

  const theme = useAppSelector(selectTheme);
  return (
  <>
</>
  );
};
