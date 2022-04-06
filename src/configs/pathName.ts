function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}
const ROOTS_AUTH = '/auth';
const ROOTS = '/';
const ROOTS_VIDEOS = '/videos';
const ROOTS_ARTICLE = '/articles';

export const PATH_HOME = {
  root: ROOTS,
};

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify'),
};

export const PATH_VIDEOS = {
  root: ROOTS_VIDEOS,
  videos: path(ROOTS_VIDEOS, ''),
  video: path(ROOTS_VIDEOS, '/video/:id'),
};
export const PATH_ARTICLE = {
  root: ROOTS_ARTICLE,
  articles: path(ROOTS_ARTICLE, ''),
  article: path(ROOTS_ARTICLE, '/article/:id'),
};
