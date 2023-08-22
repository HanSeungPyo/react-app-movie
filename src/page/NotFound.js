import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => navigate('/');

  return (
    <Container fluid>
      <Row>
        <Col>
          <div className="error-page">
            <h1 className="error-header">길을 잃으셨나요?</h1>
            <div className="error-body">
              <p>
                죄송합니다. 해당 페이지를 찾을 수 없습니다.
                <br /> 홈페이지로 이동해 다양한 콘텐츠를 만나보세요.
              </p>
              <Button variant="light" size="xl" onClick={goHome}> 
                <b>Netflix</b> 홈
              </Button>
            </div>
            <div className="error-code">
              <span>404</span>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFound;