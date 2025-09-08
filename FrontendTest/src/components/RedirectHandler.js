import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLogging } from '../../../LoggingMiddleware/LoggingMiddleware';

export default function RedirectHandler() {
  const { shortcode } = useParams();
  const { log } = useLogging();
  const [redirectUrl, setRedirectUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('shortenedUrls');
    if (!saved) {
      setError('No URLs found.');
      log(`Redirection failed: No URLs stored for shortcode ${shortcode}`);
      return;
    }

    const urls = JSON.parse(saved);
    const entryIndex = urls.findIndex((u) => u.shortcode === shortcode);

    if (entryIndex === -1) {
      setError('Shortcode not found.');
      log(`Redirection failed: Shortcode ${shortcode} not found`);
      return;
    }

    const entry = urls[entryIndex];
    const now = Date.now();

    if (now > entry.expiresAt) {
      setError('Short URL has expired.');
      log(`Redirection failed: Shortcode ${shortcode} expired`);
      return;
    }

    // Increment click count
    urls[entryIndex].clicks += 1;
    localStorage.setItem('shortenedUrls', JSON.stringify(urls));
    setRedirectUrl(entry.originalUrl);
    log(`Redirecting shortcode ${shortcode} to ${entry.originalUrl}`);
  }, [shortcode, log]);

  if (error) {
    return <div><h2>Error</h2><p>{error}</p></div>;
  }

  if (redirectUrl) {
    window.location.href = redirectUrl;
    return null;
  }

  return <div>Redirecting...</div>;
}
