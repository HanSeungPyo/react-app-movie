import React, { useEffect, useState } from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import MovieListCard from '../Component/MovieListCard';
import { movieAction } from '../redux/actions/movieAction';
import ClipLoader from "react-spinners/ClipLoader";
import InfiniteScroll from 'react-infinite-scroller';
import NavBarSearch from '../Component/NavBarSearch';

//영화페이지
const Movies = () => {

  const dispatch = useDispatch();
  const {popularMoviesList, loading, page, genreList} = useSelector(state=>state.movie);
  const [initialLoad, setInitialLoad] = useState(true);
  const [filterGenres, setFilterGenres] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [sortTitle, setSortTitle] = useState(" > 인기콘텐츠순");
  const [sortBy, setSortBy] = useState("popularity.desc");
  
  useEffect(() => {
    dispatch(movieAction.getMoviesList(page, sortBy, filterGenres));
    setInitialLoad(false);
  },[])
  
  //정렬순서 바꿀 시 페이지 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(movieAction.getMoviesList(1, sortBy, filterGenres));
  },[sortBy])

  //장르 선택 시 페이지 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(movieAction.getMoviesList(1, sortBy, filterGenres));
  },[filterGenres])


  const fetchMoreMovies = () => {
    dispatch(movieAction.getMoviesList(page + 1,sortBy, filterGenres));
  }; 

  //언마운트 시 페이지 리셋
  useEffect(() => {
    return () => {
      dispatch(movieAction.resetPage());
    };
  }, []);

  //loading true 로딩스피너 보여주고 false면 데이터를 보여준다. 
  //무한스크롤 시엔 false로 바꾼다.
  //true : 데이터 도착 전
  //false : 데이터 도착 후 또는 에러
  if(loading && initialLoad){
    return <div className="loading"><ClipLoader color="red" loading={loading} size={300} /></div> 
  }
  
  return (
    <>
        <NavBarSearch 
        genreList={genreList} 
        searchTitle={searchTitle} 
        setSortBy={setSortBy} 
        sortTitle={sortTitle} 
        setSearchTitle={setSearchTitle}
        setSortTitle={setSortTitle} 
        setFilterGenres={setFilterGenres}/>
       <Container fluid>
        <InfiniteScroll 
          pageStart={page}
          loadMore={fetchMoreMovies}
          hasMore={page < popularMoviesList.total_pages}
          loader={<div className="scroll-loading"><ClipLoader color="red" loading={loading} size={200} /></div>}
          initialLoad={false}
          >
        <Row>
          {popularMoviesList.results?.map((item,index)=>
          <Col lg={3} className="movie-list-col" key={index}>
            <MovieListCard item={item} key={index}/>
          </Col>)}
        </Row>
        </InfiniteScroll>
      </Container>
    </>
  )
}

export default Movies