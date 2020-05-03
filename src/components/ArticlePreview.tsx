import React, { FunctionComponent } from 'react';
import { Link } from '@reach/router';
import { ArticleResponse } from '../api/models';
import { isImg } from '../utils';

interface Props extends ArticleResponse {}

export const ArticlePreview: FunctionComponent<Props> = ({
  slug,
  title,
  description,
  author: { username, image },
  favoritesCount,
  createdAt,
}) => {
  return (
    <div className='article-preview'>
      <div className='article-meta'>
        <Link to={`/${username}`}>
          <img src={image || ''} alt={image || ''} />
        </Link>
        <div className='info'>
          <Link to={`/${username}`} className='author'>
            {username}
          </Link>
          <span className='date'>{createdAt}</span>
        </div>
        <button className='btn btn-outline-primary btn-sm pull-xs-right'>
          <i className='ion-heart'></i> {favoritesCount}
        </button>
      </div>
      <Link to={`/articles/${slug}`} className='preview-link'>
        <h1>{title}</h1>
        <p>{description}</p>
        <span>Read more...</span>
      </Link>
    </div>
  );
};
