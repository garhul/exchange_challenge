import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import MainView from './views/main/mainView';

const cli = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={cli}>
      <ThemeProvider theme={theme}>
        <MainView />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
