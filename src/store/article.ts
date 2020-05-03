import { IState, AsyncAction } from 'overmind';
import { formatErrors } from '../utils';
import { ArticleResponse } from '../api/models';

interface State extends IState {
  loading: boolean;
  tags: string[];
  errors: string[];
  list: ArticleResponse[];
}

export const state: State = {
  loading: false,
  tags: [],
  errors: [],
  list: [],
};

const loadArticle: AsyncAction<number> = async ({ state, effects }, value) => {
  try {
    state.article.loading = true;
    const {
      data: { articles },
    } = await effects.getAllArticles(value);
    state.article.list = articles;
  } catch (err) {
    state.article.errors = formatErrors(err);
  } finally {
    state.article.loading = false;
  }
};

const loadArticleByTag: AsyncAction<{ tag: string; page?: number }> = async (
  { state, effects },
  { tag, page },
) => {
  try {
    state.article.loading = true;
    const {
      data: { articles },
    } = await effects.getArticlesByTag(tag, page);
    state.article.list = articles;
  } catch (err) {
    state.article.errors = formatErrors(err);
  } finally {
    state.article.loading = false;
  }
};

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

export const actions = { loadTags, loadArticle, loadArticleByTag };
