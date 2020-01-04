import React from 'react';
import axios from 'axios';

import './css/Common.css';
import './css/Reset.css';
import 'semantic-ui-css/semantic.min.css'

import Header from './layout/Header.js';
import Footer from './layout/Footer.js';
import Loading from './layout/Loading.js';
import Result from './Result.js';
import Search from './Search.js';

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
    return (
      <>
        <Header />

        <main>
          <Search date={this.state.date}
                  budget={this.state.budget}
                  departure={this.state.departure}
                  duration={this.state.duration}
                  onFormSubmit={this.onFormSubmit}
          />

          {this.state.loading ? (
            <Loading />
          ) : (
            <Result plans={this.state.plans}
                    error={this.state.error}
                    planCount={this.state.planCount}
                    planSortType={this.state.planSortType}
                    planSort={this.planSort}
            />
          )}
        </main>

        <Footer />
      </>
    );
  }
}

export default Home;
