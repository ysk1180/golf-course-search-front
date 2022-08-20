import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="ui vertical footer segment">
        <div className="ui container">
          <div className="ui stackable equal height stackable grid">
            <div className="twelve wide column">
              <p className="ui">開発者（お問い合わせはDMでお願いします）</p>
              <span><a href="https://twitter.com/ysk_pro" target="_blank" rel="noopener noreferrer"><i className="twitter square icon"></i>ゆうすけ</a></span>
              <span><a href="https://twitter.com/rails_java_like" target="_blank" rel="noopener noreferrer"><i className="twitter square icon"></i>宮水</a></span>
            </div>
            <div className="twelve wide column">
              <p className="ui">
                <a href="https://golf-medley.com/" target="_blank" rel="noopener noreferrer" style={{ marginLeft: 0 }}>Golf Medley（ゴルフ練習場口コミサイト） <i class="external alternate icon"></i></a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
