import axios from 'axios';

import {APIKEY} from './Const'

async function getMovieById(movieId) {
 
  return await  axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${APIKEY}&language=en-US`).then(res=>res.data).catch(err=>console.log(err))
 
}


export default getMovieById;