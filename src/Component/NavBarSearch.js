import React, { useEffect } from 'react'
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


//영화페이지 서브네비바
const NavBarSearch = ({genreList, searchTitle, setSearchTitle, setSortBy,sortTitle, setSortTitle, setFilterGenres}) => {

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll); //clean up
    };
  }, []);

  //영화페이지 서브헤더 속성 및 css 컨트롤
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }    
  };  

  const navbarOption = {
    fixed: isScrolled ? 'top' : '', 
  };

  const navbarStyle = {
    top: '60px',
    transition: 'background-color 0.5s ease, opacity 0.5s ease',
    backgroundColor: '#212529', 
  };

    

  return (
    <div className="sub-header">
    <Navbar variant="dark" {...navbarOption} style={isScrolled ? navbarStyle : {}}>
    <Container fluid>
      <Navbar.Brand className="dropdown-title">영화 {searchTitle} {sortTitle}</Navbar.Brand>
      <Navbar.Collapse >
        <Nav>
          <NavDropdown title="장르" menuVariant="dark" className="dropdown-menu-title" >
          <NavDropdown.Item  onClick={()=>{setFilterGenres(""); setSearchTitle("")}}>전체</NavDropdown.Item>
            {genreList.genres?.map((item,index)=>
            <NavDropdown.Item key={index} onClick={()=>{setFilterGenres(item.id); setSearchTitle(item.name);}}>{item.name}</NavDropdown.Item>
            )}
          </NavDropdown>
          </Nav>
          <Nav>
          <NavDropdown title="정렬" menuVariant="dark" className="dropdown-menu-title" align="end">
            <NavDropdown.Item onClick={()=>{setSortBy("popularity.desc"); setSortTitle(" > 인기콘텐츠순")}}>인기콘텐츠순</NavDropdown.Item>
            <NavDropdown.Item onClick={()=>{setSortBy("primary_release_date.desc"); setSortTitle(" > 출시일순")}}>출시일순</NavDropdown.Item>
            <NavDropdown.Item onClick={()=>{setSortBy("title.asc"); setSortTitle(" > 오름차순(ㄱ-Z)")}}>오름차순(ㄱ-Z)</NavDropdown.Item>
            <NavDropdown.Item onClick={()=>{setSortBy("title.desc"); setSortTitle(" > 내림차순(Z-ㄱ)")}}>내림차순(Z-ㄱ)</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  </div>
  )
}

export default NavBarSearch