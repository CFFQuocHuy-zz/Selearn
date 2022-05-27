import { Suspense } from 'react';
import { BackdropLoading } from './components';
import { AppShell } from './modules';
import { AppProvider } from './provider';

const App = () => {
  return (
    <Suspense fallback={<BackdropLoading />}>
      <AppProvider>
        <AppShell />
      </AppProvider>
    </Suspense>
  );
};

export default App;
