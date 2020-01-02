import React from 'react';
import axios from 'axios';

import Navbar from './Navbar.js';
import Result from './Result.js';
import { Icon, Image, Statistic } from 'semantic-ui-react'
import './Common.css';

class Home extends React.Component {
  state = { date: '', budget: '10000', departure: '二子玉川駅', duration: '90', courses: [] }

  componentDidMount() {
    let date = new Date();
    date.setDate(date.getDate() + 14);
    this.setState({ date: date })
  }

  onFormSubmit = async (event) => {
    event.preventDefault();

    const date = this.state.date
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = ("0" + date.getDate()).slice(-2);
    const response = await axios.get('https://api.myjson.com/bins/14pcw0');
    // const response = await axios.get('http://localhost:3001/search', {
    //   params: { date: `${year}-${month}-${day}`, budget: this.state.budget, departure: this.state.departure, duration: this.state.duration }
    // });

    this.setState({ courses: response.data.courses })
  }

  render() {
    return (
      <>
        <Navbar />
        <div class="ui container">
          <div class="Search__Form">
            <form class="ui form segment" onSubmit={this.onFormSubmit}>
              <div class="field">
                <label>日付</label>
                <input name="date" type="date" />
              </div>
              <div class="field">
                <label>金額</label>
                <select class="ui dropdown" name="dropdown">
                  <option value="10000">10000</option>
                  <option value="5000">5000</option>
                </select>
              </div>
              <div class="field">
                <label>場所</label>
                <select class="ui dropdown" name="dropdown" value={this.state.departure} onChange={e => this.setState({ departure: e.target.value })}>
                  <option value="nikotama">二子玉川駅</option>
                </select>
              </div>
              <div class="field">
                <label>所要時間</label>
                <select class="ui dropdown" name="dropdown" value={this.state.duration} onChange={e => this.setState({ duration: e.target.value })}>
                  <option value="90">90分</option>
                  <option value="90">60分</option>
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

        <div class="ui cards">
          {this.state.courses.map(course => <Result course={course}/>)}
        </div>
      </>
    );
  }
}

export default Home;
