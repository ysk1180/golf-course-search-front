import React from 'react';
import axios from 'axios';

import './css/Common.css';
import './css/Reset.css';
import 'semantic-ui-css/semantic.min.css'

import addDays from 'date-fns/addDays';
import format from 'date-fns/format';

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';
import Loading from './layout/Loading.js';
import Result from './Result.js';
import Search from './Search.js';

class Home extends React.Component {
  state = { date: addDays(new Date(), 14), budget: '12000', startTime: [], departure: '1', duration: '90', practiceField: false, cart: false, lunch: false, loading: false, error: '', plans: null, planCount: 0, planSortType: 'sortDuration' }
  ref = React.createRef()

  onFormSubmit = async (event) => {
    try {
      event.preventDefault();
      this.setState({ loading: true });

      const formatedStartTime = this.state.startTime.length === 0 ? "0" : this.state.startTime.join('')
      const response = await axios.get('https://ttdbfb2924.execute-api.ap-northeast-1.amazonaws.com/production/fetch-golf-plans?', {
        params: { date: format(this.state.date, 'yyyyMMdd'), budget: this.state.budget, startTime: formatedStartTime, practiceField: this.state.practiceField, cart: this.state.cart, lunch: this.state.lunch, departure: this.state.departure, duration: this.state.duration }
      });
      this.setState({ planCount: response.data.count, plans: response.data.plans })

      this.ref.current.scrollIntoView({behavior: 'smooth'})
    } catch (e) {
      this.setState({ error: e })
    }
    this.setState({ loading: false });
  }

  changeState = (key, value) => {
    this.setState({ [key]: value })
  }

  changeStartTime = value => {
    let arr = this.state.startTime
    if (arr.includes(value)) {
      arr = arr.filter(item => item !== value)
    } else {
      arr.push(value)
    }
    this.setState({ startTime: arr })
  }

  render() {
    return (
      <>
        <Header />

        <main>
          <div className="ui container" id="container">
            <Search date={this.state.date}
                    budget={this.state.budget}
                    startTime={this.state.startTime}
                    departure={this.state.departure}
                    duration={this.state.duration}
                    practiceField={this.state.practiceField}
                    cart={this.state.cart}
                    lunch={this.state.lunch}
                    onFormSubmit={this.onFormSubmit}
                    changeState={this.changeState}
                    changeStartTime={this.changeStartTime}
            />

            <Loading loading={this.state.loading}/>

            <div id="result-list" ref={this.ref}>
              <Result plans={this.state.plans}
                      error={this.state.error}
                      planCount={this.state.planCount}
                      planSortType={this.state.planSortType}
                      changeState={this.changeState}
              />
            </div>
          </div>
        </main>

        <Footer />
      </>
    );
  }
}

export default Home;
