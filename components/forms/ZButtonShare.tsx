'use client';

import { useState } from 'react';

export default function ZButtonShare() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      // 1. Get current URL
      const url = window.location.href;

      // 2. Try native mobile share first
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          url: url,
        });
      } else {
        // 3. Fallback to clipboard for Desktop
        await navigator.clipboard.writeText(url);
        setCopied(true);

        // Reset the button state after 2 seconds
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error('Share failed:', err);
    }
  };

  return (
    <button
      className={`btn btn-share ${copied ? 'btn-success' : ''}`}
      onClick={handleShare}
      disabled={copied}
    >
      {copied ? (
        <span>✅ Copied!</span>
      ) : (
        <span>
          <i className="bi bi-share me-2"></i> Share
        </span>
      )}
    </button>
  );
}