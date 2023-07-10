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
 const [initialLoad, setInitialLoad] = useState(true);
 const [query, setQuery] = useSearchParams();
 const keyword = query.get("query");

 useEffect(()=>{
    dispatch(movieAction.getSearchMovies(keyword, 1));
  
    setInitialLoad(true);
  
    return () => {
      dispatch(movieAction.resetPage());
    };
  },[keyword])
  
  const fetchMoreMovies = () => {
    setInitialLoad(false);
    if(initialLoad == false) dispatch(movieAction.getSearchMovies(keyword, page + 1));
  }; 

  /**
   * loading true 로딩스피너 보여주고 false면 데이터를 보여준다. 
   * 무한스크롤 시엔 initialLoad을 false로 바꾼다.
   * true : 데이터 도착 전
   * false : 데이터 도착 후 또는 에러
   */
  if(loading && initialLoad){
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
      </Container>}
    </>
  )
}

export default Search