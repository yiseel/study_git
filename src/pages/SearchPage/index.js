import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { useDebounce } from "../../hooks/useDebounce";
import "./SearchPage.css";

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  // 검색한 내용
  const searchTerm = query.get("q");
  const debounceSearchTerm = useDebounce(searchTerm, 500)

  // 검색한 내용이 바뀔 때마다 업데이트
  useEffect(()=>{
    if(debounceSearchTerm){
      fetchSearchMovie(debounceSearchTerm)
    }
  },[debounceSearchTerm])

  const fetchSearchMovie = async(searchTerm) => {
    try {
      // 검색한 내용으로 페이지 이동하기
      const request = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      );
      // 검색한 내용의 결과값
      setSearchResults(request.data.results);
    } catch (error){
      console.log('error');
    }
  }

  const renderSearchResults = () => {
    // 검색한 내용의 결과값이 있다면
    return searchResults.length > 0 ? (
      <section className='search-container'>
        {searchResults.map((movie)=> {
            if (movie.backdrop_path !== null && movie.media_type !== "person") {
              const movieImageUrl =
                "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
            return (
              <div className='movie' key={movie.id}>
                <div className='movie_column_poster' onClick={() => navigate(`/${movie.id}`)}>
                  <img src={movieImageUrl} alt="movie_img" className='movie_poster'/>
                </div>
              </div>
            )
          }
        })}
      </section>
    ) : (
      <section className="no-results">
        <div className="no-results_text">
          <p>
            찾고자하는 검색어"{debounceSearchTerm}"에 맞는 영화가 없습니다.
          </p>
        </div>
      </section>
    )
  }

  return renderSearchResults();
}
