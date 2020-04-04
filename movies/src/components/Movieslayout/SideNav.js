import React from 'react'
import {useState} from 'react'

export default function SidenNav(props) {

  const [hidden, toggle] = useState(true)
 
    return (  
       <div className="sideNav">
          <img className="option" onClick={() => toggle(!hidden)} src={process.env.PUBLIC_URL+"/movies.png"} alt="movies option" />
          <ul className="navOptions" hidden={hidden}>
            <li  onClick={()=>{props.chooseOption(props.options[0])}}>Now </li>
            <li  onClick={()=>{props.chooseOption(props.options[1])}}>Coming </li>
            <li  onClick={()=>{props.chooseOption(props.options[2])}}>Top Rating</li>
          </ul>
        </div>
    )
}
