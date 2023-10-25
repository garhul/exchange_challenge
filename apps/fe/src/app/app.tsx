import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import theme from './theme/theme';
import { createGlobalStyle } from 'styled-components'
import MainView from './views/main/mainView';

const cli = new QueryClient();

const GlobalStyle = createGlobalStyle`
  body {
    background-color:${theme.colors.bg};
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }
`

export function App() {
  return (
    <QueryClientProvider client={cli}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <MainView />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
