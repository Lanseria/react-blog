import {
  IState,
  AsyncAction,
  Derive,
  Action,
  Operator,
  pipe,
  mutate,
  when,
  noop,
} from 'overmind';
import { formatErrors, appendToMap, arrayToMap } from '../utils';
import { ArticleResponse } from '../api/models';

type CurrentFeed = {
  type: string;
  page: number;
  tag?: string;
  author?: string;
} & (
  | {
      type: 'all' | 'favorite' | 'feed';
      page: number;
    }
  | { type: 'tag'; page: number; tag: string }
  | {
      type: 'author';
      page: number;
      author: string;
    }
);

interface State extends IState {
  loading: boolean;
  tags: string[];
  errors: string[];
  list: Derive<State, ArticleResponse[]>;
  db: {
    [key: string]: ArticleResponse;
  };
  feeds: {
    all: Partial<Array<string[]>>;
    favorite: Partial<Array<string[]>>;
    feed: Partial<Array<string[]>>;
    author: Partial<Array<string[]>>;
    tag: Partial<Array<string[]>>;
    current: CurrentFeed;
  };
}

export const state: State = {
  loading: false,
  tags: [],
  errors: [],
  list: (state) => {
    const { page, type } = state.feeds.current;
    if (['all', 'author', 'favorite', 'feed', 'tag'].includes(type)) {
      return state.feeds[type][page]?.map((slug) => state.db[slug]) || [];
    }
    return [];
  },
  db: {},
  feeds: {
    all: [[]],
    favorite: [[]],
    feed: [[]],
    author: [[]],
    tag: [[]],
    current: {
      type: 'all',
      page: 0,
    },
  },
};

const loadArticle: AsyncAction<CurrentFeed> = async (
  { state, effects },
  { page, type, tag, author },
) => {
  const request = {
    all: () => effects.getAllArticles(page),
    feed: () => effects.getFeed(page),
    author: () => author && effects.getArticlesByAuthor(author, page),
    favorite: () =>
      state.auth.currentUser?.username &&
      effects.getArticlesByFavorited(state.auth.currentUser?.username, page),
    tag: () => tag && effects.getArticlesByTag(tag, page),
  }[type];
  try {
    const response = await request();
    state.article.loading = true;
    if (response) {
      const {
        data: { articles },
      } = response;
      state.article.db = appendToMap(
        state.article.db,
        arrayToMap(articles, 'slug'),
      );
      state.article.feeds[type][page] = articles.map((article) => article.slug);
    }
  } catch (err) {
    state.article.errors = formatErrors(err);
  } finally {
    state.article.loading = false;
  }
};

const setCurrentFeed: Action<CurrentFeed> = ({ state }, value) => {
  state.article.feeds.current = value;
};

const resetFeed: Action<CurrentFeed> = ({ state }, { type }) => {
  state.article.feeds[type] = [[]];
};

const setCurrentPage: Operator<CurrentFeed> = pipe(
  when(({ state }, { tag }) => state.article.feeds.current.tag !== tag, {
    true: mutate(resetFeed),
    false: mutate(noop),
  }),
  when(
    ({ state }, { author }) => state.article.feeds.current.author !== author,
    {
      true: mutate(resetFeed),
      false: mutate(noop),
    },
  ),
  mutate(setCurrentFeed),
  when(
    ({ state }, { type, page }) => !state.article.feeds[type][page]?.length,
    {
      true: mutate(loadArticle),
      false: mutate(noop),
    },
  ),
);

const loadTags: AsyncAction = async ({ state, effects }) => {
  try {
    const {
      data: { tags },
    } = await effects.getTags();
    state.article.tags = tags;
  } catch (err) {
    state.article.errors = formatErrors(err);
  }
};

export const actions = {
  loadTags,
  setCurrentPage,
};
