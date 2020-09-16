import React from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

function App(props) {
  console.log(props);
  const history = createBrowserHistory();
  return (
    <div className="app">
      <div className="app_body">
        <Sidebar />
        <Router history={history}>
          <Switch>
            <Route path="/rooms/:roomId" component={Chat}>
              {/* <Chat /> */}
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}



export default App;
