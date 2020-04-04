import React, { Component } from 'react'
import Cards from '../MovieCard/Cards';
import getMovieById from '../../ApiCalls/getMovieById'

class Favorite extends Component {

    constructor(props) {
        super(props)
        this.state={
            isDataLoaded:false,
            favMovies:[],
            loading:true
        }
    }
    

    componentDidMount() {
         let favMovies=JSON.parse(localStorage.getItem('fav'))
           if(favMovies) { 
               favMovies.forEach((id,index) => {
                   getMovieById(id).then((data)=>{
                      this.setState({favMovies:[...this.state.favMovies,data]})
                   }).catch(err=>console.log(err));
               });
               
               }
    }
    
    //handle changing fav movies removing fav from list
    favChanged=(movieId)=>{
    let newFavList=this.state.favMovies.filter((movie)=>{
                if(movie.id===movieId){
                    return false;
                    }
                    return true;
    }) 
        this.setState({favMovies:newFavList})
        return newFavList
    }


    componentDidUpdate() {
       
        let favMovies=JSON.parse(localStorage.getItem('fav'));
        if(favMovies.length===this.state.favMovies.length&&this.state.isDataLoaded!==true)
        {
             this.setState({isDataLoaded:true})
        }
    }


    render() {
        
        return (
            <div className="mainContent">
            {(this.state.isDataLoaded===false||this.state.favMovies.length===0) ? <div></div> : <Cards favChanged={this.favChanged} movies={this.state.favMovies}/>} 
            </div>
        )
    }
}
export default Favorite;