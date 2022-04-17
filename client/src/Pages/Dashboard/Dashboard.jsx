import React, { useEffect } from "react";
import "./Dashboard.scss";
import NavbarComponent from "../../Components/Navbar/NavbarComponent";
import { Footer } from "../../Components/Footer/Footer.jsx";
import { useAppContext } from "../../Context/appContext";
import Github from "../../Components/Github/Github";
import Hackerrank from "../../Components/Hackerrank/Hackerrank";
import CodeChef from "../../Components/CodeChef/CodeChef";
import { ToastContainer } from 'react-toastify';

const Dashboard = () => {
  const { getUser } = useAppContext();
  useEffect(() => {
    const user = async () => {
      await getUser();
    };
    user();
  }, []);

  return (
    <div className="dashboardHome">
      <NavbarComponent />
      <Github username="" />
      <Hackerrank username="" />
      <CodeChef username="" />
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
