import { MINUTES_IN_HOUR } from '../const';
import { getRandomIntegerNumber, getRandomIntegerNumberToFixed, getRandomDate } from '../utils/common.js';

const UrlItems = [
  './images/posters/the-dance-of-life.jpg',
  './images/posters/made-for-each-other.png',
  './images/posters/popeye-meets-sinbad.png',
  './images/posters/sagebrush-trail.jpg',
  './images/posters/santa-claus-conquers-the-martians.jpg',
  './images/posters/the-great-flamarion.jpg',
  './images/posters/the-man-with-the-golden-arm.jpg',
];

const NameItems = [
  'The Dance of Life',
  'Sagebrush Trail',
  'The Man with the Golden Arm',
  'Santa Claus Conquers the Martians',
  'Popeye the Sailor Meets Sindbad the Sailor',
  'The Great Flamarion',
  'Made for Each Other',
];

const OriginalNameItems = [
  'The Great Flamarion',
  'Made for Each Other',
  'Santa Claus Conquers the Martians',
];

const GenreItems = [
  'Musical',
  'Western',
  'Drama',
  'Comedy',
  'Cartoon',
  'Mystery',
];

const DescriptionItems = [
  'Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr. Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll)',
  'The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Grea. The film opens following a murder at a cabaret in Mexico City',
  'The Martians Momar ("Mom Martian") and Kimar ("King Martian") are worried that their children Girmar ("Girl Martian") and Bomar ("Boy Marti. The Martians Momar ("Mom Martian") and Kimar',
  'John Mason (James Stewart) is a young, somewhat timid attorney in New York City. He has been doing his job well, and he has a chance of bei. John Mason (James Stewart) is a young',
  'Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on. Frankie Machine (Frank Sinatra) is released from the federal Narcotic',
];

const CommentItems = [
  'Very very old. Meh',
  'Almost two hours? Seriously?',
  'Interesting setting and a good cast',
];

const AgeRatingItems = [
  '14+',
  '16+',
  '18+',
  '21+',
];

const directorItems = [
  'Anthony Mann',
  'Quentin Tarantino',
  'Guillermo del Toro',
  'George Miller',
  'Lana Wachowski',
];

const WriterList = [
  'Anne Wigton, Heinz Herald, Richard Weil',
  'Fedor Bondarchuk, Heinz Herald, Richard Weil',
  'Aleksey Sidorov, Heinz Herald',
];

const ActorList = [
  'Erich von Stroheim, Mary Beth Hughes, Dan Duryea',
  'Johnny Depp, Dan Duryea, Erich von Stroheim',
  'Scarlett Johansson, Mary Beth Hughes, Dan Duryea',
];

const CountryItems = [
  'USA',
  'Russian',
  'Tyrkey',
  'France',
];

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomArray = (array, count) => {
  const newArr = [];
  const oldArr = array.slice();
  for(let i = 0; i < count; i++) {
    const randomIndex = getRandomIntegerNumber(0, oldArr.length);

    newArr.push(oldArr[randomIndex]);
    oldArr.splice(randomIndex, 1);
  }
  return newArr;
};


const generateDurationFilm = () => {
  const durationFilm = getRandomIntegerNumber(0, 240);

  if((durationFilm >= MINUTES_IN_HOUR) && (durationFilm % MINUTES_IN_HOUR === 0)) {
    const hours = parseInt((durationFilm / MINUTES_IN_HOUR), 10);
    return `${hours}h`;
  } else if((durationFilm > MINUTES_IN_HOUR) && (durationFilm % MINUTES_IN_HOUR !== 0))  {
    const hours = parseInt((durationFilm / MINUTES_IN_HOUR), 10);
    const minutes = durationFilm % MINUTES_IN_HOUR;
    return `${hours}h ${minutes}m`
  } else {
    return `${parseInt(durationFilm, 10)}m`;
  }
};

const generateFilmCard = () => {
  return {
    ageRating: getRandomArrayItem(AgeRatingItems),
    originalName: getRandomArrayItem(OriginalNameItems),
    director: getRandomArrayItem(directorItems),
    writers: getRandomArrayItem(WriterList),
    actors: getRandomArrayItem(ActorList),
    country: getRandomArrayItem(CountryItems),
    releaseDate: getRandomDate(),

    posterURL: getRandomArrayItem(UrlItems),
    name: getRandomArrayItem(NameItems),
    rating: getRandomIntegerNumberToFixed(0, 10, 1),
    year: getRandomIntegerNumber(1930, 2021),
    duration: generateDurationFilm(),
    genre: getRandomArray(GenreItems, 3),
    description: getRandomArrayItem(DescriptionItems),
    commentsCount: getRandomIntegerNumber(0, 99),
    isWatchlist: Math.random() > 0.5,
    isWatched: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
  };
};

//console.log(generateFilmCard());

const generateFilmCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilmCard);
};

export {generateFilmCard, generateFilmCards};
