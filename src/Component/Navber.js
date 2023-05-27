import React, { useEffect, useRef, useState } from 'react'
import { Container, Form, Navbar, Nav, NavDropdown, Button  } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'

//상단 네비바
const Navber = () => {
  
  const [keyword, setKeyWord] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef(null);
 
 
  const keywordSearch = (keyword) =>{
    setKeyWord(keyword)
    
    if(keyword !== "")
    {
      navigate(`/search?query=${keyword}`)
    }
    else{
      navigate("/")
    }
  }

  
  useEffect(()=>{
    if (location.pathname.startsWith('/search')===false) {
      setKeyWord('');
      searchInputRef.current.value = "";
    }
    window.scrollTo(0, 0);
  },[location.pathname])
  
  
 
 
 
  return (
    <Navbar bg="dark" expand="lg" variant="dark" fixed="top" style={{zIndex:2000}}> 
    <Container fluid>
      <Navbar.Brand><Link to="/"><img width={100} src="/img/logo.png" /></Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav className="me-auto my-2 my-lg-0"style={{ maxHeight: '100px' }} navbarScroll >
          <Link to="/" className="nav-item link-a" >홈</Link>
          <Link to="/movie" className="nav-item link-a" >영화</Link>
          
        </Nav>
        <Form className="d-flex">
          <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" onKeyUp={(e)=>keywordSearch(e.target.value)} ref={searchInputRef}/>
        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Navber