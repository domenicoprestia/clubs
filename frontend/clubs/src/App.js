import './App.css';
import Navbar from './components/navbar/navbar.component'
import AllClubsContainer from './components/clubs-container/clubs.container'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Component } from 'react';

class App extends Component{


  render(){
    return(
      <Router>
        <div className='App'>
          <Navbar/>
          <Switch>
            <Route path='/' exact component={AllClubsContainer}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
