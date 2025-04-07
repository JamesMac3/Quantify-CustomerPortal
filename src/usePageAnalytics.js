// src/usePageAnalytics.js
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const GEO_API = 'https://ipapi.co/json/';
const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbyyeZXxOgCHJ8a-vUEy9NX8EBl6HpvCzrrWGFcYuGgrIU3ofenV_eExMcj-gdpGTTQ_cw/exec';

// Block by region/state
const restrictedRegions = ['California'];
const restrictedCountries = [
  'Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czechia',
  'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece',
  'Hungary', 'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg',
  'Malta', 'Netherlands', 'Poland', 'Portugal', 'Romania', 'Slovakia',
  'Slovenia', 'Spain', 'Sweden'
];

const usePageAnalytics = () => {
  const location = useLocation();
  const entryTimeRef = useRef(Date.now());
  const [geo, setGeo] = useState(null);

  useEffect(() => {
    const cached = sessionStorage.getItem('geo');
    if (cached) {
      setGeo(JSON.parse(cached));
      return;
    }

    fetch(GEO_API)
      .then(res => res.json())
      .then(data => {
        const region = {
          region: data.region,
          country: data.country_name,
          allow:
            !restrictedRegions.includes(data.region) &&
            !restrictedCountries.includes(data.country_name)
        };
        sessionStorage.setItem('geo', JSON.stringify(region));
        setGeo(region);
      })
      .catch(() => {
        setGeo({ allow: false }); // Block if lookup fails
      });
  }, []);

  useEffect(() => {
    const exitTime = Date.now();
    const duration = Math.round((exitTime - entryTimeRef.current) / 1000);
    const lastPath = sessionStorage.getItem('lastPath');

    if (lastPath && geo?.allow) {
      const payload = {
        path: lastPath,
        enteredAt: entryTimeRef.current,
        duration,
        location: `${geo.region}, ${geo.country}`,
        referrer: document.referrer || 'Direct'
      };

      navigator.sendBeacon(WEBHOOK_URL, JSON.stringify(payload));
    }

    sessionStorage.setItem('lastPath', location.pathname);
    entryTimeRef.current = Date.now();
  }, [location, geo]);
};

export default usePageAnalytics;
