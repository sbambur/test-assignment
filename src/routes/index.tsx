import { Routes, Route } from 'react-router-dom';

import Layout from '@/layouts/main';
import Home from '@/pages/Home';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}
