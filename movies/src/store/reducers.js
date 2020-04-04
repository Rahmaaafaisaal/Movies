import { combineReducers } from 'redux'
import { GET_MOVIES } from './actionTypes'

const initNowPlaying={

    currentPage:1,
    numberOfpages:1,
    data:[]
}
const initComming={
    currentPage:1,
    numberOfpages:1,
    data:[]

}
const initTopRated={
        currentPage:1,
        numberOfpages:1,
        data:[]
}    


function manageNowPlaying(state=initNowPlaying,action)
{
    
    if(action.moviesType==="now_playing")
    {
       if(action.type===GET_MOVIES){
      
        return{
            currentPage:action.data.page,
            numberOfpages:action.data.total_pages,
            data:[...state.data,...action.data.results],
        }
      
    }
    }
    return state;
}


function manageComing(state=initComming,action)
{
        if(action.moviesType==="upcoming")
    {
       if(action.type===GET_MOVIES){
      
        return{
            currentPage:action.data.page,
            numberOfpages:action.data.total_pages,
            data:[...state.data,...action.data.results],
        }
      
    }
    }
    return state;
}

function manageTopRated(state=initTopRated,action)
{

    if(action.moviesType==="top_rated")
    {
       if(action.type===GET_MOVIES){


        return{
            currentPage:action.data.page,
            numberOfpages:action.data.total_pages,
            data:[...state.data,...action.data.results],
        }
      
    }
    }
    return state;
}




const reducers=combineReducers({
    nowPlaying:manageNowPlaying,
    coming:manageComing,
    topRated:manageTopRated
})

export default reducers;