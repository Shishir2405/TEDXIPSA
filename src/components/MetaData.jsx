// components/MetaHead.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useMetadata } from '../hooks/useMetadata';

const MetaHead = () => {
  const location = useLocation();
  const { metadata, loading } = useMetadata({
    path: 'metadata',
    realtime: true
  });

  // Default metadata
  const defaultMeta = {
    title: 'TEDx IPSA',
    description: 'Welcome to TEDx IPSA',
    keywords: 'TEDx, IPSA, talks, events, ideas',
    ogTitle: 'TEDx IPSA',
    ogDescription: 'Welcome to TEDx IPSA',
    ogImage: '/logo/white_logo.png',
    twitterCard: 'summary_large_image',
    twitterTitle: 'TEDx IPSA',
    twitterDescription: 'Welcome to TEDx IPSA',
    twitterImage: '/logo/white_logo.png',
  };

  // Use route-specific metadata if available, otherwise use default
  const currentMeta = metadata?.route === location.pathname ? metadata : defaultMeta;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang="en" />
      <meta charSet="UTF-8" />
      <title>{currentMeta.title}</title>
      <meta name="description" content={currentMeta.description} />
      {currentMeta.keywords && (
        <meta name="keywords" content={currentMeta.keywords} />
      )}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Favicon */}
      <link rel="icon" type="image/svg+xml" href="/logo/white_logo.png" />

      {/* Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
        rel="stylesheet"
      />

      {/* Open Graph Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={currentMeta.ogTitle || currentMeta.title} />
      <meta 
        property="og:description" 
        content={currentMeta.ogDescription || currentMeta.description} 
      />
      {currentMeta.ogImage && (
        <meta property="og:image" content={currentMeta.ogImage} />
      )}
      <meta property="og:site_name" content="TEDx IPSA" />
      <meta property="og:url" content={window.location.href} />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content={currentMeta.twitterCard} />
      <meta 
        name="twitter:title" 
        content={currentMeta.twitterTitle || currentMeta.title} 
      />
      <meta 
        name="twitter:description" 
        content={currentMeta.twitterDescription || currentMeta.description} 
      />
      {currentMeta.twitterImage && (
        <meta name="twitter:image" content={currentMeta.twitterImage} />
      )}

      {/* Custom Styles */}
      <style type="text/css">{`
        body {
          font-family: 'Inter', serif;
        }
      `}</style>
    </Helmet>
  );
};

export default MetaHead;