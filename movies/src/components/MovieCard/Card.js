import React from 'react'
import Rating from './Rating'
function Card(props) {

  let movie=props.movie
  
    return(
<article className="card ">
  <div className="cardContent">
    <div className="card__img"> 
      <img  className="imgPoster" alt="movie"  src={movie.poster_path!=null?`http://image.tmdb.org/t/p/original/${movie.poster_path}`:process.env.PUBLIC_URL+"/coming-soon-high-res.png"}/>
        <button onClick={()=>{props.manageFav(movie.id)}} title="Add to Faviorate" className="add_to_fav">
           {props.isfav ?<span> &hearts;</span>:<span> &#9825;</span>} 
        </button>
    </div>
    <div className="card__info" >
      <p className="movie__title">{ movie.title}</p>
      <Rating vote_average={movie.vote_average}/>
     </div>
  </div>
</article>
    )


}
export default Card;