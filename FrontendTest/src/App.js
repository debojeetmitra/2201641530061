import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoggingProvider } from '../../LoggingMiddleware/LoggingMiddleware';
import URLShortenerForm from './components/URLShortenerForm';
import RedirectHandler from './components/RedirectHandler';
import URLStats from './components/URLStats';

function App() {
  return (
    <LoggingProvider>
      <Router>
        <Routes>
          <Route path="/" element={<URLShortenerForm />} />
          <Route path="/stats/:shortcode" element={<URLStats />} />
          <Route path="/:shortcode" element={<RedirectHandler />} />
        </Routes>
      </Router>
    </LoggingProvider>
  );
}

export default App;
