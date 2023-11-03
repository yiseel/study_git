import React, { useEffect, useState } from 'react';
import "./Nav.css";
import { useNavigate } from 'react-router-dom';

export default function Nav() {
    const [show, setShow] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // 스크롤 감지하여 네이게이션바 효과주기
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
              setShow(true);
            } else {
              setShow(false);
            }
        });

        return () => {
            window.removeEventListener("scroll", () => {});
        }
    });

    // 검색 입력값 찾기
    const handleChange = (e) => {
      setSearchValue(e.target.value);
      navigate(`/search?q=${e.target.value}`);
    }

  return (
    <nav className={`nav ${show && "nav_black"} `}>
        <img 
            alt='netflix logo'
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png"
            className="nav_logo"
            onClick={()=>(window.location.reload())}
        />
        <input type="text" value={searchValue} onChange={handleChange} className='nav_input' placeholder='영화를 검색해주세요.'/>
        <img
            alt="User logged"
            src="https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41"
            className="nav_avatar"
        />
    </nav>
  )
}
