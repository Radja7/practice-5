import dayjs from 'dayjs';

export const getRandomIntegerNumber = (min, max) => (
  Math.floor(Math.random() * (max - min)) + min
);

export const getRandomIntegerNumberToFixed = (min, max, fixed) => (
  (Math.random() * (max - min) + min).toFixed(fixed)
);

export const getRandomDate = () => {
  const maxDaysGap = 36000;
  const daysGap = getRandomIntegerNumber(1, maxDaysGap);
  return dayjs().add(-daysGap, 'day').toDate();
};

export const trimText = (text, countWord) => {
  let sliced = text.slice(0,countWord);
  if (sliced.length < text.length) {
    sliced += '...';
  }
  return sliced;
};

// const getRandomDate = () => {
//   let randomDate = getRandomIntegerNumber(+new Date(1930, 0, 1) ,+new Date());
//   randomDate = new Date(randomDate * 1);
//
//   return randomDate;
// };
