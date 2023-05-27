import React, { useEffect } from 'react'
import { movieAction } from '../redux/actions/movieAction'
import { useDispatch, useSelector } from 'react-redux'
import Banner from '../Component/Banner'
import MovieSlide from '../Component/MovieSlide'
import ClipLoader from "react-spinners/ClipLoader";

//메인페이지
const Main = () => {
  let dispatch = useDispatch();

  const {popularMovies, topRatedMovies, upComingMovies, loading} = useSelector(state=>state.movie);
  

  useEffect(()=>{
    dispatch(movieAction.getMovies())
  },[])
  

  //loading true 로딩스피너 보여주고 false면 데이터를 보여준다.
  //true : 데이터 도착 전
  //false : 데이터 도착 후 또는 에러
  
  if(loading){
    return <div className="loading"><ClipLoader color="red" loading={loading} size={300} /></div>
  }
  return (
    <div>
      <Banner movie={popularMovies?.results[0]}/>
      <div className="movie-container">
      <h1>최고 인기 영화</h1>
      <MovieSlide movies={popularMovies} type="main" />
      <h1>최고 평점 영화</h1>
      <MovieSlide movies={topRatedMovies} type="main"/>
      <h1>개봉 예정영화</h1>
      <MovieSlide movies={upComingMovies} type="main"/>
      </div>
    </div>
  )
}

export default Main