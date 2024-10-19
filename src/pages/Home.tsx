import { useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { handleLoggedInUser } from "../data/user.data.ts";
import Logo from "/images/logo.svg";

const Home = () => {
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    handleLoggedInUser(navigate);
  }, [navigate]);

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen gap-30">
        <img src={Logo} alt="Logo" />
        <div className="flex flex-col gap-15">
          <button
            className="w-310 h-50 bg-black-1 rounded-md text-white-1 transition-colors hover:bg-black-1/75"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
          <button
            className="w-310 h-50 bg-black-1 rounded-md text-white-1 transition-colors hover:bg-black-1/75"
            onClick={() => navigate("/login")}
          >
            Log In
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
