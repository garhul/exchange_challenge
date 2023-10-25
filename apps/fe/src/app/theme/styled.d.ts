import 'styled-components';
import { CustomTheme } from './theme';

declare module 'styled-components' {
  export type DefaultTheme = CustomTheme
}