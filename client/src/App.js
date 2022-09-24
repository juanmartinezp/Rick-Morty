import './App.css';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CreateCharacrter from './components/CreateCharacter';





function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/'>
          <LandingPage />
        </Route>
        <Route exact path='/create'>
          <CreateCharacrter />
        </Route>
        <Route exact path='/home'>
          <Home />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
