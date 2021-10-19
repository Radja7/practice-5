const generateNav = () => {
  return [{
    text: 'all movies',
    name: 'all',
    count: false,
  }, {
    name: 'watchlist',
    count: 13,
  }, {
    name: 'history',
    count: 4,
  }, {
    name: 'favorites',
    count: 8,
  }];
};

const generateNavAdditional = () => {
  return [{
    name: 'stats',
  }];
};

export {generateNav, generateNavAdditional}
