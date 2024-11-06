import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Auth from './auth';
import Home from './home';
import HomeDetails from './homedetails';
import Trending from './trending';
import { useState } from 'react';
import TrendingDetails from './trendingdetails';
import Gaming from './gaming';
import GamingDetails from './gamindetails';
import SavedVideosPage from './savedvideos';
import { useEffect } from 'react';




function App() {

 

  return (
    <BrowserRouter path = '/auth'>
    <Routes>
    <Route exact path = '/auth' element = {<Auth />}/>
    
    <Route exact path = '/homes' element = {<Home/>}/>
    <Route exact path = '/homes/:homeId' element = {<HomeDetails/>}/>
    <Route exact path = '/trending' element = {<Trending/>}/>
    <Route exact path = '/trending/:trendingId' element = {<TrendingDetails/>}/>
    <Route exact path = '/gaming' element = {<Gaming/>}/>
    <Route exact path = '/gaming/:gamingId' element = {<GamingDetails/>}/>
    <Route exact path = '/savedVideos' element = {<SavedVideosPage/>}/>
    
    
    
   

    </Routes>
    </BrowserRouter>
  );
}

export default App;
