'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

const MEASUREMENT_ID = 'G-FSP3TS86H8';
const DISABLE_KEY = `ga-disable-${MEASUREMENT_ID}` as const;
const CONSENT_EVENTS = [
  'CookiebotOnConsentReady',
  'CookiebotOnAccept',
  'CookiebotOnDecline',
];

declare global {
  interface Window {
    Cookiebot?: { consent?: { statistics?: boolean } };
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    'ga-disable-G-FSP3TS86H8'?: boolean;
  }
}

export default function ConsentGoogleAnalytics() {
  const [canLoad, setCanLoad] = useState(false);
  const initialized = useRef(false);
  const wasGranted = useRef(false);

  useEffect(() => {
    function syncConsent() {
      const granted = window.Cookiebot?.consent?.statistics === true;

      // Removing a script cannot unload GA. Disable collection synchronously,
      // including when consent changes while the library is still downloading.
      window[DISABLE_KEY] = !granted;

      if (granted && !initialized.current) {
        window.dataLayer = window.dataLayer || [];
        window.gtag = window.gtag || function () {
          // Google's queue uses the arguments object, rather than an event object.
          // eslint-disable-next-line prefer-rest-params
          window.dataLayer!.push(arguments);
        };
        window.gtag('consent', 'default', {
          analytics_storage: 'denied',
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
        });
        window.gtag('consent', 'update', { analytics_storage: 'granted' });
        window.gtag('js', new Date());
        window.gtag('config', MEASUREMENT_ID, {
          allow_google_signals: false,
          allow_ad_personalization_signals: false,
        });
        initialized.current = true;
        setCanLoad(true);
      } else if (initialized.current && granted !== wasGranted.current) {
        window.gtag?.('consent', 'update', {
          analytics_storage: granted ? 'granted' : 'denied',
        });
        if (granted) {
          window.gtag?.('event', 'page_view', {
            send_to: MEASUREMENT_ID,
            page_location: window.location.href,
            page_title: document.title,
          });
        }
      }

      wasGranted.current = granted;
    }

    CONSENT_EVENTS.forEach((event) => window.addEventListener(event, syncConsent));
    syncConsent();
    return () => {
      CONSENT_EVENTS.forEach((event) => window.removeEventListener(event, syncConsent));
    };
  }, []);

  if (!canLoad) return null;

  return (
    <Script
      id="pks-google-analytics"
      src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
      strategy="afterInteractive"
      // Consent is explicitly enforced above, independently of Cookiebot scans.
      data-cookieconsent="ignore"
    />
  );
}
