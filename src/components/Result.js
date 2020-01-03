import React from 'react';
import './Common.css';

const Result = ({ plans, error, sort }) => {
  if (error) {
    return (
      <div className="wrapper">
        <div class="ui warning message">
          <i class="close icon"></i>
          <div class="header">
            エラーが発生しました。
          </div>
          検索条件を見直すか、管理者にお問い合わせください。
        </div>
      </div>
    );
  }
  if (!plans) {
    return <div>検索してください</div>;
  }

  const results = plans.map(plan => {
    return (
      <div className="wrapper">
        <div className="card radius shadowDepth1">
          <div className="card__image border-tlr-radius">
            <img src={plan.image_url} alt={plan.name} className="border-tlr-radius"/>
          </div>

          <div className="card__content card__padding">
            <div className="card__meta">
              <span>{plan.prefecture}</span>
              <time>{plan.price+'円'}</time>
            </div>

            <article className="card__article">
              <h2>{plan.name}</h2>

              <p>{plan.caption}</p>
            </article>
          </div>
        </div>
      </div>
    )
  });

  return (
    <>
      <div className="ui buttons center aligned">
        <button className="ui button active" onClick={() => sort('duration', 'asc')}>移動時間の短い順</button>
        <button className="ui button" onClick={() => sort('price', 'asc')}>安い順</button>
        <button className="ui button" onClick={() => sort('evaluation', 'desc')}>評価の高い順</button>
      </div>
      <div className="ui cards">
        {results}
      </div>
    </>
  )
}

export default Result;
