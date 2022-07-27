import { MantineProvider } from '@mantine/core';
import { Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';

import ModalProvider from './providers/modal';

import LocationPicker from './scenes/LocationPicker';

const App = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<LocationPicker />} />
        </Route>
      </Routes>
      <ModalProvider />
    </MantineProvider>
  );
};

export default App;
