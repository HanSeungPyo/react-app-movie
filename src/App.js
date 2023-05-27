import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './page/Main';
import Movies from './page/Movies';
import MovieDetail from './page/MovieDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navber from './Component/Navber';
import Search from './page/Search';
import NotFound from './page/NotFound';

//1. THE MOVIE DB를 이용 영화 정보를 불러온다.
//2. 홈페이지 구성은 메인, movie페이지 movieDetail페이지, error페이지
//3. 메인에서 배너 확인 및 3가지 섹션의 영화를 볼 수 있다.
//4. 영화 썸네일 오버 시 제목, 장르, 점수 등 영화 정보를 볼 수 있다.
//5. 영화 목록은 슬라이드로 넘기면서 볼 수 있다.
//6. 디테일 페이지에선 영화에 대한 디테일한 정보를 볼 수 있다. (포스터, 제목, 줄거리,트레일러, 리뷰, 관련된 영화 등)
//7. 영화 검색, 필터링, 정렬 할 수 있다.
//8. 페이징은 무한스크롤로 구현한다.
function App() {
  return (
    <div className="app">
      <Navber/>
      <Routes>
        <Route path="/" element={<Main/>}></Route>
        <Route path="/movie" element={<Movies/>}></Route>
        <Route path="/movie/:id" element={<MovieDetail/>}></Route>
        <Route path="/search" element={<Search/>}></Route>
        <Route path="/*" element={<NotFound/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
