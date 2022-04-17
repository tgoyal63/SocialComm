import React, { useEffect } from "react";
import "./SearchDashboard.scss";
import NavbarComponent from "../../Components/Navbar/NavbarComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { Footer } from "../../Components/Footer/Footer.jsx";
import { useAppContext } from "../../Context/appContext";
import "react-toastify/dist/ReactToastify.css";
import Github from "../../Components/Github/Github";
import Hackerrank from "../../Components/Hackerrank/Hackerrank";
import CodeChef from "../../Components/CodeChef/CodeChef";
import "font-awesome/css/font-awesome.min.css";
import { toast, ToastContainer } from "react-toastify";

const SearchDashboard = () => {
  const {
    name,
    socials,
    upvotes,
    downvotes,
    voteStatus,
    status,
    searchUser,
    addFriend,
    acceptReq,
    getCancelReq,
    getUpVote,
    getDownVote,
    removeVote,
    loginUsername,
  } = useAppContext();

  const location = useLocation();
  const navigate = useNavigate();

  const username = location.pathname.split("/")[2];
  useEffect(() => {
    const user = async () => {
      if (username.toString() === loginUsername.toString()) {
        navigate("/dashboard");
      }
      if (username) await searchUser(username);
    };
    user();
  }, [username, status, voteStatus]);

  function handleFriend(username) {
    if (status === "Add Friend") {
      const data = addFriend(username);
      if (data.statusCode === 201) {
        toast("Friend request sent!");
      } else {
        toast(data.message);
      }
    } else if (status === "Accept Request") {
      const data = acceptReq(username);
      if (data.statusCode === 204) {
        toast("You are now friends!");
      } else {
        toast(data.message);
      }
    } else {
      const data = getCancelReq(username);
      if (data.statusCode === 201) {
        if (status === "Remove Friend") toast("Friend Removed");
        else toast("Friend Request Removed!");
      } else {
        toast(data.message);
      }
    }
  }

  const handleUpVote = async () => {
    if (voteStatus === "upvoted") {
      const data = await removeVote(username);
      if (data.statusCode === 201) {
        toast("Vote Removed");
      } else {
        toast(data.message);
      }
    } else {
      const data = await getUpVote(username);
      if (data.statusCode === 201) {
        toast("Upvoted");
      } else {
        toast(data.message);
      }
    }
  };

  const handleDownVote = async () => {
    if (voteStatus === "downvoted") {
      const data = await removeVote(username);
      if (data.statusCode === 201) {
        toast("Vote Removed");
      } else {
        toast(data.message);
      }
    } else {
      const data = await getDownVote(username);
      if (data.statusCode === 201) {
        toast("Downvoted");
      } else {
        toast(data.message);
      }
    }
  };

  return (
    <>
      <div className="dashboardHome">
        <NavbarComponent />
        <div className="container-fluid mt-5">
          <div className="row">
            <div
              className="col-lg-12 col-sm-6 text-center justify-content-center"
              style={{ color: "white", paddingBottom: "1rem" }}
            >
              <h1>{name}</h1>({username})
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-sm-6 text-center d-flex justify-content-center gap-4">
              <button
                className="btn btn-up p-3"
                title={voteStatus === "upvoted" ? "Remove Upvote" : "Upvote"}
                onClick={handleUpVote}
              >
                <div className="d-flex justify-content-center p-0 m-0">
                  {upvotes}
                  <i className="fa fa-thumbs-up fa-lg "></i>
                </div>
              </button>
              <button
                className="btn btn-down  p-3"
                title={voteStatus === "downvoted" ? "Remove Downvote" : "Downvote"}
                onClick={handleDownVote}
              >
                <div className="d-flex justify-content-center p-0 m-0">
                  {downvotes}
                  <i className="fa fa-thumbs-down fa-lg"></i>
                </div>
              </button>
              <button
                className="btn btn-add  p-3"
                title={status}
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  handleFriend(username);
                }}
              >
                {status === "Add Friend" || status === "Accept Request" ? (
                  <i className="fa fa-user-plus fa-lg"></i>
                ) : (
                  <i className="fa fa-user-times fa-lg"></i>
                )}
              </button>
            </div>
          </div>
        </div>
        <Github username={socials && socials.github} />
        <Hackerrank username={socials && socials.hackerrank} />
        <CodeChef username={socials && socials.codechef} />
        <Footer />
      </div>
      <ToastContainer />
    </>
  );
};

export default SearchDashboard;
