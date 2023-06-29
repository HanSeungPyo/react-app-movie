import React, { useEffect } from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { movieAction } from '../redux/actions/movieAction';
import ClipLoader from "react-spinners/ClipLoader";
import { Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImdb } from '@fortawesome/free-brands-svg-icons';
import { faUsers,faFilm } from '@fortawesome/free-solid-svg-icons';
import NumberFormat from '../Component/NumberFormat';
import TrailerModal from '../Component/TrailerModal';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieSlide from '../Component/MovieSlide';

//영화상세페이지
const MovieDetail = () => {

  const {id}  = useParams();
  const dispatch = useDispatch();
  
  const {movieDetail, loading, movieTrailer, relationMovies} = useSelector(state=>state.movie);

  useEffect(()=>{
      dispatch(movieAction.getMovieDetail(id));
      dispatch(movieAction.getTrailer(id));    
      dispatch(movieAction.getRelationMovies(id));    
  },[id]) 

    
  //화면크기에 따라 item 설정
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3
    },
    desktop: {
      breakpoint: { max: 3000, min: 1300 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1300, min: 920 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 920, min: 0 },
      items: 1
    }
  };

  //loading true 로딩스피너 보여주고 false면 데이터를 보여준다.
  //true : 데이터 도착 전
  //false : 데이터 도착 후 또는 에러
  

  if(loading){
    return <div className="loading"><ClipLoader color="red" loading={loading} size={300} /></div>
  }

  return (
    <div>
      <div className="breadcrumb-area text-center">
        <Container>
          <Row>
            <Col>
              <div className="breadcrumb-text">
                <h1>NETFLIX</h1>
                <ul className="breadcrumb-menu">
                  <li><Link to="/">HOME</Link></li>
                  <li><span>{movieDetail.original_title}</span></li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
    </div>
    <div className="detail-container">
      <Container>
        <Row>
          <Col lg={5}>
            <div className="detail-card mb-60"
            style={{backgroundImage:"URL("+ `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movieDetail.poster_path}` + ")"}}> 
            </div>
          </Col>
          <Col lg={7}>
            <div className="details-info mb-30 pl-30">
              <div className="detail-genres mb-20">
                <h4>{movieDetail.genres?.map((item,index) =><Badge key={index}  bg="danger">{item.name}</Badge>)}</h4>
              </div>
              <div className="detail-title mb-15">{movieDetail.title}</div>
              <div className="detail-tagline mb-15">{movieDetail.tagline}</div>
              
              <div className="detail-social mb-20">
                <FontAwesomeIcon icon={faImdb} style={{color: "#fcf41d"}} size="2xl"  />
                <span className="detail-info">{movieDetail.vote_average}</span>
                <FontAwesomeIcon icon={faUsers} style={{color: "#a19b9b",}} size="lg"  />
                <span className="detail-info"><b>{movieDetail.popularity}</b></span>
                <span className="eightteen detail-info">{movieDetail.ault?"청불":"Under 18"}</span>
              </div>
              <div className="variant-item">{movieDetail.overview}</div>
              <div className="detail-info-list variant-item">
              <Badge  bg="danger">예산</Badge>  ${movieDetail.budget ? <NumberFormat value={movieDetail.budget}/>:"0"} <br/>
              <Badge  bg="danger">수익</Badge>  ${movieDetail.revenue ? <NumberFormat value={movieDetail.revenue}/>:"0"}<br/>
              <Badge  bg="danger">개봉일</Badge>  {movieDetail.release_date}<br/>
              <Badge  bg="danger">러닝타임</Badge> {movieDetail.runtime}분
                </div>
            </div>  
          </Col>
        </Row>
        {movieTrailer.results && movieTrailer.results.length !== 0 ? 
        <Row>
          <Col>
          <div className="variant-item mb-20">
          <span className="trailer-title f-500"><FontAwesomeIcon icon={faFilm} />  예고편 및 다른 영상</span> 
          <Carousel responsive={responsive} showDots={true} > 
            {movieTrailer.results?.map((item,index)=>
            <TrailerModal key={index} movieTrailer_key={item.key}/>)}   
          </Carousel>
          </div>
          </Col>
        </Row>
        :""}

         {relationMovies.results && relationMovies.results.length !== 0 ? 
        <Row>
          <Col className="mb-80">
          <div className="variant-item mb-20">
          <span className="relration-title f-500"><FontAwesomeIcon icon={faFilm} />  함께 시청된 콘텐츠</span> 
          </div>
          <div className="">
          <MovieSlide movies={relationMovies} type="detail"/>
          </div>
          </Col>
        </Row>
        :""} 
      </Container>

      
    </div>
    </div>
  )
}

export default MovieDetail