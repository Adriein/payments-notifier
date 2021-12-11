export const BREAKPOINTS = {
  phone: 600,
  tablet: 950,
  laptop: 1300,
  bigLaptop: 1650,
};

export const QUERIES = {
  phoneAndSmaller: `(max-width: ${BREAKPOINTS.phone}px)`,
  tabletAndSmaller: `(max-width: ${BREAKPOINTS.tablet}px)`,
  laptopAndSmaller: `(max-width: ${BREAKPOINTS.laptop}px)`,
  bigLaptopAndSmaller: `(max-width: ${BREAKPOINTS.bigLaptop}px)`,
};

