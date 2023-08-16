import React from 'react';

const Banner = ({ movie }) => {
  const bannerStyle = {
    backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.poster_path})`,
  };

  return (
    <div className="banner" style={bannerStyle}>
      <div className="banner-info">
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
};

export default Banner;