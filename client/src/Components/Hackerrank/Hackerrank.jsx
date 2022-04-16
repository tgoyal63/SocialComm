import React, { useEffect } from "react";
import "./Hackerrank.scss";
import { useAppContext } from "../../Context/appContext";
import { Container, Row, Col, Card } from "react-bootstrap";

const Hackerrank = (props) => {
  const { username } = props;
  const {
    getHackerrank,
    hackerrankUsername,
    hackerrank_created_at,
    level,
    followers_count,
    totalSubmissions,
    totalBadges,
    badgeData,
  } = useAppContext();

  useEffect( () => {
    const hackerrank = async () => {
    await getHackerrank(username);
    }
    hackerrank();
  }, [username]);
  
  return (
    <div className="hackerrank">
      <Container>
        <div className="header">
          <h3 className="heading">Hackerrank</h3>
          <h6>
            username: <span className="username">{hackerrankUsername}</span>
          </h6>
        </div>
        <Row>
          <Col lg={6} className="githubStats">
            <Card className="g-card">
              <Card.Body>
                <Card.Title>Hackerrank Data</Card.Title>
                <Card.Text>
                  <Row>
                    <Col lg={6}>Level: {level}</Col>
                    <Col lg={6}>Followers: {followers_count}</Col>
                  </Row>
                  <Row>
                    <Col lg={6}>Submission: {totalSubmissions}</Col>
                    <Col lg={6}>Badges: {totalBadges}</Col>
                  </Row>
                  <Row>
                    <Col lg={6}>Created: {hackerrank_created_at}</Col>
                  </Row>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6} className="githubStats">
            <Card className="g-card">
              <Card.Body>
                <Card.Title>Hackerrank Badges</Card.Title>
                <Card.Text>
                  <Row>
                    {badgeData &&
                      badgeData.map((badge,i) => {
                        return (
                          <Col key={i} lg={6} className="p-2">
                            {badge.badge_name} {badge.stars}⭐
                          </Col>
                        );
                      })}
                  </Row>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Hackerrank;
