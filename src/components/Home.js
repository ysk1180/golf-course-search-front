import React from 'react';
import axios from 'axios';
import ja from 'date-fns/locale/ja';
import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import Navbar from './Navbar.js';
import Result from './Result.js';
import './Common.css';

registerLocale('ja', ja);

class Home extends React.Component {
  state = { date: '', budget: '10000', departure: '1', duration: '90', loading: false, error: '' }

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
      this.setState({ plans: response.data.plans })
    } catch (e) {
      this.setState({ error: e })
      console.log(e)
    }
    this.setState({ loading: false });
  }

  render() {
    return (
      <>
        <Navbar />
        <div className="ui container">
          <div className="Search__Form">
            <form className="ui form segment" onSubmit={this.onFormSubmit}>
              <div className="field">
                <label>日付</label>
                <DatePicker
                  dateFormat="yyyy/MM/dd"
                  locale='ja'
                  selected={this.state.date}
                  onChange={e => this.setState({ date: e})}
                />
              </div>
              <div className="field">
                <label>金額</label>
                <select className="ui dropdown" name="dropdown" value={this.state.budget} onChange={e => this.setState({ budget: e.target.value })}>
                  <option value="10000">10000</option>
                  <option value="5000">5000</option>
                </select>
              </div>
              <div className="field">
                <label>場所</label>
                <select className="ui dropdown" name="dropdown" value={this.state.departure} onChange={e => this.setState({ departure: e.target.value })}>
                  <option value="1">二子玉川駅</option>
                </select>
              </div>
              <div className="field">
                <label>所要時間</label>
                <select className="ui dropdown" name="dropdown" value={this.state.duration} onChange={e => this.setState({ duration: e.target.value })}>
                  <option value="90">90分</option>
                  <option value="60">60分</option>
                </select>
              </div>
              <div className="Search__Button">
                <button type="submit" className="Search__Button__Design">
                  ゴルフ場を検索する
                </button>
              </div>
            </form>
          </div>
        </div>

        {this.state.loading ? (
          <div className="loading">
            <div className="loading-image">
              <img src="https://img.gifmagazine.net/gifmagazine/images/1280750/original.gif" alt="golf-gif"/>
              <span>検索中です。この処理は20秒ほどかかります。</span>
            </div>
          </div>
        ) : (
          <Result plans={this.state.plans} error={this.state.error} />
        )}
      </>
    );
  }
}

export default Home;
