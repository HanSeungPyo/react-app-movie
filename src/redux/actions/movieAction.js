import api from "../api"
import { movieActions } from "../reducers/movieReducer"

const API_KEY = process.env.REACT_APP_API_KEY


//메인 영화정보(인기, 최고평점, 개봉예정)
function getMovies(){
    return async (dispatch)=>{
            try{
                dispatch(movieActions.GET_MOVIES_REQUEST());
                const popularMovieApi = api.get(`/discover/movie?language=ko&page=1&sort_by=popularity.desc&api_key=${API_KEY}`);
                const topRatedMovieApi = api.get(`/discover/movie?language=ko&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200&api_key=${API_KEY}`);
                const upComingMovieApi = api.get(`/discover/movie?include_video=false&language=ko&page=1&sort_by=popularity.desc&with_release_type=2|3&api_key=${API_KEY}`);
                const genreApi=api.get(`/genre/movie/list?api_key=${API_KEY}&language=ko`);    

                let [popularMovies, topRatedMovies, upComingMovies, genreList]=  
                await Promise.all([popularMovieApi, topRatedMovieApi, upComingMovieApi, genreApi]); //api 동시호출

                let popular = popularMovies.data;
                let topRate = topRatedMovies.data;
                let upComing = upComingMovies.data;
                let genresList = genreList.data;

               
                dispatch(movieActions.GET_MOVIE_SUCCESS({popular,topRate,upComing, genresList}));       
            }catch(error){
                dispatch(movieActions.GET_MOVIES_FAILURE());    
            }
                
      
        
    }
}

//영화상세정보
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

//영화 트레일러 정보
function getTrailer(movie_id){
    return (dispatch) => {
        dispatch(movieActions.GET_MOVIES_REQUEST());    

        api.get(`/movie/${movie_id}/videos?api_key=${API_KEY}&language=ko`)
        .then((Response)=>{
            let movieTrailer = Response.data;
            dispatch(movieActions.GET_MOVIE_TRAILER({movieTrailer}))
        }).catch((error)=>{
            dispatch(movieActions.GET_MOVIES_FAILURE());   
        })
    }
}

//관련있는 영화 정보
function getRelationMovies(movie_id){
    return (dispatch) => {
        dispatch(movieActions.GET_MOVIES_REQUEST());     

        api.get(`/movie/${movie_id}/recommendations?api_key=${API_KEY}&language=ko`)
        .then((Response)=>{
            let relationMovies = Response.data;
            dispatch(movieActions.GET_RELATION_MOVIES({relationMovies}))
        }).catch((error)=>{
            dispatch(movieActions.GET_MOVIES_FAILURE());        
        })
    }
}

//영화  리스트
function getMoviesList(page,sort_by, filterGenres){
    return async (dispatch) =>{
        try{
            dispatch(movieActions.GET_MOVIES_REQUEST());
            let genresUrl;
            filterGenres !== "" ?  genresUrl = `&with_genres=${filterGenres}` : genresUrl="";
            

            const popularMovieApi = api.get(`/discover/movie?language=ko&page=${page}&sort_by=${sort_by}&api_key=${API_KEY}` + genresUrl);

            const genreApi=api.get(`/genre/movie/list?api_key=${API_KEY}&language=ko`);    
            let [popularMovies, genreList]=  
            
            await Promise.all([popularMovieApi, genreApi]);
            
            let popular = popularMovies.data;
            let genresList = genreList.data;

            dispatch(movieActions.GET_MOVIES_LIST({popular, genresList, page}));       
        }catch(error){
            dispatch(movieActions.GET_MOVIES_FAILURE());    
        }

        }
}

//페이지 초기화
function resetPage(){
    return  (dispatch) =>{
        dispatch(movieActions.RESET_PAGE());
    }
}

//영화검색
function getSearchMovies(keyword,page){
    return async (dispatch) =>{
       try{
            dispatch(movieActions.GET_MOVIES_REQUEST());
            const searchMoviesApi = api.get(`/search/movie?query=${keyword}&page=${page}&api_key=${API_KEY}&language=ko`);
            const genreApi=api.get(`/genre/movie/list?api_key=${API_KEY}&language=ko`);    
            let [searchMovies, genreList]=  
            await Promise.all([searchMoviesApi, genreApi]);
            
            let searchMoviesList = searchMovies.data;
            let genresList = genreList.data;

            dispatch(movieActions.GET_SEARCH_LIST({searchMoviesList, genresList, page}));       
        }catch(error){
            dispatch(movieActions.GET_MOVIES_FAILURE());    
        }

        }  
    }

export const movieAction = {
    getMovies,  getMovieDetail, getTrailer, getRelationMovies, getMoviesList, resetPage, getSearchMovies
};