import React from 'react';
import './css/Common.css';

const Result = ({ plans, error, planCount, planSortType, changeState }) => {
  const planSort = (type, sortOrder) => {
    plans.sort((plan1, plan2) => {
      if (plan1[type] < plan2[type]) {
        return sortOrder === 'asc' ? -1 : 1
      }
      if (plan1[type] > plan2[type]) {
        return sortOrder === 'asc' ? 1 : -1
      }
      return 0
    })
    changeState('plans', plans)
    changeState('planSortType', type)
  }

  if (error) {
    return (
      <div className="wrapper">
        <div className="ui negative message">
          <i className="close icon"></i>
          <div className="header">
            エラーが発生しました。
          </div>
          検索条件を見直すか、管理者にお問い合わせください。
        </div>
      </div>
    );
  }

  if (!plans) {
    return <div></div>;
  }

  if (planCount === 0) {
    return (
      <div className="wrapper">
        <div className="ui orange message">
          <div className="header">
            ゴルフ場が見つかりませんでした。条件を変更して再度検索してください。
          </div>
        </div>
      </div>
    );
  }

  const results = plans.map(plan => {
    return (
      <div className="item result-item" key={plan.plan_id}>
        <div className="image">
          <img src={plan.image_url} alt={plan.course_name} />
        </div>
        <div className="content result-content">
          <div className="meta">
            <span className="cinema">{plan.course_name}<span className="result-prefecture">{plan.prefecture}</span></span>
            <div className="ui mini statistics">
              <div className="statistic">
                <div className="result-value">
                  <i className="car icon result-icon"></i> {plan.duration + '分'}
                </div>
              </div>
              <div className="statistic">
                <div className="result-value">
                  <i className="yen sign icon result-icon"></i> {plan.price.toLocaleString()}
                </div>
              </div>
              <div className="statistic">
                <div className="result-value">
                  <i className="thumbs up outline icon result-icon"></i> {plan.evaluation}
                </div>
              </div>
            </div>
            <div className="extra">
              <div className="ui label">{plan.plan_name}</div>
            </div>
          </div>
          <div className="description">
            <p>{plan.caption}</p>
          </div>
          <div className="item-button">
            <a href={plan.reserve_url_pc} target="_blank" rel="noopener noreferrer">楽天GORAで予約（残り<big>{plan.stock_count}</big> 枠）</a>
          </div>
        </div>
      </div>
    )
  });

  return (
    <>
      <div className="item-buttons">
        <div className="ui buttons">
          <button className={`ui button ${planSortType === "sortDuration" && "active"}`} onClick={() => planSort('sortDuration', 'asc')}>移動時間の短い順</button>
          <button className={`ui button ${planSortType === "price" && "active"}`} onClick={() => planSort('price', 'asc')}>安い順</button>
          <button className={`ui button ${planSortType === "evaluation" && "active"}`} onClick={() => planSort('evaluation', 'desc')}>評価の高い順</button>
        </div>
      </div>
      <div className="ui divided items">
        <p><big>{planCount}</big> 件見つかりました</p>
        {results}
      </div>
    </>
  )
}

export default Result;
