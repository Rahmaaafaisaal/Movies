import { GET_MOVIES } from './actionTypes'

import axios from 'axios';

import {APIKEY} from '../ApiCalls/Const'

export  function AsyncActiongetMoviesfromBackend(pageNumber,moviesType)
{
  return function(dispatch){
   axios.get(`https://api.themoviedb.org/3/movie/${moviesType}?api_key=${APIKEY}&language=en-US&page=`+pageNumber).then((data)=>{
        
          dispatch(actionGetMovies(moviesType,data.data))
      }).catch((err)=>{
            console.log(err)
      })
  }
  
}

function actionGetMovies(movieType,movies){

    return{
        type:GET_MOVIES,
        moviesType:movieType,
        data:movies
    }

}

