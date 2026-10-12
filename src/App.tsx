import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layout/MainLayout';
import { Home } from './pages/Home';
import { OceanZones } from './pages/OceanZones';
import { MarineLife } from './pages/MarineLife';
import { DeepSeaCreatures } from './pages/DeepSeaCreatures';
import { Exploration } from './pages/Exploration';
import { Conservation } from './pages/Conservation';
import { Gallery } from './pages/Gallery';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/ocean-zones" element={<OceanZones />} />
          <Route path="/marine-life" element={<MarineLife />} />
          <Route path="/deep-sea-creatures" element={<DeepSeaCreatures />} />
          <Route path="/exploration" element={<Exploration />} />
          <Route path="/conservation" element={<Conservation />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
