import { take, put, call, fork } from 'redux-saga/effects';
import * as actions from './../actions';

const redditUrl = `http://www.reddit.com/r/vim/new.json?sort=new`;
const scrapeUrl = `https://job-news-scraper.herokuapp.com/scrapings`;

const fetchRedditArticles = url =>
  fetch(url)
    .then(res => res.json())
    .then(json => json.data.children.map(article => article.data));

function* getArticles() {
  const articles = yield call(fetchRedditArticles, redditUrl);
  try {
    yield put(actions.redditSuccess(articles));
  } catch (e) {
    yield put(actions.redditFailure(e));
  }
}

export default function*() {
  yield fork(getArticles);
}
