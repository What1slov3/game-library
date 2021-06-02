const host = 'https://api.rawg.io/api/';
const key = '6564bec1394b42538912568945fd05f4';

export const GET_GAMES_PATH = host + 'games?key=' + key;
export const GET_GAME = (slug) => {
  return host + `games/${slug}?key=${key}`;
};
export const GET_SCREENSHOTS = (slug) => {
  return host + `games/${slug}/screenshots?key=${key}`;
};
