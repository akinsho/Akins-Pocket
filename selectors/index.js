import { createSelector } from 'reselect';
import * as c from './../constants';

export const getHackernoon = hackernoon => hackernoon;

export const getHackernoonSelector = createSelector(
  [getHackernoon],
  articles => articles
);

export const getReddit = reddit => reddit;

export const getRedditSelector = createSelector(
  [getReddit],
  articles => articles
);
