import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Oracle from './pages/Oracle';

function App() {
  return (
    <div className="App">
      <Router>
        <Route component={scrollRestoration} />
        <Switch>
          <Route path="/" exact component={props => <Dashboard {...props} key={Date.now()} />} />
          <Route path="/oracle/:name" component={props => <Oracle {...props} key={Date.now()} />} />
          <Route component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

class scrollRestoration extends React.Component {
  componentDidUpdate(prevProps) {
    if (
      this.props.location.pathname !== prevProps.location.pathname
    ) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return null;
  }
}

export default App;
