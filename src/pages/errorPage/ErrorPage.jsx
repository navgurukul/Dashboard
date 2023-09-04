import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Delay the navigation after 3 seconds
    const timeoutId = setTimeout(() => {
      navigate("/partner");
    }, 3000);

    // Clear the timeout if the component unmounts before the timeout expires
    return () => {
      clearTimeout(timeoutId);
    };
  }, [navigate]);

  return (
    <div style={{ margin: "200px" }}>
      <h1 style={{ margin: "0px auto", fontSize: "60px" }}>
        Page does not exist
      </h1>
      <br />
      <h2 style={{ margin: "0px auto", fontSize: "60px" }}>
        Redirecting to home page
      </h2>
    </div>
  );
};

export default ErrorPage;
