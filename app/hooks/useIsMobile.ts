import { useEffect, useState } from 'react';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = /Mobi|Android/i.test(navigator.userAgent);
    setIsMobile(check);
  }, []);

  return isMobile;
}
