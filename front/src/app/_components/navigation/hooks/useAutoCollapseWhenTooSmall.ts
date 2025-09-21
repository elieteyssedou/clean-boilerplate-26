import { debounce } from 'lodash';
import { useEffect } from 'react';

interface Params {
  navBarCollapsed: boolean;
  setNavBarCollapsed: (value: boolean) => void;
}

// Correspond to the md breakpoint in Tailwind CSS
const minSize = 768;

const useAutoCollapseWhenTooSmall = ({ navBarCollapsed, setNavBarCollapsed }: Params) => {
  useEffect(() => {
    const handleResize = debounce(() => {
      if (window.innerWidth < minSize && !navBarCollapsed) {
        setNavBarCollapsed(true);
      }
    }, 200);

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      handleResize.cancel();
    };
  }, [navBarCollapsed, setNavBarCollapsed]);
};

export default useAutoCollapseWhenTooSmall;
