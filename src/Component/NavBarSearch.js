import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavBarSearch = ({ genreList, searchTitle, setSearchTitle, setSortBy, sortTitle, setSortTitle, setFilterGenres }) => {
  
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // 정리
  }, []);

  const handleGenreClick = (id, name) => {
    setFilterGenres(id);
    setSearchTitle(name);
  };

  const handleSortClick = (sortBy, sortTitle) => {
    setSortBy(sortBy);
    setSortTitle(sortTitle);
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
          <Navbar.Collapse>
            <Nav>
              <NavDropdown title="장르" menuVariant="dark" className="dropdown-menu-title">
                <NavDropdown.Item onClick={() => handleGenreClick("", "")}>전체</NavDropdown.Item>
                {genreList.genres?.map((item, index) => (
                  <NavDropdown.Item key={index} onClick={() => handleGenreClick(item.id, item.name)}>{item.name}</NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>
            <Nav>
              <NavDropdown title="정렬" menuVariant="dark" className="dropdown-menu-title" align="end">
                <NavDropdown.Item onClick={() => handleSortClick("popularity.desc", " > 인기콘텐츠순")}>인기콘텐츠순</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleSortClick("primary_release_date.desc", " > 출시일순")}>출시일순</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleSortClick("title.asc", " > 오름차순(ㄱ-Z)")}>오름차순(ㄱ-Z)</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleSortClick("title.desc", " > 내림차순(Z-ㄱ)")}>내림차순(Z-ㄱ)</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBarSearch;