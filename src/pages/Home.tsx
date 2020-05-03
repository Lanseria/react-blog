import React, { FunctionComponent, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useOvermind } from '../store';
import { useMount } from 'react-use';
import { Tags } from '../components/Tags';
import { ArticleList } from '../components/ArticleList';
import { useQueryParam, StringParam } from 'use-query-params';

export const Home: FunctionComponent<RouteComponentProps> = () => {
  const [tag] = useQueryParam('tag', StringParam);
  const {
    state: {
      article: { tags, list, loading },
    },
    actions: {
      article: { loadTags, loadArticle, loadArticleByTag },
    },
  } = useOvermind();
  useMount(() => tags.length < 1 && loadTags());
  useEffect(() => {
    if (tag) {
      loadArticleByTag({ tag });
    } else {
      loadArticle(0);
    }
  }, [loadArticle, loadArticleByTag, tag]);
  return (
    <div className='home-page'>
      <div className='banner'>
        <div className='container'>
          <h1 className='logo-font'>conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className='container page'>
        <div className='row'>
          <div className='col-md-9'>
            <div className='feed-toggle'>
              <ul className='nav nav-pills outline-active'>
                <li className='nav-item'>
                  <a className='nav-link disabled' href=''>
                    Your Feed
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link active' href=''>
                    Global Feed
                  </a>
                </li>
              </ul>
            </div>
            <ArticleList loading={loading} articles={list}></ArticleList>
          </div>

          <div className='col-md-3'>
            <Tags tags={tags}></Tags>
          </div>
        </div>
      </div>
    </div>
  );
};
