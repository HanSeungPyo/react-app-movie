import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark} from '@fortawesome/free-solid-svg-icons';
import YouTube, { YouTubeProps } from 'react-youtube';
import { useDispatch } from 'react-redux';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

//트레일러 모달
const TrailerModal = ({movieTrailer_key}) => {
    const [show, setShow] = useState(false);
    const [optsHeight, setOptsHeight] = useState(0);

    const dispatch = useDispatch();
    const innerHeight = window.innerHeight;


    //사용자 화면size에따라 모달크기 조정
    useEffect(()=>{
      if(innerHeight >= 1000){
        setOptsHeight(800);
      }else if(innerHeight < 1000){
        setOptsHeight(innerHeight / 2);
      }
    },[innerHeight])

   
    
    const opts = {
        width: '100%',
        height: optsHeight,
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 0,
        },
      };
      
      const handleReady = (event) => {
        event.target.pauseVideo();
      }; 
  
  return (
    <>
    <div className="trailer-img" 
    style={{backgroundImage:"URL("+ `https://i.ytimg.com/vi/${movieTrailer_key}/hqdefault.jpg` + ")"}}
    id="model-btn-open"  onClick={() => setShow(true)}>
      <FontAwesomeIcon icon={faYoutube} style={{color: "#ea0611",}}  className="fa-4xl"/>
    </div>

    <Modal
      show={show}
      onHide={() => setShow(false)}
      centered={true}
      size='xl'
      backdrop='static'
      backdropClassName='trailer-backdrop'
    >
      <Modal.Body className="modal-body-dark">
      <button className="btn" onClick={() => setShow(false)}>
        <FontAwesomeIcon icon={faXmark} size="2xl" style={{color: "#ff0000",} } />
      </button>     
      <YouTube className="trailer" videoId={movieTrailer_key} opts={opts} onReady={handleReady} />
      </Modal.Body>
    </Modal>
  </>
  )

  
  
}

export default TrailerModal