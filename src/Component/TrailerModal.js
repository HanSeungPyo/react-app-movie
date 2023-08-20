import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import YouTube from 'react-youtube';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

const TrailerModal = ({ movieTrailer_key }) => {
    const [show, setShow] = useState(false);
    const [optsHeight, setOptsHeight] = useState(0);
    const innerHeight = window.innerHeight;

    useEffect(() => {
        setOptsHeight(innerHeight >= 1000 ? 800 : innerHeight / 2);
    }, [innerHeight]);

    const opts = {
        width: '100%',
        height: optsHeight,
        playerVars: {
            autoplay: 0,
        },
    };

    return (
        <>
            <div 
                className="trailer-img"
                style={{ backgroundImage: `URL(https://i.ytimg.com/vi/${movieTrailer_key}/hqdefault.jpg)` }}
                onClick={() => setShow(true)}
            >
                <FontAwesomeIcon icon={faYoutube} style={{ color: "#ea0611" }} className="fa-4xl" />
            </div>

            <Modal
                show={show}
                onHide={() => setShow(false)}
                centered
                size='xl'
                backdrop='static'
                backdropClassName='trailer-backdrop'
            >
                <Modal.Body className="modal-body-dark">
                    <button className="btn" onClick={() => setShow(false)}>
                        <FontAwesomeIcon icon={faXmark} size="2xl" style={{ color: "#ff0000" }} />
                    </button>
                    <YouTube className="trailer" videoId={movieTrailer_key} opts={opts} />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default TrailerModal;