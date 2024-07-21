export const breakpoints = {
  extraSmallPhone: 375,
  smallPhone: 400,
  phone: 435,
  tablet: 768,
  smallDesktop: 1024,
  desktop: 1280,
  middleDesktop: 1440,
  bigDesktop: 1650,
  largeDesktop: 1920,
};

export const maxQueries = {
  extraSmallPhone: `@media (max-width: ${breakpoints.extraSmallPhone - 0.02}px)`,
  smallPhone: `@media (max-width: ${breakpoints.smallPhone - 0.02}px)`,
  phone: `@media (max-width: ${breakpoints.phone - 0.02}px)`,
  tablet: `@media (max-width: ${breakpoints.tablet - 0.02}px)`,
  smallDesktop: `@media (max-width: ${breakpoints.smallDesktop - 0.02}px)`,
  desktop: `@media (max-width: ${breakpoints.desktop - 0.02}px)`,
  middleDesktop: `@media (max-width: ${breakpoints.middleDesktop - 0.02}px)`,
  bigDesktop: `@media (max-width: ${breakpoints.bigDesktop - 0.02}px)`,
  largeDesktop: `@media (max-width: ${breakpoints.largeDesktop - 0.02}px)`,
};

export const headerHeight = {
  default: '80px',
  [maxQueries.tablet]: '64px',
};
