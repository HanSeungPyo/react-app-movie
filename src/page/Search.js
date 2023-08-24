import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import MovieListCard from '../Component/MovieListCard'
import { movieAction } from '../redux/actions/movieAction'
import ClipLoader from "react-spinners/ClipLoader"
import InfiniteScroll from 'react-infinite-scroller'
import { useSearchParams } from 'react-router-dom'

const Search = () => {
    const dispatch = useDispatch()
    const { searchMoviesList, loading, page } = useSelector(state => state.movie)
    const [initialLoad, setInitialLoad] = useState(true)
    const [query] = useSearchParams()
    const keyword = query.get("query")

    useEffect(() => {
        dispatch(movieAction.getSearchMovies(keyword, 1))
        setInitialLoad(true)

        return () => {
            dispatch(movieAction.resetPage())
        }
    }, [keyword])

    const fetchMoreMovies = () => {
        setInitialLoad(false)
        if (!initialLoad) dispatch(movieAction.getSearchMovies(keyword, page + 1))
    }

    // 초기 로딩 시에만 로딩 스피너를 보여줍니다.
    if (loading && initialLoad) {
        return <div className="loading"><ClipLoader color="red" loading={loading} size={300} /></div>
    }

    return (
        <Container fluid>
            <InfiniteScroll
                pageStart={page}
                loadMore={fetchMoreMovies}
                hasMore={page < searchMoviesList.total_pages}
                loader={<div className="loading"><ClipLoader color="red" loading={loading} size={300} /></div>}
                initialLoad={false}
            >
                <Row>
                    {
                        searchMoviesList.results?.length > 0 ?
                            searchMoviesList.results.map((item, index) =>
                                <Col lg={3} className="movie-list-col" key={index}>
                                    <MovieListCard item={item} />
                                </Col>
                            )
                            :
                            <Col>
                                <div className="no-data">
                                    입력하신 검색어 "{keyword}"(와)과 일치하는 결과가 없습니다.
                                </div>
                            </Col>
                    }
                </Row>
            </InfiniteScroll>
        </Container>
    )
}

export default Search