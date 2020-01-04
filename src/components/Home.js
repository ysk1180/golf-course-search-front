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
  state = { date: addDays(new Date(), 14), budget: '12000', departure: '1', duration: '90', loading: false, error: '', plans: null, planCount: 0, planSortType: 'duration' }

  onFormSubmit = async (event) => {
    try {
      event.preventDefault();
      this.setState({ loading: true });

      const response = await axios.get('https://ttdbfb2924.execute-api.ap-northeast-1.amazonaws.com/production/fetch-golf-plans?', {
        params: { date: format(this.state.date, 'yyyyMMdd'), budget: this.state.budget, departure: this.state.departure, duration: this.state.duration }
      });
      this.setState({ planCount: response.data.count, plans: response.data.plans })
    } catch (e) {
      this.setState({ error: e })
    }
    this.setState({ loading: false });
  }

  changeState = (key, value) => {
    this.setState({ [key]: value })
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
                  changeState={this.changeState}
          />

          <Loading loading={this.state.loading}/>

          <Result plans={this.state.plans}
                  error={this.state.error}
                  planCount={this.state.planCount}
                  planSortType={this.state.planSortType}
                  changeState={this.changeState}
          />
        </main>

        <Footer />
      </>
    );
  }
}

export default Home;
