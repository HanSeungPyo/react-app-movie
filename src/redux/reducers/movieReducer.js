import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popularMovies: {},
  topRatedMovies: {},
  upComingMovies: {},
  loading: true,
  genreList: [],
  movieDetail: {},
  movieTrailer: {},
  relationMovies: {},
  popularMoviesList: {},
  page: 1,
  searchMoviesList: {},
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    GET_MOVIE_SUCCESS: (state, action) => {
      state.popularMovies = action.payload.popular;
      state.topRatedMovies = action.payload.topRate;
      state.upComingMovies = action.payload.upComing;
      state.genreList = action.payload.genresList;
      state.loading = false;
    },
    GET_MOVIES_REQUEST: (state) => {
      state.loading = true;
    },
    GET_MOVIES_FAILURE: (state) => {
      state.loading = false;
    },
    GET_MOVIE_DETAIL: (state, action) => {
      state.movieDetail = action.payload.movieDetail;
      state.loading = false;
    },
    GET_MOVIE_TRAILER: (state, action) => {
      state.movieTrailer = action.payload.movieTrailer;
      state.loading = false;
    },
    GET_RELATION_MOVIES: (state, action) => {
      state.relationMovies = action.payload.relationMovies;
      state.loading = false;
    },
    GET_MOVIES_LIST: (state, action) => {
      const { popular, page, genresList } = action.payload;

      if (page === 1) {
        state.popularMoviesList = popular;
      } else {
        // 현재 페이지가 1이 아닌 경우,영화 목록 갱신
        state.popularMoviesList = {
          ...state.popularMoviesList,
          ...popular,
          results: [...state.popularMoviesList.results, ...popular.results],
        };
      }

      state.genreList = genresList;
      state.page = page;
      state.loading = false;
    },
    RESET_PAGE: (state) => {
      state.page = 1;
    },
    GET_SEARCH_LIST: (state, action) => {
      const { searchMoviesList, genresList, page } = action.payload;

      if (page === 1) {
        state.searchMoviesList = searchMoviesList;
      } else {
        // 현재 페이지가 1이 아닌 경우,영화 목록 갱신
        state.searchMoviesList = {
          ...state.searchMoviesList,
          ...searchMoviesList,
          results: [...state.searchMoviesList.results, ...searchMoviesList.results], 
        };
      }

      state.genresList = genresList;
      state.page = page;
      state.loading = false;
    },
  },
});

export const movieActions = movieSlice.actions;
export default movieSlice.reducer;
