import React from 'react';
import './Common.css';

const Result = ({ plans, sort }) => {
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
        <button className="ui button active" onClick={() => sort('duration')}>移動時間の短い順</button>
        <button className="ui button" onClick={() => sort('price')}>安い順</button>
        <button className="ui button" onClick={() => sort('evaluation')}>評価の高い順</button>
      </div>
      <div className="ui cards">
        {results}
      </div>
    </>
  )
}

export default Result;
