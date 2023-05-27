import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImdb } from '@fortawesome/free-brands-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';


//영화페이지 리스트
const MovieListCard = ({item}) => {

  const {genreList} = useSelector((state)=>state.movie);
  const navigate = useNavigate();
  
  const showDetail = (id)=>{
    navigate(`/movie/${id}`)
  }


  return (
    <>
       <div className="movie-list-card bright"  onClick={()=>showDetail(item?.id)}>
          <div className="info_section">
            <div className="movie-list-header">
            <img className="locandina" src={`https://image.tmdb.org/t/p/original///${item?.poster_path}`}/>
            <h1>{item?.title}</h1> 
            <h4>{item?.release_date?.split("-")[0]}</h4>
            <div className="type">
            {
            genreList && genreList.length !==0 ?  
              item.genre_ids?.map((id) => (
              <Badge key={id} bg="danger">{genreList.genres?.find((item)=>item.id == id).name}</Badge>
              ))
            :""
            } 
            </div>
            </div>
            <div className="movie-list-desc">
              <p className="text">{item?.overview.substr(0, 100) + "..."}</p>
            </div>
            <div className="movie-list-social">
              <FontAwesomeIcon icon={faImdb} style={{color: "#fcf41d"}} size="2xl"  />
              <span>{item?.vote_average}</span>
              <FontAwesomeIcon icon={faUsers} style={{color: "#a19b9b",}} size="lg"  />
              <span><b>{item?.popularity}</b></span>
              <span className="eightteen">{item?.adult?"청불":"Under 18"}</span>
            </div>
          </div>
          <div className="blur_back bright_back" style={{backgroundImage:"URL(" + `https://image.tmdb.org/t/p/original///${item?.backdrop_path}` + ")"}}></div>
        </div> 
    </>
  )
}

export default MovieListCard