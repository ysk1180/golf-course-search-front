import React from 'react';
import style from './Result.css';

const Result = ({ course }) => {
  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>{course.name}</p>
      <p>{course.caption}</p>
      <p>{course.prefecture}</p>
      <p>{course.plan_name}</p>
      <p>{course.price}</p>
      <p>{course.duration}</p>
      <a href={course.reserve_url_pc}>予約ページ＜PC＞</a>
      <a href={course.reserve_url_mobile}>予約ページ＜モバイル＞</a>
      <img src={course.image_url} />
    </div>
  );
};

export default Result;
