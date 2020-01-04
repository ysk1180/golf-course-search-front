import React from 'react';
import axios from 'axios';
import DatePicker, { registerLocale } from "react-datepicker"
import ja from 'date-fns/locale/ja';

import './css/Common.css';
import './css/Reset.css';
import 'semantic-ui-css/semantic.min.css'
import "react-datepicker/dist/react-datepicker.css"
import Header from './layout/Header.js';
import Footer from './layout/Footer.js';
import Result from './Result.js';

class Home extends React.Component {
  state = { date: '', budget: '12000', departure: '1', duration: '90', loading: false, error: '', plans: null, planCount: 0, planSortType: 'duration' }

  componentDidMount() {
    let date = new Date();
    date.setDate(date.getDate() + 14);
    this.setState({ date: date })

  }

  onFormSubmit = async (event) => {
    try {
      this.setState({ loading: true });
      event.preventDefault();

      const date = this.state.date
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getYear();
      const response = await axios.get('https://ttdbfb2924.execute-api.ap-northeast-1.amazonaws.com/production/fetch-golf-plans?', {
        params: { date: `${year}${month}${day}`, budget: this.state.budget, departure: this.state.departure, duration: this.state.duration }
      });
      this.setState({ planCount: response.data.count })
      this.setState({ plans: response.data.plans })
    } catch (e) {
      this.setState({ error: e })
      console.log(e)
    }
    this.setState({ loading: false });
  }

  planSort = (type, sortOrder) => {
    this.setState({ planSortType: type})
    let plans = this.state.plans
    plans.sort((plan1, plan2) => {
      if (plan1[type] < plan2[type]) {
        return sortOrder === 'asc' ? -1 : 1
      }
      if (plan1[type] > plan2[type]) {
        return sortOrder === 'asc' ? 1 : -1
      }
      return 0
    })
    this.setState({ plans: plans })
  }

  render() {
    const Today = new Date();
    registerLocale('ja', ja);

    return (
      <>
        <main>
          <div className="ui container" id="container">
            <Header />
            <div className="top_description">
              <p><i className="golf ball icon"></i>プレー日、上限金額の項目に加えて、「ゴルフ場までの移動時間」でもゴルフ場を絞り込むことができ、ゴルフ場探しを簡単にします。楽に行けるゴルフ場を予約してゴルフを楽しみましょう。</p>
            </div>
            <div className="Search__Form">
              <form className="ui form segment" onSubmit={this.onFormSubmit}>
                <div className="field">
                  <label><i className="calendar alternate outline icon"></i>日付</label>
                  <DatePicker
                    dateFormat="yyyy/MM/dd"
                    locale='ja'
                    selected={this.state.date}
                    onChange={e => this.setState({ date: e})}
                    minDate={Today}
                  />
                </div>
                <div className="field">
                  <label><i className="yen sign icon"></i>上限金額</label>
                  <select className="ui dropdown" name="dropdown" value={this.state.budget} onChange={e => this.setState({ budget: e.target.value })}>
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
                  <select className="ui dropdown" name="dropdown" value={this.state.departure} onChange={e => this.setState({ departure: e.target.value })}>
                    <option value="1">二子玉川駅</option>
                    <option value="2">吉祥寺駅</option>
                    <option value="3">赤羽駅</option>
                    <option value="4">錦糸町駅</option>
                    <option value="5">川崎駅</option>
                  </select>
                </div>
                <div className="field">
                  <label><i className="car icon"></i>車での移動時間の上限</label>
                  <select className="ui dropdown" name="dropdown" value={this.state.duration} onChange={e => this.setState({ duration: e.target.value })}>
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

          {this.state.loading ? (
            <div className="loading">
              <div className="loading-image">
                <img src="https://img.gifmagazine.net/gifmagazine/images/1280750/original.gif" alt="golf-gif"/>
                <p>検索中です。この処理は20秒ほどかかります。</p>
              </div>
            </div>
          ) : (
            <Result plans={this.state.plans} error={this.state.error} planSort={this.planSort} planCount={this.state.planCount} planSortType={this.state.planSortType} />
          )}
        </main>

        <Footer />
      </>
    );
  }
}

export default Home;
