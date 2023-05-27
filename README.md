![web(1)](https://github.com/HanSeungPyo/react-app-movie/assets/18672442/5e55bffc-ff11-4491-9cc5-51cb6c299f75)


Demo: https://hsp-movie.netlify.app/

<h1>개발 목표</h1>

· 리액트를 활용하여 영화 관련 웹 애플리케이션을 개발<br>
· 리액트 컴포넌트와 라우팅을 이해하고, 올바른 컴포넌트 구조를 구현<br>
· Redux Toolkit을 사용하여 상태 관리를 구현하고, 애플리케이션의 전역 상태를 효율적으로 관리<br>
· React Router를 활용하여 다양한 경로와 라우팅을 처리하며, 페이지 전환에 대한 유연성을 보장<br>
· 외부 API와의 통신을 통해 영화 정보를 가져오는 기능을 구현하고, 데이터를 동적으로 처리<br>
· Bootstrap과 CSS를 활용하여 사용자 인터페이스를 디자인하고, 반응형 디자인 적용<br>
· ES6 문법과 모던 JavaScript 개발 기법을 사용하여 코드를 최적화하고 가독성을 높임<br>
· Axios를 이용하여 작업을 처리


<h1>사용기술</h1>
· react<br>
· redux-toolkit<br>
· react-router<br>
· bootstrap<br>
· css<br>
· es6<br>
· axios



<h1>Advanced Feature</h1>

Redux Toolkit을 사용한 상태 관리: Redux Toolkit을 활용하여 상태 관리를 구현 <br>
이를 통해 애플리케이션의 상태를 효율적으로 관리

```
View Component

const {movieDetail, loading, movieTrailer, relationMovies} = useSelector(state=>state.movie);

  useEffect(()=>{
      dispatch(movieAction.getMovieDetail(id));
      dispatch(movieAction.getTrailer(id));    
      dispatch(movieAction.getRelationMovies(id));    
  },[id]) 
```

```
Action

function getMovieDetail(movie_id){
    return (dispatch) =>{
        dispatch(movieActions.GET_MOVIES_REQUEST());
       
        api.get(`/movie/${movie_id}?api_key=${API_KEY}&language=ko`)
        .then((Response)=>{
            let movieDetail = Response.data;
            dispatch(movieActions.GET_MOVIE_DETAIL({movieDetail}))
        }).catch((error)=>{
            dispatch(movieActions.GET_MOVIES_FAILURE());   
        })
    }
}
```

```
Reducer

 GET_MOVIE_DETAIL: (state, action) => {
      state.movieDetail = action.payload.movieDetail;
      state.loading = false;
 },
```


<h1>개선사항</h1>

페이지 전환이나 검색 기능을 사용할 때, 화면 전환이 부드럽게 이루어지도록 애니메이션 효과 추가해야 함 (사용자 경험 개선)<br>
페이지 새로고침 시 상태 초기화 현상을 방지하기 위해 redux-persist 라이브러리 사용 예정

