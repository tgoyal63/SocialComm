import React, { useEffect, useState } from "react";
import NavbarComponent from "../../Components/Navbar/NavbarComponent";
import { Outlet } from "react-router-dom";
import { Table, Row, Button, Col } from "react-bootstrap";
import { Footer } from "../../Components/Footer/Footer.jsx";
import { useAppContext } from "../../Context/appContext";
import { Link } from "react-router-dom";

import "./Leaderboard.scss";

const Leaderboard = () => {
  const {
    getGlobalLeaderboard,
    globaldata
  } = useAppContext();

  const [isGlobal, setIsGlobal] = useState(false);

  useEffect(() => {
    const globalLeaderboard = async () => {
      await getGlobalLeaderboard();
    };
    globalLeaderboard();
    setIsGlobal(true);
  }, []);

  const handleGlobal = (e) => {
    e.preventDefault();
    setIsGlobal(true);
    getGlobalLeaderboard();
  };

  let count = 1;

  return (
    <div className="leaderboard-home">
      <Outlet />
      <NavbarComponent />
      <div className="leaderboard-container">
        <h1>Leaderboard</h1>
        <div className="leaderboard-card" style={{ color: "white" }}>
          <Row className="mx-0">
            <Button
              as={Col}
              className={isGlobal ? "active-btn" : "inactive-btn"}
              style={{ marginRight: "20px" }}
              onClick={handleGlobal}
            >
              Global
            </Button>
            <br />
          </Row>
          <Table bordered style={{ color: "white", borderColor: "#79828a" }}>
            <thead>
              <tr>
                <th>#Rank</th>
                <th width="60%">Name</th>
                <th>Rating </th>
              </tr>
            </thead>
            <tbody>
              {globaldata &&
                globaldata.map((global, index) => (
                  <tr  key={index}>
                    <td>{count++}</td>

                    <td>
                      <Link to={`/search/${global.username}`}>
                        {global.name}{" "}
                      </Link>
                    </td>

                    <td>{global.rating}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Leaderboard;
