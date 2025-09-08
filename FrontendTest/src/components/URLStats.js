import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLogging } from '../../../LoggingMiddleware/LoggingMiddleware';

export default function URLStats() {
  const { shortcode } = useParams();
  const { log } = useLogging();
  const [urlData, setUrlData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('shortenedUrls');
    if (!saved) {
      setError('No URLs found.');
      log(`Stats view failed: No URLs stored for shortcode ${shortcode}`);
      return;
    }

    const urls = JSON.parse(saved);
    const entry = urls.find((u) => u.shortcode === shortcode);

    if (!entry) {
      setError('Shortcode not found.');
      log(`Stats view failed: Shortcode ${shortcode} not found`);
      return;
    }

    setUrlData(entry);
    log(`Stats viewed for shortcode ${shortcode}`);
  }, [shortcode, log]);

  if (error) {
    return <div><h2>Error</h2><p>{error}</p></div>;
  }

  if (!urlData) {
    return <div>Loading...</div>;
  }

  const { originalUrl, createdAt, expiresAt, clicks } = urlData;
  const isExpired = Date.now() > expiresAt;

  return (
    <div>
      <h1>Statistics for {shortcode}</h1>
      <p><strong>Original URL:</strong> <a href={originalUrl} target="_blank" rel="noopener noreferrer">{originalUrl}</a></p>
      <p><strong>Created At:</strong> {new Date(createdAt).toLocaleString()}</p>
      <p><strong>Expires At:</strong> {new Date(expiresAt).toLocaleString()}</p>
      <p><strong>Status:</strong> {isExpired ? <span style={{ color: 'red' }}>Expired</span> : 'Valid'}</p>
      <p><strong>Clicks:</strong> {clicks}</p>
      <Link to="/">Back to URL Shortener</Link>
    </div>
  );
}
