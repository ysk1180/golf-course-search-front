import React from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

class App extends React.Component {
  state = { date: '', budget: '10000', departure: '二子玉川駅', courses_names: [] }

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
    const day = date.getDate();
    const response = await axios.get('http://localhost:3001/search', {
      params: { date: `${year}-${month}-${day}`, budget: this.state.budget, departure: this.state.departure }
    });

    this.setState({ courses_names: response.data.course_names })
  }

  render() {
    const names = this.state.courses_names.map(name => {
      return <p>{name}</p>
    });

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
              <input type="submit" />
            </div>
          </form>
        </div>
        <div>
          {names}
        </div>
      </div>
    );
  }
}

export default App;
