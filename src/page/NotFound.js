import React from 'react'
import { Container,Row,Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

//404 에러 페이지
const NotFound = () => {

    const navigate = useNavigate();
    const goHome = () => navigate('/');

  return (
    <>
        <Container fluid>
            <Row>
                <Col>
                    <div className="error-page">
                        <div className="error-page-header"><h1>길을 잃으셨나요?</h1></div>    
                        <div className="error-page-body">
                            <p>죄송합니다. 해당 페이지를 찾을 수 없습니다.<br/> 홈페이지로 이동해 다양한 콘텐츠를 만나보세요.</p>
                            <div className="error-page-button">
                                <Button variant="light" size="xl" onClick={()=>goHome()}> <b>Netflix</b> 홈</Button>
                            </div>    
                        </div>    
                        <div className="error-page-errorCode"><span> 404</span></div>    
                    </div>
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default NotFound