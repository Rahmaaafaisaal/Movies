import React, { Component } from 'react'
import {connect}from 'react-redux'
import {AsyncActiongetMoviesfromBackend} from '../../store/action'
import store from '../../store/Store'
import Cards from '../MovieCard/Cards';
import MovieFilter from '../Movieslayout/MovieFilter'
import SidenNav from '../Movieslayout/SideNav'
import './homePage.css'

class HomePage extends Component {
  // initializing values 
  options=["now_playing","upcoming","top_rated"]  //nav options for movies 
  selectedOption=this.options[0]   //set now playing as  default
  currentPage=1   //current viewing data
  StoreUnsub=null;  //handling subscribe to store 
  optionMovies=[];  //all moives of the current selected option 

  constructor(props) {
        super(props)

    this.state={
        currentShown:null,
        hideSideNav:true,
        changed:false,
        loading:true
        
    }
    this.nextRef = React.createRef(); 
    this.comingNavRef=React.createRef(); 
    this.topNavRef=React.createRef();
 }


// go back to previous page 
goBack=()=>{
 if(this.currentPage!==1)
 {
  let firstIndex=(this.currentPage-2)*20
  this.setState({currentShown:this.optionMovies.slice(firstIndex,firstIndex+20)})
  this.currentPage--;
 }
}


// go farword if exist show if not call next page from backend
goNext=()=>{
  this.setState({loading:true})
  this.nextRef.current.disabled=true  //disable button to prevent accident double click 
  if(this.currentPage*20===this.optionMovies.length){
  this.currentPage++;
  this.props.getMovies(this.currentPage,this.selectedOption); 
}
else{
  let endingIndex=(this.currentPage+1)*20
  this.setState({currentShown:this.optionMovies.slice(endingIndex-20,endingIndex),loading:false})  
  this.currentPage++;
}

}


// searching for movie 
sreachMovie=(event)=>{
 
  let movieName=event.target.value;
  if(event.target.value.length!==0)
  {
    let result=this.optionMovies.filter((movie)=>{
    if(movie.title.toLowerCase().includes(movieName.toLowerCase()))
    { return true }
     return false;
  })
  this.setState({currentShown:result})
  }
  else{  // if the user clear the search box it return him to the lefted index 
   this.setState({currentShown:this.optionMovies.slice(this.currentPage*20-20,this.currentPage*20)})
  }
}


// showing the current moives choosen by the user with category 
changeCurrentShowing=(toShow)=>{
  this.selectedOption=toShow
  this.currentPage=1
  this.setState({loading:true})
  if(this.selectedOption===this.options[0]&&this.props.nowPlaying.length!==0) //now playing
  {
      this.optionMovies=this.props.nowPlaying
      this.setState({currentShown:this.optionMovies.slice(this.currentPage*20-20,this.currentPage*20),loading:false})

  }else if(this.selectedOption===this.options[1]&&this.props.coming.length!==0) //comming
  {
      
      this.optionMovies=this.props.coming
      this.setState({currentShown:this.optionMovies.slice(this.currentPage*20-20,this.currentPage*20),loading:false})
  }else if(this.selectedOption===this.options[2]&&this.props.topRated.length!==0) //top rated 
  {
      
      this.optionMovies=this.props.topRated
      this.setState({currentShown:this.optionMovies.slice(this.currentPage*20-20,this.currentPage*20),loading:false})
  }
  else{
    // if the category choosen for the first time it will call it from backend
     this.props.getMovies(this.currentPage,this.selectedOption);
  }
 
  
}

// updating the fav movie 
favChanged=(movieId)=>{
       this.setState({changed:true})
}

componentWillUnmount() {
  this.StoreUnsub(); // remove the subscription befor unmout
}

componentDidMount() {
    // subscribe to store changes 
  this.StoreUnsub=store.subscribe(()=>{
  
  let data=store.getState();

  if(this.selectedOption===this.options[0])
  {
    this.optionMovies=data.nowPlaying.data
    this.setState({currentShown:data.nowPlaying.data.slice(this.currentPage*20-20,this.currentPage*20),loading:false})
     
  }
  else if(this.selectedOption===this.options[1])
  {
      this.optionMovies=data.coming.data
      this.setState({currentShown:data.coming.data.slice(this.currentPage*20-20,this.currentPage*20),loading:false})
  }else if(this.selectedOption===this.options[2])
  {
    this.optionMovies=data.topRated.data
    this.setState({currentShown:data.topRated.data.slice(this.currentPage*20-20,this.currentPage*20),loading:false})
  }

  
})

this.init(); // calling now playing page one as default 

}


init=()=>{

if(this.props.nowPlaying.length===0) //check if in props set 
 {this.props.getMovies(this.currentPage,this.selectedOption);}
else{  // else send call to get from backend 
  this.optionMovies=this.props.nowPlaying
  this.setState({currentShown:this.optionMovies.slice(this.currentPage*20-20,this.currentPage*20),loading:false})
 
}
}

componentDidUpdate(prevProps, prevState) {
  
}



    render() {
      if(this.nextRef.current) // enable the next button before rerendering the new content 
      {
        this.nextRef.current.disabled=false;
      }
        return (
          <div >
          <SidenNav comingRef={this.comingNavRef}  topRef={this.topNavRef} chooseOption={this.changeCurrentShowing} options={this.options}/>
          <div className="mainContent">
           <MovieFilter sreachMovie={this.sreachMovie}/>
          {this.state.loading===true ? <img alt="Data is loading" src={process.env.PUBLIC_URL+"/loading.gif"} /> : <Cards favChanged={this.favChanged} movies={this.state.currentShown}/>} 
          </div>
          <button  className="navButtons" onClick={this.goBack}>Back</button> 
          <button ref={this.nextRef} className="navButtons" onClick={this.goNext}>Next</button>
          </div>
        )
    }
}





const mapDispatchToProps=(dispatch)=>{

return {
  getMovies:(pageNumber,moivesType)=>dispatch(AsyncActiongetMoviesfromBackend(pageNumber,moivesType))
}

};

const mapStateToProps=(state)=>{

return {
  nowPlaying:state.nowPlaying.data,
  coming:state.coming.data,
  topRated:state.topRated.data,

}

};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)

