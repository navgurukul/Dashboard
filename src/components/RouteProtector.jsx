import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RouteProtector(props) {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("AUTH"));
    if (!userData) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <Component />{" "}
    </>
  );
}

export default RouteProtector;
