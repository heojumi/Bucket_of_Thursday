import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import {Home, About, Main} from './pages';
import {Menu} from './components';
class App extends Component {
  render(){
    return(
      <div>
        <Menu />
        <Route exact path="/" component={Home}/>
        <Route path="/main" component={Main}/>
        <Switch>
          <Route path="/about/:name" component={About}/>
          <Route path="/about" component={About}/>
        </Switch>
      </div>
    );
  }
}

export default App;
