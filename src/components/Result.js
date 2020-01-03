import React from 'react';
import './Common.css';

const Result = ({ course }) => {
  if (!course) {
    return <div>Loading...</div>;
  }
  return (
    <div class="wrapper">
      <div class="card radius shadowDepth1">
        <div class="card__image border-tlr-radius">
          <image src="http://sallyaroundthebay.com/wp-content/uploads/2013/06/duck-Ernst-Vikne-300x300.jpg" alt="image" class="border-tlr-radius"/>
        </div>

        <div class="card__content card__padding">
          <div class="card__meta">
            <span>{course.prefecture}</span>
            <time>{'$'+course.price}</time>
          </div>

          <article class="card__article">
            <h2>{course.name}</h2>

            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus harum...</p>
          </article>
        </div>
      </div>
    </div>
  )
}

export default Result;
