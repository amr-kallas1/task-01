// Define breakpoints manually
const breakpoints = {
  xs: "0px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

type ScreenType = keyof typeof breakpoints;

const getBreakpointValue = (value: ScreenType): number => {
  return parseInt(breakpoints[value], 10);
};

export const getCurrentBreakpoint = (): ScreenType => {
  let currentBreakpoint: ScreenType = "xs";
  let biggestBreakpointValue = 0;

  for (const breakpoint of Object.keys(breakpoints)) {
    const breakpointValue = getBreakpointValue(breakpoint as ScreenType);
    if (
      breakpointValue > biggestBreakpointValue &&
      window.innerWidth >= breakpointValue
    ) {
      biggestBreakpointValue = breakpointValue;
      currentBreakpoint = breakpoint as ScreenType;
    }
  }

  return currentBreakpoint;
};
