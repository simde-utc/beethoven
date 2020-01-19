import React from "react";
import PropTypes from "prop-types";
import { Article as ArticleModel } from "../../models";

const ArticlesManager = ({ articles, onClick }) => {
  if(!articles) {
    return null;
  }

  return (
    <div className="articles-manager">
      {
        articles.map(article => (
          <Article
            key={ article.getKey() }
            article={article}
            onClick={onClick}
            />
        ))
      }
    </div>
  );
}

ArticlesManager.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.instanceOf(ArticleModel)),
  onClick: PropTypes.func.isRequired
}

ArticlesManager.defaultProps = {
  articles: [],
}

const Article = ({ article, onClick }) => {
  return (
    <div className="article-item" onClick = { () => onClick(article) }>
      {
        article.getImageURL() ?
        <img src={ article.getImageURL() } alt={ article.getName() }/>
        : <div className="no-image">{ article.getName() }</div>
      }
    </div>
  );
}

Article.propTypes = {
  article: PropTypes.instanceOf(ArticleModel).isRequired,
  onClick: PropTypes.func.isRequired
}

export default ArticlesManager;
