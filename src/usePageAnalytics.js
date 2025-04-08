import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
const uuidv4 = () =>
  crypto.randomUUID ? crypto.randomUUID() : ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );


const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbyyeZXxOgCHJ8a-vUEy9NX8EBl6HpvCzrrWGFcYuGgrIU3ofenV_eExMcj-gdpGTTQ_cw/exec';
const GEO_API = 'https://ipapi.co/json/';

const RESTRICTED_REGIONS = ['California'];
const RESTRICTED_COUNTRIES = [
  'Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czechia',
  'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece',
  'Hungary', 'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg',
  'Malta', 'Netherlands', 'Poland', 'Portugal', 'Romania', 'Slovakia',
  'Slovenia', 'Spain', 'Sweden'
];


const usePageAnalytics = () => {
  const location = useLocation();
  const entryTimeRef = useRef(Date.now());
  const [pages, setPages] = useState([]);
  const [geo, setGeo] = useState(null);
  const sessionIdRef = useRef(sessionStorage.getItem('sessionId') || uuidv4());

  useEffect(() => {
    sessionStorage.setItem('sessionId', sessionIdRef.current);

    const cachedGeo = sessionStorage.getItem('geo');
    if (cachedGeo) {
      setGeo(JSON.parse(cachedGeo));
    } else {
      fetch(GEO_API)
        .then(res => res.json())
        .then(data => {
          const regionInfo = {
            region: data.region,
            country: data.country_name,
            ip: data.ip,
            allow:
              !RESTRICTED_REGIONS.includes(data.region) &&
              !RESTRICTED_COUNTRIES.includes(data.country_name)
          };
          sessionStorage.setItem('geo', JSON.stringify(regionInfo));
          setGeo(regionInfo);
        })
        .catch(() => {
          setGeo({ allow: false });
        });
    }
  }, []);

  useEffect(() => {
    const exitTime = Date.now();
    const duration = Math.round((exitTime - entryTimeRef.current) / 1000);
    const lastPath = sessionStorage.getItem('lastPath');

    if (lastPath) {
      setPages(prev => [...prev, { path: lastPath, duration }]);
    }

    sessionStorage.setItem('lastPath', location.pathname);
    entryTimeRef.current = Date.now();
  }, [location]);

  useEffect(() => {
    const handleUnload = () => {
      const exitTime = Date.now();
      const duration = Math.round((exitTime - entryTimeRef.current) / 1000);
      const currentPath = sessionStorage.getItem('lastPath');

      const fullPages = [
        ...pages,
        { path: currentPath, duration }
      ];

      const totalTime = fullPages.reduce((sum, p) => sum + p.duration, 0);
      const exitPage = fullPages.at(-1)?.path || '';

      if (!geo?.allow) return;

      const payload = {
        sessionId: sessionIdRef.current,
        referrer: document.referrer || 'Direct',
        userAgent: `${navigator.platform} / ${navigator.userAgent.split(' ')[0]}`,
        deviceType: /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
        screenSize: `${window.screen.width}x${window.screen.height}`,
        location: `${geo.region}, ${geo.country}`,
        ip: geo.ip,
        pages: fullPages,
        exitPage,
        totalTime
      };

      navigator.sendBeacon(WEBHOOK_URL, JSON.stringify(payload));
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [pages, geo]);
};

export default usePageAnalytics;