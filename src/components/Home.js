import React from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import Result from './Result.js';
import style from './Home.css';

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
      <div>
        <div>
          <form onSubmit={this.onFormSubmit}>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={e => this.setState({ date: e})}
              />
            </div>
            <div>
              <select value={this.state.badget} onChange={e => this.setState({ budget: e.target.value })}>
                <option value="10000">10000</option>
                <option value="5000">5000</option>
              </select>
            </div>
            <div>
              <input type="text" value={this.state.departure} onChange={e => this.setState({ departure: e.target.value })} />
            </div>
            <div>
              <select value={this.state.duration} onChange={e => this.setState({ duration: e.target.value })}>
                <option value="90">90分</option>
                <option value="60">60分</option>
              </select>
            </div>
            <div>
              <input type="submit" />
            </div>
          </form>
        </div>
        <div>
          {this.state.courses.map(course => <Result course={course}/>)}
        </div>
      </div>
    );
  }
}

export default Home;
