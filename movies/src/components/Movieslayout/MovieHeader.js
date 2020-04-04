import React from 'react'
import { useHistory } from 'react-router-dom';
import './header.css'


export default function MovieHeader() {
    
    const history = useHistory();
    return (   
        <nav className="  nav_bar">
          <a  onClick={() => history.push('/home')}  >
            <img src={process.env.PUBLIC_URL+"/icon2.png"}  className=" homePostion" alt="Movies logo"/>
            <span> Movies</span>
          </a>
          <a onClick={() => history.push('/favorite')}  >
            <img  src={process.env.PUBLIC_URL+"/favourite-icon.png"} className="favPostion" alt="fav"/>
          </a>
        </nav>
     
    )
}
 