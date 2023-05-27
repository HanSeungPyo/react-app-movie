import React, { useEffect, useState } from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import MovieListCard from '../Component/MovieListCard';
import { movieAction } from '../redux/actions/movieAction';
import ClipLoader from "react-spinners/ClipLoader";
import InfiniteScroll from 'react-infinite-scroller';
import { useSearchParams } from 'react-router-dom';

//검색페이지
const Search = () => {

 const dispatch = useDispatch();
 const {searchMoviesList, loading, page, genreList} = useSelector(state=>state.movie);  
 let [query, setQuery] = useSearchParams();
 let keyword = query.get("query");

 useEffect(()=>{
    dispatch(movieAction.getSearchMovies(keyword, page));
  },[keyword])
  
  const fetchMoreMovies = () => {
    dispatch(movieAction.getSearchMovies(keyword,page + 1));
  }; 

  useEffect(()=>{
    if(page > 1){
      fetchMoreMovies();
    }
  },[])

  useEffect(() => {
    return () => {
      dispatch(movieAction.resetPage());
    };
  }, []);

 //loading true 로딩스피너 보여주고 false면 데이터를 보여준다. 
  //true : 데이터 도착 전
  //false : 데이터 도착 후 또는 에러
  if(loading){
    return <div className="loading"><ClipLoader color="red" loading={loading} size={300} /></div> 
  }

 return (
    <>
       {<Container fluid>
        <InfiniteScroll 
          pageStart={page}
          loadMore={fetchMoreMovies}
          hasMore={page < searchMoviesList.total_pages}
          loader={<div className="loading"><ClipLoader color="red" loading={loading} size={300} /></div>}
          initialLoad={false}
          >
        <Row>
          
          {
           searchMoviesList.results?.length > 0 ?  
          searchMoviesList.results?.map((item,index)=>
          <Col lg={3} className="movie-list-col" key={index}>
            <MovieListCard item={item} key={index}/>
          </Col>)  
           : 
           <Col>
            <div className="no-data">
             입력하신 검색어 "{keyword}"(와)과 일치하는 결과가 없습니다.
             </div>
           </Col>
           
           }
        </Row>
        </InfiniteScroll>
      </Container> }
    </>
  )
}

export default Search