import React from 'react'
import './rating.css'
function Rating(props) {

    let rate =props.vote_average>0 ? props.vote_average : "-"
    return (
    <span  className="rating"><span style={{color:manageRating(rate)}} >{rate} / 10</span></span>
 
    )
}

function manageRating(score)
{
    
    if(score>=7)
    {
        return "green"
    }
    else if(score<7&&score>=5)
    {
        return "#eded21"
    }
    else if(score>5)
    {
        return "red"
    }
    if(score==="-")
    {
        return "black"
    }
}


export default Rating;