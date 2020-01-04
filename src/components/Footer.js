import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div class="ui inverted vertical footer segment">
        <div class="ui container">
          <div class="ui stackable inverted divided equal height stackable grid">
            <div class="seven wide column">
              <h4 class="ui inverted header">開発者（お問い合わせはDMでお願いします）</h4>
              <span><a href="https://twitter.com/ysk_pro" target="_blank" rel="noopener noreferrer"><i className="twitter square icon"></i>ゆうすけ</a></span>
              <span><a href="https://twitter.com/rails_java_like" target="_blank" rel="noopener noreferrer"><i className="twitter square icon"></i>宮水</a></span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
