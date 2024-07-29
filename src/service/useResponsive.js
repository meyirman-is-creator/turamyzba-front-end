import { useState, useEffect } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

const useResponsive = (breakpoints) => {
  const { width } = useWindowSize();
  const [activeBreakpoint, setActiveBreakpoint] = useState(null);

  useEffect(() => {
    const currentBreakpoint = breakpoints.find((breakpoint) => width <= breakpoint.width);
    setActiveBreakpoint(currentBreakpoint ? currentBreakpoint.name : null);
  }, [width, breakpoints]);

  return activeBreakpoint;
};

export default useResponsive;
