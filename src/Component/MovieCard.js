import React from 'react';
import { Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImdb } from '@fortawesome/free-brands-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

//메인슬라이드 item, 영화상세 > 시청콘텐츠 슬라이드 item
const MovieCard = ({item,lastActiveClassSearch}) => {

  const {genreList} = useSelector((state)=>state.movie);
  const navigate = useNavigate();
  
  const showDetail = (id)=>{
    navigate(`/movie/${id}`)
  }


  return (
    <div className="movie-card" onMouseEnter={lastActiveClassSearch} onClick={()=>showDetail(item?.id)}
    style={{backgroundImage:"URL("+ `https://www.themoviedb.org/t/p/w220_and_h330_multi_faces/${item.poster_path}` + ")"}}>

        <div className="overlay"> 
          <div className="items"></div>
          <div className="items head">
            <p>{item.title}</p> 
          </div>
          <div className="card-slider-genres">
            {
            genreList && genreList.length !==0 ?  
              item.genre_ids.map((id) => (
              <Badge key={id} bg="danger">{genreList.genres.find((item)=>item.id == id).name}</Badge>
              ))
            :""
            } 
          </div>

          <div>
            <FontAwesomeIcon icon={faImdb} style={{color: "#fcf41d"}} size="2xl"  />
            <span className="movieCard-info">{item.vote_average}</span>
            <FontAwesomeIcon icon={faUsers} style={{color: "#a19b9b",}} size="lg"  />
            <span className="movieCard-info"><b>{item.popularity}</b></span>
             <div className="info-br"></div>
            <span className="eightteen movieCard-info">{item.adult?"청불":"Under 18"}</span>
            <span className="year movieCard-info">({item.release_date.split("-")[0]})</span>
          </div>
        </div>
    </div>
  )
}

export default MovieCard