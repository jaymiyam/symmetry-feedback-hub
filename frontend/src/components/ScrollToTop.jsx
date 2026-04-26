import { useEffect } from 'react';
import { useLocation } from 'react-router';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Immediately jump to the top left of the document
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;
