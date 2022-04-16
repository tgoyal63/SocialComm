import React, { useEffect } from "react";
import "./Github.scss";
import { useAppContext } from "../../Context/appContext";
import { Container, Row, Col, Card } from "react-bootstrap";

const Github = (props) => {
  const { username } = props;
  const {
    getGithub,
    graph,
    stats,
    mul,
    contributions,
    githubUsername,
    public_repos,
    public_gists,
    followers,
    following,
    organizations,
    github_created_at,
  } = useAppContext();
  useEffect(() => {
    const github = async () => {
      await getGithub(username);
    };
    github();
  }, [username]);
  return (
    <div className="github">
      <Container>
        <div className="header">
          <h3 className="heading">GitHub</h3>
          <h6>
            username: <span className="username">{githubUsername}</span>
          </h6>
        </div>
        <Row>
          <Col lg={12} className="githubStats">
            <img src={graph} width="100%" alt="Github Commits Graph" />
          </Col>
        </Row>
        <Row>
          <Col lg={6} className="githubStats">
            <img src={stats} width="100%" alt="Github Stats" />
          </Col>
          <Col lg={6} className="githubStats">
            <img src={contributions} width="100%" alt="Github Contributions"/>
          </Col>
        </Row>
        <Row>
          <Col lg={6} className="githubStats">
            <img src={mul} width="100%" alt="Most Used Languages"/>
          </Col>
          <Col lg={6} className="githubStats">
            <Card className="g-card">
              <Card.Body>
                <Card.Title>GitHub Data</Card.Title>
                <Card.Text>
                  <Row>
                    <Col lg={6}>Public Repos: {public_repos}</Col>
                    <Col lg={6}>Followers: {followers}</Col>
                  </Row>
                  <Row>
                    <Col lg={6}>Public Gists: {public_gists}</Col>
                    <Col lg={6}>Following: {following}</Col>
                  </Row>
                  <Row>
                    <Col lg={6}>Created: {github_created_at}</Col>
                    <Col lg={6}>Organizations: {organizations}</Col>
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

export default Github;
