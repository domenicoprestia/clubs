import './App.css';
import Navbar from './components/navbar/navbar.component'
import AllClubsContainer from './components/clubs-container/clubs.container'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Component } from 'react';
import Club from './components/full-club/club.component';

class App extends Component{


  render(){
    return(
      <Router>
        <div className='App'>
          <Navbar/>
          <Switch>
            <Route path='/' exact component={AllClubsContainer}/>
            <Route path='/club/:slug' exact>
              <Club/>
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
