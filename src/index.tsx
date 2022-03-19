import { render } from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { PlayerProvider } from './hooks/context';
import Home from './pages/home/Home';
import Layout from './pages/layout/Layout';
import Room from './pages/room/Room';

import './assets/styles/app.css';

const NODE_APP = document.getElementById('killerparty');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const Application = (): JSX.Element => (
  <QueryClientProvider client={queryClient}>
    <PlayerProvider>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/room">
              <Route path=":roomCode" element={<Room />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Layout>
    </PlayerProvider>
  </QueryClientProvider>
);

render(<Application />, NODE_APP);
