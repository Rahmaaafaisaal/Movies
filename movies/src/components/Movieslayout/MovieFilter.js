import React from 'react'
import './movieFilter.css'
export default function MovieFilter(props) {
    return (
       <div className="sreach">
         <input type="text" onChange={props.sreachMovie} placeholder="moive.."/>   
        </div>
    )
}
