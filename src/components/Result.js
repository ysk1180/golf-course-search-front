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
      <div className="item" key={plan.plan_id}>
        <div className="image">
          <img src={plan.image_url} alt={plan.course_name} />
        </div>
        <div className="content">
          <div className="meta">
            <span className="cinema">{plan.course_name}</span>
            <div className="ui mini statistics">
              <div className="statistic">
                <div className="value">
                  <i className="car icon"></i> {plan.duration + '分'}
                </div>
              </div>
              <div className="statistic">
                <div className="value">
                  <i className="yen sign icon"></i> {plan.price.toLocaleString()}
                </div>
              </div>
              <div className="statistic">
                <div className="value">
                  <i className="thumbs up outline icon"></i> {plan.evaluation}
                </div>
              </div>
            </div>
            <div className="ui star rating" data-rating="3"></div>
            <div className="extra">
              <div className="ui label">{plan.prefecture}</div>
              <div className="ui label">{plan.plan_name}</div>
            </div>
          </div>
          <div className="description">
            <p>{plan.caption}</p>
          </div>
          <div className="item-button">
            <a href={plan.reserve_url_pc} target="_blank" rel="noopener noreferrer">PCサイト</a>
          </div>
          <div className="item-button">
            <a href={plan.reserve_url_mobile} target="_blank" rel="noopener noreferrer">スマートフォン専用サイト</a>
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
        {results}
      </div>
    </>
  )
}

export default Result;
