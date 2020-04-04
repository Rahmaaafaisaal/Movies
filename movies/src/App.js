import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import {Provider} from 'react-redux'
import store from './store/Store'
import './App.css';
import Movie from './components/Movieslayout/Movie'
import HomePage from './components/HomePage/HomePage'
import Favorite from './components/FavoritesPage/Favorite'
function App() {
  return (
  
  <Provider store={store}>
    <div className="App ">
    <BrowserRouter>
     <Movie/>
    <Switch>
       <Route exact path="/home" component={HomePage}/>
       <Route exact path="/favorite" component={Favorite}/>
     <HomePage/>
     </Switch>
    </BrowserRouter>   
     </div>
    </Provider>
   
  );
}

export default App;
