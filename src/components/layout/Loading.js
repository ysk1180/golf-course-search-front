import React from 'react';

const Loading = () => {
  return (
    <div className="loading">
      <div className="loading-image">
        <img src="https://img.gifmagazine.net/gifmagazine/images/1280750/original.gif" alt="golf-gif"/>
        <p>検索中です。この処理は20秒ほどかかります。</p>
      </div>
    </div>
  );
};

export default Loading;
