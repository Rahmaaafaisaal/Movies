import React, { Component } from 'react'
import Card from './Card'
import './card.css'
class Cards extends Component {


//check if the movie is one of user fav .
isfav=(movieId)=>
{
    let favMovies=JSON.parse(localStorage.getItem('fav'));
     
    if(favMovies&&favMovies.includes(movieId))
    {return true;}
    return false;
     
}


// adding and removing fav movie 
manageFav=(movieId)=>
{
    let favMovies=JSON.parse(localStorage.getItem('fav'))
    if(favMovies) { 
        if(!favMovies.includes(movieId))
        {
            favMovies.push(movieId)
        }
        else{
            favMovies=favMovies.filter((fav=>{
                if(fav===movieId)
                {return false}
                return true;
            }))
        }
        }
    else{favMovies=[movieId];}
    localStorage.setItem('fav', JSON.stringify(favMovies));
    this.changed(movieId)
}

// passing flag to parent with moive id
changed=(id)=>{
     this.props.favChanged(id)
}
     render() { 
            let cards=this.props.movies.map((movie)=>{
            return (<Card manageFav={this.manageFav} isfav={this.isfav(movie.id)}  key={movie.id} movie={movie}/>)
        })
         return (<>
         <section className="cards">
          {cards}
         </section>
         </>  );
     }
}
  
 export default Cards;



 