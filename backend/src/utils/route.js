import read from './read.js';

export async function route(url) {
  switch (url) {
    case '/':
    case '/home':
      return await read('./src/page/home.html');
    default:
      return '<h1>404 Not Found</h1>';
  }
}
