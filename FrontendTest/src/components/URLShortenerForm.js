import React, { useState, useEffect } from 'react';
import { useLogging } from '../../../LoggingMiddleware/LoggingMiddleware';
import { Link } from 'react-router-dom';

// Helper function to generate a random shortcode
function generateShortcode(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Validate shortcode format
function isValidShortcode(code) {
  const regex = /^[a-zA-Z0-9]{4,10}$/;
  return regex.test(code);
}

export default function URLShortenerForm() {
  const { log } = useLogging();

  const [originalUrl, setOriginalUrl] = useState('');
  const [customShortcode, setCustomShortcode] = useState('');
  const [validity, setValidity] = useState(30); // default 30 minutes
  const [error, setError] = useState('');
  const [urls, setUrls] = useState(() => {
    // Load from localStorage or initialize empty
    const saved = localStorage.getItem('shortenedUrls');
    return saved ? JSON.parse(saved) : [];
  });

  // Save urls to localStorage on change
  useEffect(() => {
    localStorage.setItem('shortenedUrls', JSON.stringify(urls));
  }, [urls]);

  // Check shortcode uniqueness
  function isUniqueShortcode(code) {
    return !urls.some((u) => u.shortcode === code);
  }

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!originalUrl) {
      setError('Original URL is required.');
      return;
    }

    let shortcode = customShortcode.trim();

    if (shortcode) {
      if (!isValidShortcode(shortcode)) {
        setError('Custom shortcode must be alphanumeric and 4-10 characters long.');
        return;
      }
      if (!isUniqueShortcode(shortcode)) {
        setError('Custom shortcode is already in use.');
        return;
      }
    } else {
      // Generate unique shortcode
      do {
        shortcode = generateShortcode();
      } while (!isUniqueShortcode(shortcode));
    }

    const createdAt = Date.now();
    const validityMs = validity * 60 * 1000; // convert minutes to ms
    const expiresAt = createdAt + validityMs;

    const newEntry = {
      originalUrl,
      shortcode,
      createdAt,
      expiresAt,
      clicks: 0,
    };

    setUrls((prev) => [...prev, newEntry]);
    log(`Created short URL: ${shortcode} for ${originalUrl} with validity ${validity} minutes`);

    // Clear form
    setOriginalUrl('');
    setCustomShortcode('');
    setValidity(30);
  }

  return (
    <div>
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Original URL:</label>
          <input
            type="url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Custom Shortcode (optional):</label>
          <input
            type="text"
            value={customShortcode}
            onChange={(e) => setCustomShortcode(e.target.value)}
            placeholder="4-10 alphanumeric chars"
          />
        </div>
        <div>
          <label>Validity (minutes):</label>
          <input
            type="number"
            value={validity}
            onChange={(e) => setValidity(Number(e.target.value))}
            min="1"
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Shorten URL</button>
      </form>

      <h2>Shortened URLs</h2>
      <ul>
        {urls.map(({ shortcode, originalUrl, createdAt, expiresAt, clicks }) => {
          const isExpired = Date.now() > expiresAt;
          return (
            <li key={shortcode}>
              <a href={`/${shortcode}`} target="_blank" rel="noopener noreferrer">
                {window.location.origin}/{shortcode}
              </a>{' '}
              - {originalUrl} - Clicks: {clicks} -{' '}
              {isExpired ? (
                <span style={{ color: 'red' }}>Expired</span>
              ) : (
                <span>Valid</span>
              )}{' '}
              - <Link to={`/stats/${shortcode}`}>Stats</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
