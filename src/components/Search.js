import React from 'react';
import DatePicker, { registerLocale } from "react-datepicker"
import ja from 'date-fns/locale/ja';

import './css/Common.css';
import './css/Reset.css';
import "react-datepicker/dist/react-datepicker.css"

const Search = ({ date, budget, departure, duration, onFormSubmit, changeState }) => {
    const Today = new Date();
    registerLocale('ja', ja);

  return (
    <>
      <div className="ui container" id="container">
        <div className="top_description">
          <p><i className="golf ball icon"></i>プレー日、上限金額の項目に加えて、「ゴルフ場までの移動時間」でもゴルフ場を絞り込むことができ、ゴルフ場探しを簡単にします。楽に行けるゴルフ場を予約してゴルフを楽しみましょう。</p>
        </div>
        <div className="Search__Form">
          <form className="ui form segment" onSubmit={onFormSubmit}>
            <div className="field">
              <label><i className="calendar alternate outline icon"></i>プレー日</label>
              <DatePicker
                dateFormat="yyyy/MM/dd"
                locale='ja'
                selected={date}
                onChange={e => changeState('date', e)}
                minDate={Today}
              />
            </div>
            <div className="field">
              <label><i className="yen sign icon"></i>上限金額</label>
              <select className="ui dropdown" name="dropdown" value={budget} onChange={e => changeState('budget', e.target.value)}>
                <option value="7000">7,000円</option>
                <option value="8000">8,000円</option>
                <option value="9000">9,000円</option>
                <option value="10000">10,000円</option>
                <option value="11000">11,000円</option>
                <option value="12000">12,000円</option>
                <option value="13000">13,000円</option>
                <option value="14000">14,000円</option>
                <option value="15000">15,000円</option>
                <option value="16000">16,000円</option>
              </select>
            </div>
            <div className="field">
              <label><i className="map pin icon"></i>移動時間計算の出発地点（自宅から近い地点をお選びください）</label>
              <select className="ui dropdown" name="dropdown" value={departure} onChange={e => changeState('departure', e.target.value)}>
                <option value="1">二子玉川駅</option>
                <option value="2">吉祥寺駅</option>
                <option value="3">赤羽駅</option>
                <option value="4">錦糸町駅</option>
                <option value="7">飯田橋駅</option>
                <option value="5">川崎駅（神奈川県）</option>
                <option value="6">川越駅（埼玉県）</option>
              </select>
            </div>
            <div className="field">
              <label><i className="car icon"></i>車での移動時間の上限</label>
              <select className="ui dropdown" name="dropdown" value={duration} onChange={e => changeState('duration', e.target.value)}>
                <option value="60">60分</option>
                <option value="70">70分</option>
                <option value="80">80分</option>
                <option value="90">90分</option>
                <option value="100">100分</option>
                <option value="110">110分</option>
                <option value="120">120分</option>
                <option value="130">130分</option>
                <option value="140">140分</option>
                <option value="150">150分</option>
              </select>
            </div>
            <div className="Search__Button">
              <button type="submit" className="Search__Button__Design">
                <i className="search icon"></i>ゴルフ場を検索する
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Search;
