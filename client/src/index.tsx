import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.scss';
import { Layout } from './pages/layout';
import { LookupPage } from './pages/lookup-page';
import { HomePage } from './pages/home-page';
import { NotFoundPage } from './pages/not-found-page';
import { ChartsPage } from './pages/charts-page';
import { ChartPage } from './pages/chart-page';
import { ConfigPage } from './pages/config-page';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Layout />}>
          <Route path="/" element={ <HomePage />} />
          <Route path="lookup" element={ <LookupPage />} />
          <Route path="charts" element={ <ChartsPage />} />
          <Route path="charts/:chart_id" element={ <ChartPage />} />
          <Route path="config" element={ <ConfigPage />} />
          <Route path="*" element={ <NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
