import { take, select, put, call, fork, all } from 'redux-saga/effects';

import * as actions from './../actions';
import c from './../constants/';

const redditUrl = `http://www.reddit.com/r/vim/new.json?sort=new`;
const scrapeUrl = `https://job-news-scraper.herokuapp.com/scrapings`;
const hackernoonUrl = `https://medium.com/feed/@hackernoon`;
const hackerNewsUrl = `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`;

const fetchHackerNews = url => {
  try {
    const ids = fetch(url).then(res => res.json());
    return Promise.all(
      ids
        .slice(0, 30)
        .map(id =>
          fetch(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
          ).then(res => res.json())
        )
    );
  } catch (e) {
    console.warn('error', e);
    return e;
  }
};

const updateHNStories = stories => {
  try {
    return Promise.all(
      stories.map(async story => {
        if (!story.kids) return story;
        const kids = await Promise.all(
          story.kids.map(kid =>
            fetch(
              `https://hacker-news.firebaseio.com/v0/item/${kid}.json?print=pretty`
            ).then(res => res.json())
          )
        );
        return { ...story, kids };
      })
    );
  } catch (e) {
    return e;
  }
};

const fetchRedditItem = ({ children }) => {
  if (children.length) {
    return children.map(child => {
      if (child.children) {
        return fetchRedditItem(child);
      } else {
        return child.data;
      }
    });
  }
};

const fetchRedditArticles = url =>
  fetch(url)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.json().message);
      }
    })
    .then(json => fetchRedditItem(json.data));

const fetchRedditComments = url =>
  //TODO error is being thrown and caught but likely killing all results if
  //there's a single error ...
  fetch(url)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Response is not OK');
      }
    })
    .then(json => json.map(comment => fetchRedditItem(comment.data)));

const parseUrl = 'https://api.rss2json.com/v1/api.json?rss_url=';
const hackernoonArticles = url =>
  fetch(parseUrl + url)
    .then(res => res.json())
    .then(({ feed, items }) => ({ feed, items }));

function* fetchComments(articles) {
  try {
    const comments = yield all(
      articles.map(article => {
        const redditCommentsUrl = `https://www.reddit.com/r/vim/comments/${article.id}.json`;
        return call(fetchRedditComments, redditCommentsUrl);
      })
    );
    //Complicated destructuring here
    return comments.map(([[article], comments]) => {
      return {
        article,
        comments
      };
    });
  } catch (e) {
    return articles.map(article => ({ article, comments: [] }));
  }
}

function* getArticles(url) {
  try {
    const articles = yield call(fetchRedditArticles, url);
    const itemisedArticles = yield call(fetchComments, articles);
    yield put(actions.redditSuccess(itemisedArticles));
  } catch (e) {
    console.log('error', e);
    yield put(actions.redditFailure(e));
  }
}
function* getHackerNews(url) {
  try {
    const articles = yield call(fetchHackerNews, url);
    const updatedStories = yield call(updateHNStories, articles);
    yield put(actions.hackernewsSuccess(updatedStories));
  } catch (e) {
    yield put(actions.hackernewsFailure(e));
  }
}

function* initialFetch() {
  yield fork(getArticles, redditUrl);
}

function* getSubReddit() {
  yield take(c.FETCH_REDDIT);
  const subreddit = yield select(state => state.search);
  const redditUrl = `http://www.reddit.com/r/${subreddit}/new.json?sort=new`;
  yield fork(getArticles, redditUrl);
}

function* getHNArticles() {
  const hackernoon = yield call(hackernoonArticles, hackernoonUrl);
  try {
    yield put(actions.hackernoonSuccess(hackernoon));
  } catch (e) {
    yield put(actions.hackernoonFailure(e));
  }
}

export default function* root() {
  yield all([
    fork(initialFetch, redditUrl),
    fork(getHNArticles),
    fork(getSubReddit),
    fork(getHackerNews, hackerNewsUrl)
  ]);
}
