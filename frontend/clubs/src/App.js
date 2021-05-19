import './App.css';
import Navbar from './components/navbar/navbar.component'
import AllClubsContainer from './components/clubs-container/clubs.container'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Component } from 'react';
import Club from './pages/club-page/club.page';
import ProfilePage from './pages/user-page/user.page'
import SearchTopic from './pages/search-pages/search-topic/search-topic.page';
import SearchSlug from './pages/search-pages/search-slug/search-slug.page';
import Login from './pages/auth-pages/login-page/login.page'
import Register from './pages/auth-pages/reistration-page/register.page'

class App extends Component{


  render(){
    return(
      <Router>
        <div className='App'>
          <Navbar/>
          <Switch>
            <Route path='/' exact component={AllClubsContainer}/>
            <Route path='/login' exact component={Login}/>
            <Route path='/register' exact component={Register}/>
            <Route path='/club/:slug' exact>
              <Club/>
            </Route>
            <Route path='/user/:username' exact>
              <ProfilePage/>
            </Route>
            <Route path='/search/topic' exact component={SearchTopic}></Route>
            <Route path='/search/slug' exact component={SearchSlug}></Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
